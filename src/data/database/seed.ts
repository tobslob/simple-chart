import { faker } from "@faker-js/faker";
import { PrismaClient, Users } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await Promise.all(
      Array.from({ length: 1000 }, async () => {
        const time = faker.number.int({ min: 1, max: 8 });
        const email = "kazeem.o.odutola@gmail.com";
        const name = "Kazeem Odutola";
        const date = faker.date.between({ from: "2024-07-01", to: new Date() });
        const startOfDay = moment(date).startOf("day").toDate();
        const endOfDay = moment(date).endOf("day").toDate();

        let user: Users;
        let retries = 3;
        while (retries > 0) {
          try {
            user = await prisma.$transaction(async (tx) => {
              const existingUser = await tx.users.findFirst({
                where: {
                  emailAddress: email,
                  date: {
                    gte: startOfDay,
                    lt: endOfDay,
                  },
                },
              });

              if (existingUser) {
                const newSleepTime = existingUser.sleepTimeDuration + time;
                if (newSleepTime > 24) {
                  throw new Error(
                    "sleepTimeDuration cannot be greater than 24 hours."
                  );
                }

                return await tx.users.update({
                  where: {
                    id: existingUser.id,
                  },
                  data: {
                    count: existingUser.count + 1,
                    sleepTimeDuration: newSleepTime,
                  },
                });
              } else {
                return await tx.users.create({
                  data: {
                    emailAddress: email,
                    name,
                    gender: faker.helpers.arrayElement(["male", "female"]),
                    sleepTimeDuration: time,
                    date: startOfDay,
                  },
                });
              }
            });

            break;
          } catch (err) {
            if (--retries <= 0) throw err;
            console.log("Retrying due to concurrency conflict...");
          }
        }

        return user;
      })
    );

    console.log(users);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
