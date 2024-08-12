importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyD_C2R5WqVpRT_siOQlUX9s7IYwvfn4GHM",
  authDomain: "firebasics-b0106.firebaseapp.com",
  projectId: "firebasics-b0106",
  storageBucket: "firebasics-b0106.appspot.com",
  messagingSenderId: "41466439381",
  appId: "1:41466439381:web:711c21bb90309d1282e45c",
  measurementId: "G-64H9GG2D5S",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
