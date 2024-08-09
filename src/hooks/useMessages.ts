import { useQuery, useQueryClient } from "react-query";
import {
  getMessagesFirestore,
  listenForMessages,
} from "../services/ChatService";
import { useEffect } from "react";

export function useMessages() {
  const { data: messages, isFetching } = useQuery({
    queryKey: "messages",
    queryFn: getMessagesFirestore,
  });
  const queryClient = useQueryClient();

  useEffect(function () {
    const unsub = listenForMessages(() =>
      queryClient.invalidateQueries({ queryKey: "messages" })
    );

    return () => unsub();
  }, []);

  return { messages, isFetching };
}
