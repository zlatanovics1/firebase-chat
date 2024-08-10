/* eslint-disable quotes */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

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

exports.addCace = functions.https.onCall(async (data, context) => {
  await grantModeratorRole("strahinja@gmail.com");
});
