import { useMessages } from "../hooks/useMessages";
import { getUser } from "../redux/slices/userSlice";
import { useAppSelector } from "../redux/store";
import Message from "./Message";
import MessageInput from "./MessageInput";

export default function Chat() {
  const user = useAppSelector(getUser);
  const { messages, isFetching } = useMessages();

  if (isFetching)
    return <h2 className="mt-20 font-bold text-4xl text-center">Loading...</h2>;
  if (!messages || !messages.length)
    return (
      <>
        {user.isLogedIn && <MessageInput />}
        <h2 className="mt-20 font-bold text-4xl text-center">No messages</h2>
      </>
    );

  return (
    <>
      {user.isLogedIn && <MessageInput />}
      <ul className="flex flex-col gap-5 items-start px-10 mt-32">
        {messages.length &&
          messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              sentByMe={user.id === message.user_id}
            />
          ))}
      </ul>
    </>
  );
}
