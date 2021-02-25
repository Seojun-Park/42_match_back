import { Resolvers } from "../../../types/resolvers";
import {
  ToggleFollowingMutationArgs,
  ToggleFollowingResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import Following from "../../../entities/Following";
import Follower from "../../../entities/Follower";

const resolvers: Resolvers = {
  Mutation: {
    ToggleFollowing: async (
      _,
      args: ToggleFollowingMutationArgs,
      { request, Authentification }
    ): Promise<ToggleFollowingResponse> => {
      Authentification(request);
      const user: User = request.user;
      const { id, action } = args;
      try {
        //   front 에서 팔로잉 중인지 아닌지를 구별해서 보내야 함
        const target = await User.findOne({ id });
        if (target) {
          if (action === "FOLLOWING") {
            await Following.create({ user, target }).save();
            await Follower.create({ user: target, target: user }).save();
            return {
              ok: true,
              err: null
            };
          } else {
            const unfollowing = user.following.findIndex((item, idx) => {
              if (item.user.id === user.id) {
                return idx;
              } else {
                return -1;
              }
            });
            const unfollower = target.follower.findIndex((item, idx) => {
              if (item.user.id === id) {
                return idx;
              } else {
                return -1;
              }
            });
            if (unfollowing >= 0 || unfollower >= 0) {
              await Following.delete({ id: user.following[unfollowing].id });
              await Follower.delete({ id: target.follower[unfollower].id });
              user.following.splice(unfollowing, 1);
              target.follower.splice(unfollower, 1);
              user.save();
              target.save();
              return {
                ok: true,
                err: null
              };
            } else {
              return {
                ok: true,
                err: "Err occured"
              };
            }
          }
        } else {
          return {
            ok: false,
            err: "No user Found"
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
