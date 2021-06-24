const { ArtistTC } = require("../model/artist");
const { ArtistSchema } = require("../model/artist");

ArtistTC.addResolver({
  name: "create",
  kind: "mutation",
  type: ArtistTC.getResolver("createOne").getType(),
  args: ArtistTC.getResolver("createOne").getArgs(),
  resolve: async ({ source, args, context, info }) => {
    const artist = await ArtistSchema.create(args.record);

    return {
      record: artist,
      recordId: ArtistTC.getRecordIdFn()(artist),
    };
  },
});

const ArtistQuery = {
  artistById: ArtistTC.getResolver("findById"),
  artistByIds: ArtistTC.getResolver("findByIds"),
  artistOne: ArtistTC.getResolver("findOne"),
  artistMany: ArtistTC.getResolver("findMany"),
  artistCount: ArtistTC.getResolver("count"),
  artistConnection: ArtistTC.getResolver("connection"),
  artistPagination: ArtistTC.getResolver("pagination"),
};

const ArtistMutation = {
  artistWithFile: ArtistTC.getResolver("create"),
  artistCreateOne: ArtistTC.getResolver("createOne"),
  artistCreateMany: ArtistTC.getResolver("createMany"),
  artistUpdateById: ArtistTC.getResolver("updateById"),
  artistUpdateOne: ArtistTC.getResolver("updateOne"),
  artistUpdateMany: ArtistTC.getResolver("updateMany"),
  artistRemoveById: ArtistTC.getResolver("removeById"),
  artistRemoveOne: ArtistTC.getResolver("removeOne"),
  artistRemoveMany: ArtistTC.getResolver("removeMany"),
};

module.exports = { ArtistQuery: ArtistQuery, ArtistMutation: ArtistMutation };
