import "module-alias/register";
import "reflect-metadata";
import sinon from "sinon";
import supertest, { SuperTest, Test } from "supertest";
import { App } from "../src/server/app";
import { StatusCodes } from "http-status-codes";
import { createUser } from "./mocks/services";
import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import dotenv from "dotenv";

let app: App;
let request: SuperTest<Test>;

const baseUrl = "/api/v1/users";

beforeAll(async () => {
  dotenv.config({ path: `.env.test` });

  console.log(process.env.DATABASE_URL);
  app = new App();

  const server = app.getServer().build();
  request = supertest(server);
  execSync("npx prisma migrate deploy");
});

afterAll(async () => {
  new PrismaClient().$disconnect();
});

afterEach(async () => {
  sinon.resetHistory();
  sinon.resetBehavior();
});

describe("User", () => {
  it("Successfully create user", async () => {
    const { body } = await request
      .post(baseUrl)
      .send(await createUser())
      .expect(StatusCodes.OK);

    console.log("User created successfully", body);
    expect(body.data).toHaveProperty("name");
  });
});
