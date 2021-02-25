import { Resolvers } from "../../../types/resolvers";
import {
  CancelLikeMutationArgs,
  CancelLikeResponse
} from "../../../types/graph";
import Like from "../../../entities/Like";

const resolvers: Resolvers = {
  Mutation: {
    CancelLike: async (
      _,
      args: CancelLikeMutationArgs,
      { request, Authentification }
    ): Promise<CancelLikeResponse> => {
      Authentification(request);
      const { likeId } = args;
      try {
        const like: Like | undefined = await Like.findOne({ id: likeId });
        if (like) {
          await Like.delete({ id: likeId });
          return {
            ok: true,
            err: null
          };
        } else {
          return {
            ok: false,
            err: "No Like Found"
          };
        }
      } catch (err) {
        return {
          ok: false,
          err: err.message
        };
      }
    }
  }
};

export default resolvers;
