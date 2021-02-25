import { Resolvers } from "../../../types/resolvers";
import {
  SearchUserByAgeQueryArgs,
  SearchUserByAgeResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import { Between, getRepository } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    SearchUserByAge: async (
      _,
      args: SearchUserByAgeQueryArgs,
      { request, Authentification }
    ): Promise<SearchUserByAgeResponse> => {
      Authentification(request);
      const { age } = args;
      try {
        const users: User[] = await getRepository(User).find({
          age: Between(age - 5, age + 5)
        });
        return {
          ok: true,
          err: null,
          users
        };
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
