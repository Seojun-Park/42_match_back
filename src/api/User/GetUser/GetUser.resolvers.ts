import { Resolvers } from "../../../types/resolvers";
import { GetUserQueryArgs, GetUserResponse } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    GetUser: async (
      _,
      args: GetUserQueryArgs,
      { request, Authentification }
    ): Promise<GetUserResponse> => {
      Authentification(request);
      const { id } = args;
      try {
        if (id) {
          const user: User | undefined = await User.findOne(
            { id },
            { relations: ["following", "follower", "tags", "images"] }
          );
          if (user) {
            return {
              ok: true,
              err: null,
              user
            };
          } else {
            return {
              ok: false,
              err: "User Not Found",
              user: null
            };
          }
        } else {
          return {
            ok: false,
            err: "No id requested",
            user: null
          };
        }
      } catch (err) {
        return {
          ok: false,
          err: err.message,
          user: null
        };
      }
    }
  }
};

export default resolvers;
