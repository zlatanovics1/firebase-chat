/* eslint-disable quotes */
/* eslint-disable */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { log } from "firebase-functions/logger";

admin.initializeApp();

/**
 * Grants the moderator role to a user identified by their email address.
 * @param {string} email - The email address of the user to grant the role.
 * @return {Promise<void>} A promise resolves when the role is granted.
 */
async function grantModeratorRole(email: string) {
  const user = await admin.auth().getUserByEmail(email);
  if (user.customClaims && (user.customClaims as any).moderator === true) {
    return;
  }

  await admin.auth().setCustomUserClaims(user.uid, {
    moderator: true,
  });
}

exports.addModeratorRole = functions.https.onCall(async (data, context) => {
  if (!context.auth?.token.moderator) {
    return {
      error: "Only moderators can add other moderators.",
    };
  }

  const email = data.email;
  await grantModeratorRole(email);

  return {
    result: `Request fulfilled! ${email} is now a moderator.`,
  };
});

exports.addUserOnCreate = functions.auth.user().onCreate(async (user) => {
  await admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
  });
});

exports.notifyNewFollower = functions.firestore
  .document("followers/{id}")
  .onCreate(async (snapshot, context) => {
    const followedId = snapshot.data().followedId;
    const followerId = snapshot.data().followerId;

    const follower = await admin.auth().getUser(followerId);
    const followedUserTokens = await admin
      .firestore()
      .collection(`users/${followedId}/tokens`)
      .get();
    const tokens = followedUserTokens.docs.map((doc) => doc.data().token);

    const payload = {
      notification: {
        title: "New follower",
        body: `${follower.email?.split("@").at(0)} just followed you!`,
      },
      data: {
        followedAt: new Date().toDateString(),
      },
      tokens,
    };

    await admin.messaging().sendEachForMulticast(payload);
    // await admin.messaging.log(
    //   `New follower: ${followerUser.email} is now following ${followedUser.email}.`
    // );
  });
