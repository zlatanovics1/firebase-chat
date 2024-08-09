import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { useEffect } from "react";
import { clearUser, setUser } from "../redux/slices/userSlice";
import { useAppDispatch } from "../redux/store";

export function useCurrentUser() {
  const dispatch = useAppDispatch();

  useEffect(function () {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        return dispatch(
          setUser({
            displayName: currentUser.displayName || "",
            email: currentUser.email!,
            id: currentUser.uid,
          })
        );
      }
      dispatch(clearUser());
    });
    return () => unsubscribe();
  }, []);
}
