import { Resolvers } from "../../../types/resolvers";
import {
  UnblockUserMutationArgs,
  UnblockUserResponse
} from "../../../types/graph";
import User from "../../../entities/User";
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
        console.log(user.block);

        const blockedUser = user.block.filter((user) => user.ownerId === id);
        if (blockedUser) {
          // user.block.splice(blockedUser, 1);
          // user.save();
          return {
            ok: false,
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
