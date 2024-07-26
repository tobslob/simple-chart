FROM node:14 as Base

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --ignore-engines

COPY . ./

RUN npx prisma
RUN npx prisma generate  
RUN npx prisma migrate dev --name init

RUN yarn build

FROM node:14

WORKDIR /app

COPY --from=Base /app .

EXPOSE 8080:8080

# Sets the command and parameters that will be executed first when a container is ran.
CMD ["yarn", "start"]