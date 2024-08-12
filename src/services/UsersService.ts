import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { catchAsyncError } from "../utils/catchAsyncError";
import { User } from "../types/firestore";

export const followUser = catchAsyncError<void, string>(
  async (userId: string) => {
    const record = {
      followerId: auth.currentUser?.uid,
      followedId: userId,
    };

    const followersRef = collection(db, "followers");
    await addDoc(followersRef, record);
  }
);

export const getUsers = catchAsyncError<User[], void>(async () => {
  const usersRef = collection(db, "users");
  const users = await getDocs(usersRef);
  const usersData = users.docs.map((user) => ({
    ...user.data(),
    id: user.id,
  })) as User[];

  return usersData;
});

export const getNotFollowedUsers = catchAsyncError<User[], void>(async () => {
  const allUsers = (await getUsers()) as User[];
  const followersRef = collection(db, "followers");
  const qFollowedbyMe = query(
    followersRef,
    where("followerId", "==", auth.currentUser?.uid)
  );
  const qFollowedMe = query(
    followersRef,
    where("followedId", "==", auth.currentUser?.uid)
  );
  const myFollowing = await getDocs(qFollowedbyMe);
  const myFollowers = await getDocs(qFollowedMe);

  const myFollowingIds = myFollowing.docs.map((doc) => doc.data().followedId);
  const myFollowersIds = myFollowers.docs.map((doc) => doc.data().followerId);
  const followedIds = myFollowersIds.concat(myFollowingIds);

  return allUsers.filter(
    (user) =>
      !followedIds.includes(user.id) && user.id !== auth.currentUser?.uid
  );
});
