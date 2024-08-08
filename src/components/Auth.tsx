import { signout } from "../services/AuthService";
import SignInUp from "./SignInUp";
import Button from "./Button";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Auth() {
  const { user } = useCurrentUser();

  return user ? (
    <div className="m-auto text-center flex justify-between">
      <h1 className="text-5xl">Hi, {user.email?.split("@").at(0)}</h1>
      <Button onClick={signout}>Sign out</Button>
    </div>
  ) : (
    <SignInUp />
  );
}
