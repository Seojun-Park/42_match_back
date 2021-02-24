import { Resolvers } from "../../../types/resolvers";
import { SearchUserQueryArgs, SearchUserReponse } from "../../../types/graph";
import User from "../../../entities/User";
import { Between, getRepository } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    SearchUser: async (
      _,
      args: SearchUserQueryArgs,
      { request, Authentification }
    ): Promise<SearchUserReponse> => {
      Authentification(request);
      const { lat, lng, location } = args;
      try {
        if (location !== "" && !lat && !lng) {
          const users: User[] = await getRepository(User).find({
            where: {
              location
            }
          });
          return {
            ok: true,
            err: null,
            users
          };
        } else if (lat && lng && location === "") {
          const users = await getRepository(User).find({
            lastLat: Between(lat - 0.05, lat + 0.05),
            lastLng: Between(lng - 0.05, lng + 0.05)
          });
          return {
            ok: true,
            err: null,
            users
          };
        } else {
          return {
            ok: false,
            err: "No user Found",
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
