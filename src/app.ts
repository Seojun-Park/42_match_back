import cors from "cors";
import { NextFunction, Response } from "express";
import logger from "morgan";
import helmet from "helmet";
import schema from "./schema";
import { GraphQLServer, PubSub } from "graphql-yoga";
import { authenticateJwt } from "./passport";
import { decodeJWT } from "./utils/decodeJWT";
import Authentification from "./utils/Authentification";

class App {
  public app: GraphQLServer;
  public pubSub: any;
  constructor() {
    this.pubSub = new PubSub();
    this.pubSub.ee.setMaxListeners(99);
    this.app = new GraphQLServer({
      schema,
      context: (req) => {
        const { connection: { context = null } = {} } = req;
        return {
          request: req.request,
          pubSub: this.pubSub,
          context,
          Authentification
        };
      }
    });
    this.middlewares();
  }

  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(authenticateJwt);
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  private jwt = async (
    req,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get("authorization");
    if (token) {
      const user = await decodeJWT(token);
      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }
    next();
  };
}

export default new App().app;
