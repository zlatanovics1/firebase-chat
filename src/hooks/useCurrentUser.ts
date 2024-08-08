import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../config/firebase";
import { useEffect, useState } from "react";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(function () {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        return setUser(currentUser);
      }
      setUser(null);
    });
    return () => unsubscribe();
  }, []);

  return { user };
}
