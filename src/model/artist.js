const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { composeWithMongoose } = require("graphql-compose-mongoose");
const ArtistSchema = new Schema(
  {
    name: String,
    isActive: Boolean,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = {
  ArtistSchema: mongoose.model("artist", ArtistSchema),
  ArtistTC: composeWithMongoose(mongoose.model("artist", ArtistSchema)),
};
