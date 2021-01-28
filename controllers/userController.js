const User = require("../models/User");

const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

exports.findOrCreateUser = async (idToken) => {
  const googleUser = await verifyAuthToken(idToken);
  const user = await checkIfUserExists(googleUser.email);
  return user ? user : createNewUser(googleUser);
};

const verifyAuthToken = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.OAUTH_CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (error) {
    console.error("Error while verifying token");
  }
};

const checkIfUserExists = async (email) => await User.findOne({ email }).exec();

const createNewUser = (googleUser) => {
  const { name, email, picture } = googleUser;
  return new User({ name, email, picture }).save();
};
