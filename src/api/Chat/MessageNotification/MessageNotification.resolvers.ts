import { withFilter } from "graphql-yoga";
import Message from "../../../entities/Message";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    MessageNotification: {
      resolve: (payload) => payload,
      subscribe: withFilter(
        (_, __, { pubSub }) => {
          return pubSub.asyncIterator("newMsg");
        },
        (payload: Message, _, context) => {
          const receiver: User = context.currentUser;
          return payload.receiverId === receiver.id;
        }
      )
    }
  }
};

export default resolvers;
