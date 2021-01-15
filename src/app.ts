import cors from "cors";
import { NextFunction, Response } from "express";
import logger from "morgan";
import helmet from "helmet";
import schema from "./schema";
import { GraphQLServer, PubSub } from "graphql-yoga";

class App {
  public app: GraphQLServer;
  public pubSub: any;
  constructor() {
    this.pubSub = new PubSub();
    this.pubSub.ee.setMaxListners(99);
    this.app = new GraphQLServer({
      schema,
      context: (req) => {
        const { connection: { context = null } = {} } = req;
        return {
          request: req.request,
          pubSub: this.pubSub,
          context
        };
      }
    });
    this.middlewares();
  }

  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
  };
}

export default new App().app;