import { Resolvers } from "../../../types/resolvers";
import {
  EditProfileMutationArgs,
  EditProfileResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    EditProfile: async (
      _,
      args: EditProfileMutationArgs,
      { request, Authentification }
    ): Promise<EditProfileResponse> => {
      Authentification(request);
      const argsWithoutNull = cleanNullArgs(args);
      try {
        await User.update({ id: request.user.id }, { ...argsWithoutNull });
        return {
          ok: true,
          err: null,
          user: request.user
        };
      } catch (err) {
        return {
          ok: false,
          err: null,
          user: null
        };
      }
    }
  }
};
export default resolvers;
