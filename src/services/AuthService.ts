import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { catchAsyncError } from "../utils/catchAsyncError";

export const getCurrentUser = () => auth.currentUser;

export const signin = catchAsyncError(
  async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  }
);
export const signout = catchAsyncError(async () => {
  return await signOut(auth);
});

export const signup = catchAsyncError(
  async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  }
);
