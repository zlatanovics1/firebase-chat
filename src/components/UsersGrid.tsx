import { useQuery } from "react-query";
import { getNotFollowedUsers, getUsers } from "../services/UsersService";
import UserCard from "./UserCard";

export default function UsersGrid() {
  const { data: users, isFetching } = useQuery({
    queryKey: "unfollowedUsers",
    queryFn: getNotFollowedUsers,
  });

  if (isFetching) return <p>Loading users...</p>;
  return (
    <ul className="grid grid-cols-4 gap-20">
      {users?.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </ul>
  );
}
