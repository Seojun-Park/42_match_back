import { Resolvers } from "../../../types/resolvers";
import {
  RequestCodeMutationArgs,
  RequestCodeResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import { generateCode, sendMail } from "../../../utils/decodeJWT";

const resolvers: Resolvers = {
  Mutation: {
    RequestCode: async (
      _,
      args: RequestCodeMutationArgs
    ): Promise<RequestCodeResponse> => {
      const { email } = args;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return {
            ok: false,
            err: "No user found on this email"
          };
        } else {
          const code = generateCode();
          await sendMail(email, code);
          user.secretCode = code;
          user.save();
          return {
            ok: true,
            err: null
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
