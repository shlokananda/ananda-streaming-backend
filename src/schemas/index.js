const { SchemaComposer } = require("graphql-compose");

const schemaComposer = new SchemaComposer();

const { UserQuery, UserMutation } = require("./user");
const { ArtistQuery, ArtistMutation } = require("./artist");

schemaComposer.Query.addFields({
  ...ArtistQuery,
  ...UserQuery,
});

schemaComposer.Mutation.addFields({
  ...ArtistMutation,
  ...UserMutation,
});

module.exports = schemaComposer.buildSchema();
