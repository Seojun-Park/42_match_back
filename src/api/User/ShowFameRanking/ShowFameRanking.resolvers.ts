import { Resolvers } from "../../../types/resolvers";
import { ShowFameRankingResponse } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    ShowFameRanking: async (
      _,
      __,
      { request, Authentification }
    ): Promise<ShowFameRankingResponse> => {
      Authentification(request);
      try {
        const users: User[] = await User.find({ order: { fameRating: "ASC" } });
        if (users) {
          return {
            ok: true,
            err: null,
            users
          };
        } else {
          return {
            ok: false,
            err: "No Users Found",
            users: null
          };
        }
      } catch (err) {
        return {
          ok: false,
          err: err.message,
          users: null
        };
      }
    }
  }
};

export default resolvers;
