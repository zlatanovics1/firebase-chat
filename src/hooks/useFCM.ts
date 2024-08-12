import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "../config/firebase";
import { Slide, toast } from "react-toastify";
import Notif from "../components/Notif";

// const fakePayload = {
//   notification: {
//     title: "new follower",
//     body: "Mike just followed you",
//   },
//   data: {
//     followedAt: "22/4/2020",
//   },
// };

export default function useFCM() {
  useEffect(function () {
    onMessage(messaging, (payload) => {
      console.log(payload);

      const NotifComp = Notif(payload);
      toast(NotifComp, {
        hideProgressBar: true,
        transition: Slide,
      });
    });
  }, []);
  return null;
}
