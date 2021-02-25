import { Resolvers } from "../../../types/resolvers";
import {
  UnblockUserMutationArgs,
  UnblockUserResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import BlockedUser from "../../../entities/Block";
// import BlockedUser from "../../../entities/Block";

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
        const blockedUser = user.block.findIndex((item, idx) => {
          if (item.target.id === id) {
            return idx;
          } else {
            return -1;
          }
        });
        if (blockedUser >= 0) {
          await BlockedUser.delete({ id: user.block[blockedUser].id });
          user.block.splice(blockedUser, 1);
          user.save();
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
