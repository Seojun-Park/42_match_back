import { Resolvers } from "../../../types/resolvers";
import {
  CreateChatMutationArgs,
  CreateChatResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
  Mutation: {
    CreateChat: async (
      _,
      args: CreateChatMutationArgs,
      { request, Authentification }
    ): Promise<CreateChatResponse> => {
      Authentification(request);
      const { targetId } = args;
      const user: User = request.user;
      try {
        const target = await User.findOne(
          { id: targetId },
          { relations: ["chats"] }
        );
        if (target) {
          const chat = await Chat.create({ from: user, to: target }).save();
          target.chats.push(chat);
          user.chats.push(chat);
          target.save();
          user.save();
          return {
            ok: true,
            err: null
          };
        } else {
          return {
            ok: false,
            err: "No user found"
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
