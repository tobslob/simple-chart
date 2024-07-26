[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

![ts](https://flat.badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)

![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

<div id="top"></div>

<!--
*** Inspired by the Best-README-Template.
*** Let's create something AMAZING! :D

*** GitLab Flavored Markdown - https://gitlab.com/gitlab-org/gitlab/-/blob/master/doc/user/markdown.md
-->

<div align="center">
  <h1>Simple Chart</h1>
</div>

# Running locally

To start the application in dev mode, please run:

```sh
git clone https://github.com/tobslob/simple-chart.git
```

```sh
cd simpleChart
```

```sh
 yarn install
```

```sh
 add `.env` to root folder, copy the .env.example
```

## Running using postgres on docker

Install PostgreSQL on local machine using the following command:

```sh
docker pull postgres

## run the postgres image

# ensure you have docker installed and running

docker run -d --name dev-postgres \
 --restart=always \
 -e POSTGRES_PASSWORD=secret123 \
 -e POSTGRES_USER=postgres \
 -e POSTGRES_DB=simple-chart \
 -p 5432:5432 postgres
## check that the container is running
docker ps

```

```sh
 yarn start:dev
```


Application is ready to receive connection @ http://localhost:8080

## API-ENDPOINTS

# USER ENTRIES

`- POST /api/v1/users Create user entry`

```sh
curl -X POST -H "Content-Type: application/json" \
-d '{
  "emailAddress": "kazeem.o.odutola@gmail.com",
  "name": "Kazeem Odutola",
  "gender": "male",
  "sleepTimeDuration": 2
}' http://localhost:8080/api/v1/users
```

`- GET /api/v1/users Get a user entry`

```sh
curl -X GET "http://localhost:8080/api/v1/users?emailAddress=kazeem.o.odutola@gmail.com"
```

`- GET /api/v1/users Get users entry count`

```sh
curl -X GET "http://localhost:8080/api/v1/users"
```
