import { Resolvers } from "../../../types/resolvers";
import {
  UserVerificationMutationArgs,
  UserVerificationResponse
} from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    UserVerification: async (
      _,
      args: UserVerificationMutationArgs
    ): Promise<UserVerificationResponse> => {
      const { email, code } = args;
      try {
        const user: User | undefined = await User.findOne({ email });
        if (user) {
          if (user.secretCode === code) {
            user.secretCode = "";
            user.isVerified = true;
            user.save();
            return {
              ok: true,
              err: null
            };
          } else {
            return {
              ok: false,
              err: "Code is wrong, check it again"
            };
          }
        } else {
          return {
            ok: false,
            err: "user not found"
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
