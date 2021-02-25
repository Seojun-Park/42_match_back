import { Resolvers } from "../../../types/resolvers";
import {
  ReportUserMutationArgs,
  ReportUserResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import Report from "../../../entities/Report";

const resolvers: Resolvers = {
  Mutation: {
    ReportUser: async (
      _,
      args: ReportUserMutationArgs,
      { request, Authentification }
    ): Promise<ReportUserResponse> => {
      Authentification(request);
      const user: User = request.user;
      const { id } = args;
      try {
        const target = await User.findOne({ id });
        if (target) {
          await Report.create({ reporter: user, target }).save();
          return {
            ok: true,
            err: null
          };
        } else {
          return {
            ok: true,
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
