const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const logger = require("./core/logger");
const { dbConnectionString } = require("./configs/server-config.js");
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";
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
// app.listen(PORT, HOST, async () => {
//   console.log(`Running on http://${HOST}:${PORT}`);
//   await mongoose.connect(dbConnectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });
app.listen(PORT, async () => {
  console.log(`Running on ${PORT}`);
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

// DB Connection Success
mongoose.connection.on(
  "success",
  console.log.bind(console, "MongoDB connected successfully!")
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
