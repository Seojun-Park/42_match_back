import { withFilter } from "graphql-yoga";
import { MessageSubSubscriptionArgs } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    MessageSub: {
      resolve: (payload) => payload,
      subscribe: withFilter(
        (_, __, { pubSub }) => {
          return pubSub.asyncIterator("newMsg");
        },
        async (payload, args: MessageSubSubscriptionArgs, { context }) => {
          const user: User = context.currentUser;
          const { userId } = args;
          try {
            return (
              (payload.senderId === userId && payload.receiverId === user.id) ||
              (payload.senderId === user.id && payload.receiverId === userId)
            );
          } catch (err) {
            return err.message;
          }
        }
      )
    }
  }
};

export default resolvers;
