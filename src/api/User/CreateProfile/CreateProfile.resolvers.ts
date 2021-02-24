import { Resolvers } from "../../../types/resolvers";
import {
  CreateProfileMutationArgs,
  CreateProfileResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import Image from "../../../entities/Image";

const resolvers: Resolvers = {
  Mutation: {
    CreateProfile: async (
      _,
      args: CreateProfileMutationArgs,
      { request, Authentification }
    ): Promise<CreateProfileResponse> => {
      const {
        images,
        preference,
        profilePhoto,
        intro,
        gender,
        age,
        location
      } = args;
      Authentification(request);
      const user: User = request.user;
      try {
        // const user = await User.findOne({ id });
        if (user) {
          if (images && images.length !== 0) {
            images.map(async (img) => {
              await Image.create({
                user,
                url: img
              });
            });
          }
          user.age = age;
          user.profilePhoto = profilePhoto;
          user.intro = intro;
          user.gender = gender;
          user.location = location;
          if (preference) {
            user.preference = preference;
          } else {
            user.preference = [];
          }
          user.save();
          return {
            ok: true,
            err: null,
            user
          };
        } else {
          return {
            ok: false,
            err: "can not find the user",
            user: null
          };
        }
      } catch (err) {
        return {
          ok: false,
          err: err.message,
          user: null
        };
      }
    }
  }
};

export default resolvers;
