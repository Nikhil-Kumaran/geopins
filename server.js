const { ApolloServer } = require("apollo-server");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const { findOrCreateUser } = require("./controllers/userController");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("db connected"))
  .catch((error) => console.error(error));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let idToken = null;
    let currentUser = null;
    try {
      idToken = req.headers.authorization;
      if (idToken) {
        currentUser = await findOrCreateUser(idToken);
      }
    } catch (error) {
      console.error("Unable to authenticate user");
    }
    return { currentUser };
  },
});

server.listen().then(({ url }) => console.log("listening on", url));
