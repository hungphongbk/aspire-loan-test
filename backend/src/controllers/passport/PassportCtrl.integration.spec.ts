import SuperTest from "supertest";
import { PlatformTest } from "@tsed/common";
import { PassportCtrl } from "./PassportCtrl";
import { bootstrapServer } from "../../../test/helpers/bootstrapServer";
import { UserRepository } from "../../repositories/UserRepository";
import { User } from "../../entities/User";

describe("PassportController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeAll(
    bootstrapServer({
      mount: {
        "/": [PassportCtrl]
      }
    })
  );
  beforeAll(async done => {
    request = SuperTest(PlatformTest.callback());

    // create initial user
    const usersRepository = PlatformTest.get<UserRepository>(UserRepository);
    const user = new User();
    user.id = 1;
    user.password = "test";
    user.email = "admin@aspire.test";
    user.firstName = "John";
    user.lastName = "Doe";
    user.age = 18;

    await usersRepository.save(user);

    done();
  });
  afterAll(PlatformTest.reset);

  it("login successfully with default account", async () => {
    const response = await request
      .post("/login")
      .send({ email: "admin@aspire.test", password: "admin" })
      .expect(200);
    console.log(response.body);
  });
});
