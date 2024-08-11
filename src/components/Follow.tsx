import { BiLoaderCircle, BiPlus } from "react-icons/bi";
import Button from "./Button";
import { followUser } from "../services/UsersService";
import { useMutation, useQueryClient } from "react-query";

export default function Follow({ userId }: { userId: string }) {
  const queryClient = useQueryClient();
  const { mutate: handleFollow, isLoading } = useMutation({
    mutationKey: "unfollowUser",
    mutationFn: () => followUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "unfollowedUsers" });
    },
  });
  return (
    <Button onClick={handleFollow} className="flex gap-1 mt-0 items-center">
      <span>Follow</span>
      {isLoading ? (
        <BiLoaderCircle className="w-6 h-6" />
      ) : (
        <BiPlus className="w-6 h-6" />
      )}
    </Button>
  );
}
