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

    const date = new Date();
    const startOfDay = moment(date).startOf("day").toDate();
    const endOfDay = moment(date).endOf("day").toDate();

    const existingUser = await UserRepo.users.findFirst({
      where: {
        emailAddress: data.emailAddress,
        createdAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
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
          createdAt: new Date(),
        },
      });
    }

    return user;
  }

  async getUsers(): Promise<any> {
    return await UserRepo.users.findMany();
  }

  async getUserByEmail(emailAddress: string): Promise<User[]> {
    const user = await UserRepo.users.findMany({
      where: {
        emailAddress,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    });

    return user;
  }
}

export const Users = new UserService();
