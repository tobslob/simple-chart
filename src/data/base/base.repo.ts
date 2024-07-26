import { PrismaClient } from "@prisma/client";

export class BaseRepository extends PrismaClient {
  super() {}
}
