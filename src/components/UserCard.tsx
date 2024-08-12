import { User } from "../types/firestore";
import Follow from "./Follow";

export default function UserCard({ user }: { user: User }) {
  return (
    <li className="flex gap-5 border-2 flex-wrap p-4 rounded-xl items-center">
      <p>{user.email?.split("@").at(0)}</p>
      <Follow userId={user.id} />
    </li>
  );
}
