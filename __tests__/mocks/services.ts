import { Users } from "../../src/services/user";
import { faker } from "@faker-js/faker";

export const createUser = async () => {
  return await Users.createUser({
    name: faker.person.fullName(),
    emailAddress: faker.internet.email(),
    gender: faker.helpers.arrayElement(["male", "female", "others"]),
    sleepTimeDuration: faker.number.int({ min: 1, max: 12 }),
  });
};
