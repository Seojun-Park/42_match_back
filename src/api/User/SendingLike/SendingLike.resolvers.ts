import { Resolvers } from "../../../types/resolvers";
import {
  SendingLikeMutationArgs,
  SendingLikeResponse
} from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    SendingLike: async (
      _,
      args: SendingLikeMutationArgs,
      { request, Authentification }
    ): Promise<SendingLikeResponse> => {
      Authentification(request);
      const { id } = args;
    //   const user: User = request.user;

      try {
        const target = await User.findOne({ id }, { relations: ["block"] });
        console.log(target);
        return {
          ok: false,
          err: "null"
        };
      } catch (err) {
        return {
          ok: false,
          err: null
        };
      }
    }
  }
};

export default resolvers;
