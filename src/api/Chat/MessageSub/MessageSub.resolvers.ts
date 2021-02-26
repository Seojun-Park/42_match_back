import { withFilter } from "graphql-yoga";
import { MessageSubSubscriptionArgs } from "../../../types/graph";
import Message from "../../../entities/Message";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    MessageSub: {
      resolve: (payload) => payload,
      subscribe: withFilter(
        (_, __, { pubSub }) => {
          return pubSub.asyncIterator("newMsg");
        },
        (payload: Message, args: MessageSubSubscriptionArgs, { request }) => {
          const user: User = request.user;
          const { userId } = args;
          return (
            (payload.senderId === userId && payload.receiverId === user.id) ||
            (payload.senderId === user.id && payload.receiverId === userId)
          );
        }
      )
    }
  }
};

export default resolvers;
