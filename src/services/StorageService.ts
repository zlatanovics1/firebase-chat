import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase";

export const uploadImage = (file: File) => {
  const storageRef = ref(storage, `images/${file.name}`);
  return uploadBytesResumable(storageRef, file);
};
