import { Resolvers } from "../../../types/resolvers";
import {
  GetFollowingQueryArgs,
  GetFollowingResponse
} from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    GetFollowing: async (
      _,
      args: GetFollowingQueryArgs,
      { request, Authentification }
    ): Promise<GetFollowingResponse> => {
      Authentification(request);
      const { id } = args;
      try {
        const user: User | undefined = await User.findOne(
          { id },
          { relations: ["following", "following.user"] }
        );
        if (user) {
          return {
            ok: true,
            err: null,
            following: user.following
          };
        } else {
          return {
            ok: false,
            err: "No User Found",
            following: null
          };
        }
      } catch (err) {
        return {
          ok: false,
          err: err.message,
          following: null
        };
      }
    }
  }
};
export default resolvers;
