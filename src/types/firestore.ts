import { Timestamp } from "firebase/firestore";

export interface Message {
  content: string;
  likes: number;
  user_id: string;
  id: string;
  createdAt: Timestamp;
}

export interface Booking {
  id: string;
  issuedAt: Timestamp;
  userId: string;
  description: string;
  user: { name: string }[];
}
