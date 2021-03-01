## Interview Test

### Stacks

#### Frontend

- [Quasar@2](https://quasar.dev/)
- Vue
- Vue Ecosystem: vue-router, Vuex, [vue-test-utils](https://vue-test-utils.vuejs.org/)
- [jest](https://jestjs.io/en/)

#### Backend

- [TsED](https://tsed.io/)
- TypeORM
- Postgres
- Docker

### Requirements

- Node >= 10.12.0
- Yarn >= 1.22.0
- Docker

### Install

1. Clone

```
$ git clone <link_repo>
```

2. Run frontend & backend in dev mode

> Make sure **Docker-composer** has been installed

```
$ cd <path_to_project>/frontend
$ yarn install
$ yarn run dev
```
```
$ cd <path_to_project>/backend
$ yarn install
$ docker-compose up --build
```

3. Build production code and run

   > Make sure **Docker-composer** has been installed

```
$ cd <path_to_project>
$ docker-compose up --build
```

4. Run test

```
$ cd <path_to_project>/frontend
$ yarn run test:unit
$ cd ../backend
$ yarn run test:unit
```

### Description

1. Challenge 1

```
Postgres Admin URL: http://localhost:5050 (login acc has been specified in docker-compose.yml)
Data Storage: Postgres
Loan page: /loans
Admin page: /admin/loans
  Default admin acc: admin@aspire.test / admin
```

2. Challenge 2

```
Route: /debit-card
```
