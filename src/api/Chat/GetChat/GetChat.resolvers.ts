import { Resolvers } from "../../../types/resolvers";
import { GetChatQueryArgs, GetChatResponse } from "../../../types/graph";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
  Query: {
    GetChat: async (
      _,
      args: GetChatQueryArgs,
      { request, Authentification }
    ): Promise<GetChatResponse> => {
      Authentification(request);
      const { chatId } = args;
      try {
        const chat: Chat | undefined = await Chat.findOne(
          { id: chatId },
          { relations: ["messages", "messages.sender", "messages.receiver"] }
        );
        if (!chat) {
          return {
            ok: false,
            err: "No chat found",
            messages: null
          };
        }
        return {
          ok: false,
          err: null,
          messages: chat.messages
        };
      } catch (err) {
        return {
          ok: false,
          err: err.message,
          messages: null
        };
      }
    }
  }
};

export default resolvers;
