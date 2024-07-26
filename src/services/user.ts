import { UserDTO, User } from "@app/data/user";
import { config } from "dotenv";
import { UserRepo } from "@app/data/user/user.repo";

config();

class UserService {
  constructor() {}

  async createUser(user: UserDTO): Promise<User> {
    const createdUser = await UserRepo.users.create({
      data: {
        emailAddress: user.emailAddress,
        gender: user.gender,
        name: user.name,
        sleepTimeDuration: user.sleepTimeDuration,
      },
    });

    return createdUser;
  }

  async getUsers(): Promise<any> {
    const userGroups = await UserRepo.users.groupBy({
      by: ["emailAddress"],
      _count: {
        id: true,
      },
    });

    const userDetails = await Promise.all(
      userGroups.map(async (group) => {
        const user = await UserRepo.users.findFirst({
          where: { emailAddress: group.emailAddress },
          select: {
            name: true,
            emailAddress: true,
            gender: true,
          },
        });
        return {
          ...group,
          ...user,
        };
      })
    );
    return userDetails;
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
