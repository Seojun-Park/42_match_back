import { Resolvers } from "../../../types/resolvers";
import { UserLoginMutationArgs, UserLoginResponse } from "../../../types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    UserLogin: async (
      _,
      args: UserLoginMutationArgs
    ): Promise<UserLoginResponse> => {
      const { email, password } = args;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return {
            ok: false,
            err: "No user found",
            token: null
          };
        }
        const checkPassword = await user.comparePassword(password);
        if (checkPassword) {
          const token = createJWT(user.id);
          return {
            ok: true,
            err: null,
            token
          };
        } else {
          return {
            ok: false,
            err: "Wrong password",
            token: null
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
