import IORedis from "ioredis";
import { config } from "dotenv";
import { Log } from "./log";

config();

export const Store = new IORedis(
  process.env.redis_url,
  process.env.is_production ? { lazyConnect: true, password: process.env.redis_password } : { lazyConnect: true }
);
Store.on("ready", () => Log.info("🐳 Redis Connected!"));
Store.on("error", err => Log.info(err, "An error occured with the Redis client."));
