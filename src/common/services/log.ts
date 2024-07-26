import Logger, { createLogger } from "bunyan";
import dotenv from "dotenv";
// import { errSerializer, resSerializer, createRequestSerializer } from "@app/data/util";

dotenv.config();

export const Log: Logger = createLogger({
  name: process.env.SERVICE_NAME,
  // serializers: {
  //   err: errSerializer,
  //   res: resSerializer,
  //   req: createRequestSerializer("password")
  // }
});
