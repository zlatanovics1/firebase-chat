// import { getToken } from "firebase/messaging";
// import { messaging } from "../config/firebase";
// import { catchAsyncError } from "../utils/catchAsyncError";
// import { vapidKey } from "../config/firebase";

// export const allowNotifications = catchAsyncError<void, void>(async () => {
//   getToken(messaging, { vapidKey });
// });
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { auth, db, vapidKey } from "../config/firebase";

const messaging = getMessaging();

export const enableFCM = () =>
  getToken(messaging, { vapidKey })
    .then(async (currentToken) => {
      if (currentToken) {
        // Token retrieval successful; you can send this token to your server
        console.log("Token retrieved:", currentToken);

        const newTokenRef = collection(
          db,
          `users/${auth.currentUser!.uid}/tokens`
        );

        const q = query(newTokenRef, where("token", "==", currentToken));
        const qsnap = await getDocs(q);

        if (!qsnap.empty) return;
        console.log("Saving token to db");
        addDoc(newTokenRef, {
          token: currentToken,
        });
      } else {
        // No registration token available. Request permission to generate one.
        console.log(
          "No registration token available. Request permission to generate one."
        );
        requestNotificationPermission();
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });

// Function to request notification permission from the user
function requestNotificationPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      // Now that permission is granted, try to get the token again
      getToken(messaging, { vapidKey: "YOUR_PUBLIC_VAPID_KEY" })
        .then((currentToken) => {
          if (currentToken) {
            console.log(
              "Token retrieved after granting permission:",
              currentToken
            );
            // Send the token to your server
          } else {
            console.log(
              "Failed to retrieve token even after permission granted."
            );
          }
        })
        .catch((err) => {
          console.log(
            "An error occurred while retrieving token after granting permission. ",
            err
          );
        });
    } else {
      console.log("Notification permission denied.");
    }
  });
}

// Listen for incoming messages while the app is in the foreground
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  alert(payload.notification?.title);
  // Customize your notification here
});
