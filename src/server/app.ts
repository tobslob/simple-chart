import "module-alias/register";
import "reflect-metadata";
import bodyparser from "body-parser";
import responseTime from "response-time";
import { getRouteInfo, InversifyExpressServer } from "inversify-express-utils";
import container from "../common/config/ioc";
import { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errors } from "@app/data/util";

const env = process.env.NODE_ENV || "development";

dotenv.config({ path: `.env.${env}` });

export class App {
  private server: InversifyExpressServer;
  constructor() {
    this.server = new InversifyExpressServer(container, null, {
      rootPath: process.env.API_VERSION,
    });

    // setup server-level middlewares
    this.server.setConfig((app: Application) => {
      app.enabled("x-powered-by");

      app.use(responseTime());
      app.use(bodyparser.urlencoded({ extended: true }));
      app.use(bodyparser.json());

      // CORS
      const domains = [""];
      const corsConf = {
        origin: [
          /localhost/,
          ...domains.map((domain) => new RegExp(`${domain}$`)),
        ],
        credentials: true,
      };

      app.use(cors(corsConf));
      app.options("*", cors(corsConf));
    });

    this.server.setErrorConfig((app: Application) => {
      // expose index endpoint
      app.get("/", (_req: Request, res: Response) => {
        res.status(200).json({
          status: "success",
          data: { message: "Welcome To Simple Chart" },
        });
      });

      // register 404 route handler
      app.use((_req, res, _next) => {
        res.status(404).json({
          status: "error",
          data: { message: "Not Found" },
        });
      });

      // handle thrown error
      app.use(errors);
    });
  }

  printRoutes() {
    const routeInfo = getRouteInfo(container);
    console.log(JSON.stringify(routeInfo));
  }

  getServer = () => this.server;
}
