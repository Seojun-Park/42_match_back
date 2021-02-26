import { Resolvers } from "../../../types/resolvers";
import {
  AcceptLikeMutationArgs,
  AcceptLikeResponse
} from "../../../types/graph";
import Like from "../../../entities/Like";

const resolvers: Resolvers = {
  Mutation: {
    AcceptLike: async (
      _,
      args: AcceptLikeMutationArgs,
      { request, Authentification }
    ): Promise<AcceptLikeResponse> => {
      Authentification(request);
      const { likeId } = args;
      try {
        const like: Like | undefined = await Like.findOne(
          { id: likeId },
          { relations: ["from"] }
        );
        if (like) {
          like.status = "ACCEPTED";
          like.isMatch = true;
          like.save();
          return {
            ok: true,
            err: null
          };
        } else {
          return {
            ok: false,
            err: "No like sending Found"
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
