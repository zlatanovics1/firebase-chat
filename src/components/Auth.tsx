import { signout } from "../services/AuthService";
import SignInUp from "./SignInUp";
import Button from "./Button";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { getUser } from "../redux/slices/userSlice";
import { useAppSelector } from "../redux/store";

export default function Auth() {
  useCurrentUser();
  const user = useAppSelector(getUser);

  return user.isLogedIn ? (
    <div className="m-auto text-center flex justify-between">
      <h1 className="text-5xl">Hi, {user.email?.split("@").at(0)}</h1>
      <Button onClick={signout}>Sign out</Button>
    </div>
  ) : (
    <SignInUp />
  );
}
