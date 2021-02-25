import { Resolvers } from "../../../types/resolvers";
import {
  SendingLikeMutationArgs,
  SendingLikeResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import Like from "../../../entities/Like";

const resolvers: Resolvers = {
  Mutation: {
    SendingLike: async (
      _,
      args: SendingLikeMutationArgs,
      { request, Authentification }
    ): Promise<SendingLikeResponse> => {
      Authentification(request);
      const { id } = args;
      const user: User = request.user;
      try {
        const target: User | undefined = await User.findOne(
          { id },
          { relations: ["block", "likeTo"] }
        );
        if (target) {
          if (target.likeTo && target.likeTo.length !== 0) {
            const existed = target.likeTo.findIndex((item) => {
              if (item.to && item.to.id === user.id) {
                return -1;
              } else {
                return 0;
              }
            });
            if (existed === -1) {
              return {
                ok: false,
                err: "You already sent request"
              };
            }
          }
          if (target.block && target.block.length !== 0) {
            const blockCheck = target.block.findIndex((item) => {
              if (item.target && item.target.id === user.id) {
                return -1;
              } else {
                return 0;
              }
            });
            if (blockCheck === -1) {
              return {
                ok: false,
                err: "You are blocked by this user"
              };
            } else {
              const like = await Like.create({
                to: target,
                from: user
              }).save();
              target.likeTo.push(like);
              user.likeFrom.push(like);
              target.fameRatingCounter();
              target.save();
              user.save();
              return {
                ok: true,
                err: null
              };
            }
          } else {
            const like = await Like.create({
              to: target,
              from: user
            }).save();
            target.likeTo.push(like);
            user.likeFrom.push(like);
            target.save();
            user.save();
            return {
              ok: true,
              err: null
            };
          }
        } else {
          return {
            ok: false,
            err: "No User Found"
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
