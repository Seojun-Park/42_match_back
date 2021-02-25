import { Resolvers } from "../../../types/resolvers";
import {
  UnblockUserMutationArgs,
  UnblockUserResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import BlockedUser from "../../../entities/Block";

const resolvers: Resolvers = {
  Mutation: {
    UnblockUser: async (
      _,
      args: UnblockUserMutationArgs,
      { request, Authentification }
    ): Promise<UnblockUserResponse> => {
      Authentification(request);
      const user: User = request.user;
      const { id } = args;
      try {
        const blockedUser = user.block.find((user) => user.userId === id);
        if (blockedUser) {
          const idx = user.block.indexOf(blockedUser);
          user.block.splice(idx, 1);
          user.save();
          await BlockedUser.delete({ id: blockedUser.id });
          return {
            ok: true,
            err: null
          };
        } else {
          return {
            ok: false,
            err: "You didn't block this user"
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
