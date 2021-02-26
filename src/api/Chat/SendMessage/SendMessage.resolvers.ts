import { Resolvers } from "../../../types/resolvers";
import {
  SendMessageMutationArgs,
  SendMessageResponse
} from "../../../types/graph";
import Chat from "../../../entities/Chat";
import User from "../../../entities/User";
import Message from "../../../entities/Message";

const resolvers: Resolvers = {
  Mutation: {
    SendMessage: async (
      _,
      args: SendMessageMutationArgs,
      { request, Authentification, pubSub }
    ): Promise<SendMessageResponse> => {
      Authentification(request);
      const { receiverId, chatId, text } = args;
      const user: User = request.user;
      try {
        const chat = chatId
          ? await Chat.findOne({ id: chatId })
          : await Chat.create({}).save();
        if (!chat) {
          return {
            ok: false,
            err: "No chat found"
          };
        }
        const receiver: User | undefined = await User.findOne({
          id: receiverId
        });
        if (!receiver) {
          return {
            ok: false,
            err: "No user found"
          };
        }
        const message: Message = await Message.create({
          chat,
          receiver,
          sender: user,
          text
        }).save();
        user.sent.push(message);
        receiver.received.push(message);
        user.save();
        receiver.save();
        pubSub.publish("newMsg", message);
        return {
          ok: true,
          err: null
        };
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
