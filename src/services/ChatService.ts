import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { catchAsyncError } from "../utils/catchAsyncError";
import { type Message } from "../types/firestore";

const messageCollection = collection(db, "messages");
export const getMessagesFirestore = catchAsyncError<Message[]>(async () => {
  const q = query(messageCollection, orderBy("createdAt", "asc"));
  const snapshot = await getDocs(q);
  const messages = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Message[];

  return messages;
});

export const sendMessageFirestore = catchAsyncError<void>(
  async (message: Message) => {
    await addDoc(messageCollection, {
      ...message,
      createdAt: { seconds: new Date().getTime() / 1000 },
    });
  }
);

export const listenForMessages = (dispatcher: () => void) => {
  const q = query(messageCollection, orderBy("createdAt", "asc"));
  const unsub = onSnapshot(q, () => {
    dispatcher();
  });
  return unsub;
};

export const likeMessage = catchAsyncError<void>(async (id: string) => {
  const docToUpdate = doc(db, "messages", id);
  await updateDoc(docToUpdate, {
    likes: increment(1),
  });
});

export const deleteMessage = catchAsyncError<void>(async (id: string) => {
  const docToDelete = doc(db, "messages", id);
  await deleteDoc(docToDelete);
});
