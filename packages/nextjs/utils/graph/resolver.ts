// import { MeshContext, Resolvers } from "../../.graphclient";

export const resolvers = {
  Rebase: {
    chainName: (root, args, context, info) => context.chainName || "nonsense",
  },
};
