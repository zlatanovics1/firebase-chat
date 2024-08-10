import { BiLike } from "react-icons/bi";
import { type Message } from "../types/firestore";
import { FaUserCircle } from "react-icons/fa";
import { deleteMessage, likeMessage } from "../services/ChatService";
import { MdDeleteOutline } from "react-icons/md";

export default function Message({
  message,
  sentByMe,
  moderator,
}: {
  message: Message;
  sentByMe: boolean;
  moderator: boolean;
}) {
  const userSentLIClass = sentByMe
    ? "text-white flex-row-reverse self-end"
    : "";
  const userSentPClass = sentByMe
    ? "rounded-br-none bg-indigo-700 border-indigo-800 "
    : "rounded-bl-none bg-gray-200 border-gray-400";

  const messageSentAt = new Date(
    message.createdAt.seconds * 1000
  ).toLocaleTimeString();

  const handleLike = async () => await likeMessage(message.id);
  const handleDelete = async () => await deleteMessage(message.id);
  return (
    <li className={`flex gap-4 items-center ${userSentLIClass}`}>
      <FaUserCircle className={`w-14 h-14 text-gray-600`} />
      <p
        className={`px-4 py-2 flex rounded-xl gap-3 border-[2px] ${userSentPClass}`}
      >
        {message.content}
      </p>
      <div className="flex gap-1 items-center text-gray-600">
        <span>{message.likes}</span>
        <BiLike
          onClick={handleLike}
          className="w-6 h-6 -translate-y-[1px]  hover:text-blue-800 cursor-pointer"
        />
      </div>
      <p>{messageSentAt}</p>
      {(sentByMe || moderator) && (
        <MdDeleteOutline
          onClick={handleDelete}
          className="w-6 h-6 text-red-400 cursor-pointer"
        />
      )}
    </li>
  );
}
