import { Resolvers } from "../../../types/resolvers";
import {
  CancelLikeMutationArgs,
  CancelLikeResponse
} from "../../../types/graph";
import Like from "../../../entities/Like";
// import User from "../../../entities/User";

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
        const like: Like | undefined = await Like.findOne(
          { id: likeId },
          { relations: ["to"] }
        );
        if (like) {
          // if like counting doesn't work properly, try this
          // if (like.to) {
          //   const target: User | undefined = await User.findOne({
          //     id: like.to.id
          //   });
          //   if (target) {
          //     target.fameRating -= 1;
          //   }
          // }
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
