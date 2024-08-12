import { useState } from "react";
import Button from "./Button";
import { useAppSelector } from "../redux/store";
import { getUser } from "../redux/slices/userSlice";
import { sendMessageFirestore } from "../services/ChatService";
import { toast } from "react-toastify";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const user = useAppSelector(getUser);

  async function handleSendMessage() {
    const msgData = {
      likes: 0,
      content: message,
      user_id: user.id,
    };
    await sendMessageFirestore(msgData);
  }
  return (
    <div
      className="flex gap-5 items-center mb-10 mt-20
     justify-center"
    >
      <input
        type="text"
        value={message}
        className="rounded-md text-gray-400 border-2 w-full max-w-xl px-4 py-2 border-gray-300 focus:border-indigo-700 transition-all outline-none"
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        onClick={handleSendMessage}
        className=" -translate-y-2 py-3 px-7 rounded-xl"
      >
        Send message
      </Button>
    </div>
  );
}
