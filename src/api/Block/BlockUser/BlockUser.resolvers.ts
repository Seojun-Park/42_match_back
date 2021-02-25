import { Resolvers } from "../../../types/resolvers";
import { BlockUserMutationArgs, BlockUserResponse } from "../../../types/graph";
import User from "../../../entities/User";
import BlockedUser from "../../../entities/Block";

const resolvers: Resolvers = {
  Mutation: {
    BlockUser: async (
      _,
      args: BlockUserMutationArgs,
      { request, Authentification }
    ): Promise<BlockUserResponse> => {
      Authentification(request);
      const user: User = request.user;
      const { id } = args;
      try {
        const existed = user.block.map((item) => {
          if (item.ownerId === id) {
            return true;
          } else {
            return false;
          }
        });
        if (existed.length !== 0) {
          return {
            ok: false,
            err: "You already blocked this user"
          };
        } else {
          const targetUser = await User.findOne({ id });
          const block = await BlockedUser.create({
            owner: user,
            target: targetUser
          }).save();
          user.block.push(block);
          user.save();
          return {
            ok: true,
            err: null
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
