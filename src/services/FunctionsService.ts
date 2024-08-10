import { httpsCallable, getFunctions } from "firebase/functions";

const functions = getFunctions();
const addModeratorRole = httpsCallable(functions, "addCace");

export const addCace = async () => {
  try {
    await addModeratorRole();
  } catch (error) {
    console.error(error);
  }
};
