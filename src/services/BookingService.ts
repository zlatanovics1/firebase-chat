import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { Booking } from "../types/firestore";
import { catchAsyncError } from "../utils/catchAsyncError";
import { db } from "../config/firebase";

export const getRecentBookings = catchAsyncError<Booking[], void>(async () => {
  const q = query(
    collectionGroup(db, "bookings"),
    orderBy("issuedAt", "desc"),
    limit(5)
  );
  const bookings = await getDocs(q);
  const userPromises = bookings.docs.map((bookingDoc) =>
    getDoc(doc(db, `tenants/${bookingDoc.data().userId}`))
  );
  const users = await Promise.all(userPromises);
  return bookings.docs.map((doc) => ({
    ...doc.data(),
    user: users.find((user) => user.id === doc.data().userId)?.data(),
    id: doc.id,
  })) as Booking[];
});

// export const addBooking = catchAsyncError<void, void>(async () => {
//   const user = {
//     name: "cacko " + Math.floor(Math.random() * 90 + 10),
//   };
//   const newTenantRef = doc(collection(db, "tenants"));

//   const booking = {
//     description:
//       "This is a test booking " + Math.floor(Math.random() * 150 + 20),
//     userId: newTenantRef.id,
//     issuedAt: serverTimestamp(),
//   };

//   const batch = writeBatch(db);
//   batch.set(newTenantRef, user);

//   batch.set(
//     doc(collection(db, `tenants/${newTenantRef.id}/bookings/`)),
//     booking
//   );

//   await batch.commit();
// });
