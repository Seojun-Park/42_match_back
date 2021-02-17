import { Resolvers } from "../../../types/resolvers";
import {
  CreateAccountMutationArgs,
  CreateAccountResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    CreateAccount: async (
      _,
      args: CreateAccountMutationArgs
    ): Promise<CreateAccountResponse> => {
      const { email } = args;
      try {
        const exist = await User.findOne({
          email
        });
        if (exist) {
          return {
            ok: false,
            err: "This email is already taken",
            token: null
          };
        } else {
          const newUser = await User.create({ ...args }).save();
          const token = createJWT(newUser.id);
          return {
            ok: true,
            err: null,
            token
          };
        }
      } catch (err) {
        return {
          ok: false,
          err: err.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
