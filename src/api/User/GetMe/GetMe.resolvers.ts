import { Resolvers } from "../../../types/resolvers";
import { GetMeResponse } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    GetMe: async (
      _,
      __,
      { request, Authentification }
    ): Promise<GetMeResponse> => {
      Authentification(request);
      const user: User = request.user;
      console.log(user);
      try {
        if (user) {
          return {
            ok: true,
            err: null,
            user
          };
        } else {
          return {
            ok: false,
            err: "error occured, contact admin",
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
