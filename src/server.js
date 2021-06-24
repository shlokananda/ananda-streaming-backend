const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const logger = require("./core/logger");
const { dbConnectionString } = require("./configs/server-config.js");
const port = process.env.PORT || 8080;
// GrahpQL
const graphqlSchema = require("./schemas/index");

const extensions = ({ context }) => {
  return {
    runTime: Date.now() - context.startTime,
  };
};

// DB Logger
// app.use(logger);

// DB Connection Success
app.listen(port, async () => {
  console.log("server is running ", port);
  await mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// DB Connection Error
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

// GraphQL Test Call
app.use(
  "/graphql",
  graphqlHTTP((request) => {
    return {
      context: { startTime: Date.now() },
      graphiql: true,
      schema: graphqlSchema,
      extensions,
    };
  })
);

// Files Management API
app.use("/upload", (req, res) => {
  res.send(`Upload Service Running`);
});

// Default
app.use("/", (req, res) => {
  res.send(`API is ready`);
});
