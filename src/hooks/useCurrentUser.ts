import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { useEffect } from "react";
import { clearUser, setUser } from "../redux/slices/userSlice";
import { useAppDispatch } from "../redux/store";
import { enableFCM } from "../services/NotificationsService";

export function useCurrentUser() {
  const dispatch = useAppDispatch();

  useEffect(function () {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const tokenRes = await currentUser.getIdTokenResult();
        enableFCM();
        return dispatch(
          setUser({
            moderator: Boolean(tokenRes.claims.moderator),
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
