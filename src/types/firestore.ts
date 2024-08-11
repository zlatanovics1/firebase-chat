import { Timestamp } from "firebase/firestore";

export interface Message {
  content: string;
  likes: number;
  user_id: string;
  id: string;
  createdAt: Timestamp;
}

export interface User {
  email: string;
  id: string;
  notificationTokens?: string[];
}
