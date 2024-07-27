import { User as UserModel } from "./../data/user/user.model";
import { UserDTO, User } from "@app/data/user";
import { config } from "dotenv";
import { UserRepo } from "@app/data/user/user.repo";
import moment from "moment";

config();

class UserService {
  constructor() {}

  async createUser(data: UserDTO): Promise<User> {
    let user: UserModel;

    console.log(data);

    const date = new Date(data.date);
    const startOfDay = moment(date).startOf("day").toDate();
    const endOfDay = moment(date).endOf("day").toDate();

    const existingUser = await UserRepo.users.findFirst({
      where: {
        AND: [
          { emailAddress: data.emailAddress },
          { date: { gte: startOfDay, lt: endOfDay } },
        ],
      },
    });
    const sleepTime = existingUser
      ? existingUser.sleepTimeDuration + data.sleepTimeDuration
      : data.sleepTimeDuration;

    if (sleepTime > 24) {
      throw new Error("sleepTimeDuration cannot be greater than 24 hours.");
    }

    if (existingUser) {
      user = await UserRepo.users.update({
        where: {
          id: existingUser.id,
        },
        data: {
          ...existingUser,
          count: existingUser.count + 1,
          sleepTimeDuration:
            existingUser.sleepTimeDuration + data.sleepTimeDuration,
        },
      });
    } else {
      user = await UserRepo.users.create({
        data: {
          emailAddress: data.emailAddress,
          gender: data.gender,
          name: data.name,
          sleepTimeDuration: data.sleepTimeDuration,
          date: new Date(data.date),
        },
      });
    }

    return user;
  }

  async getUser(id: string): Promise<User> {
    const user = await UserRepo.users.findFirst({
      where: {
        id,
      },
    });

    return user;
  }

  async getUsers(emailAddress: string): Promise<User[]> {
    let users: UserModel[];
    if (emailAddress) {
      const sevenDaysAgo = new Date();

      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      sevenDaysAgo.setHours(0, 0, 0, 0);

      users = await UserRepo.users.findMany({
        where: {
          AND: [
            emailAddress ? { emailAddress } : {},
            { date: { gte: sevenDaysAgo } },
          ],
        },
        orderBy: {
          date: "asc",
        },
      });
    } else {
      users = await UserRepo.users.findMany();
    }

    return users;
  }
}

export const Users = new UserService();
