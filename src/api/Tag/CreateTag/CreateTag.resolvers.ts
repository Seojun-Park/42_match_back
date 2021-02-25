import { Resolvers } from "../../../types/resolvers";
import { CreateTagMutationArgs, CreateTagResponse } from "../../../types/graph";
import Tag from "../../../entities/Tag";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    CreateTag: async (
      _,
      args: CreateTagMutationArgs,
      { request, Authentification }
    ): Promise<CreateTagResponse> => {
      Authentification(request);
      const user: User = request.user;
      const { title } = args;
      try {
        const existed = await Tag.findOne({ title }, { relations: ["user"] });
        if (existed) {
          existed.user.push(user);
          existed.save();
          user.tags.push(existed);
          user.save();
          return {
            ok: true,
            err: null,
            tag: existed
          };
        } else {
          const newTag = await Tag.create({ title }).save();
          user.tags.push(newTag); //double implement check needed
          newTag.user.push(user);
          newTag.save();
          user.save();
          return {
            ok: true,
            err: null,
            tag: newTag
          };
        }
      } catch (err) {
        return {
          ok: false,
          err: err.message,
          tag: null
        };
      }
    }
  }
};

export default resolvers;
