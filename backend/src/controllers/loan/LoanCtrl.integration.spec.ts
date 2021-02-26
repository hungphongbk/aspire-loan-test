import SuperTest from "supertest";
import { bootstrapServer } from "../../../test/helpers/bootstrapServer";
import { PlatformTest } from "@tsed/common";
import { LoanCtrl } from "./LoanCtrl";
import { PassportCtrl } from "../passport/PassportCtrl";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import formurlencoded from "form-urlencoded";
import { UserRepository } from "../../repositories/UserRepository";
import { User } from "../../entities/User";
import { Customer } from "../../entities/Customer";
import { CustomerRepository } from "../../repositories/CustomerRepository";

describe("LoanController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeAll(
    bootstrapServer({
      mount: {
        "/": [PassportCtrl, LoanCtrl]
      }
    })
  );
  beforeAll(done => {
    request = SuperTest(PlatformTest.callback());
    done();
  });
  afterAll(PlatformTest.reset);

  describe("POST /loan/submit", () => {
    const adminLoginInfo = {
      headers: {
        Authorization: ""
      },
      body: formurlencoded({ email: "admin@aspire.test", password: "admin" })
    };
    let clientJwt = "";

    beforeAll(async () => {
      // fetch admin jwt
      const response = await request
        .post("/auth/login")
        .send(adminLoginInfo.body);
      adminLoginInfo.headers.Authorization = `Bearer ${response.body.access_token}`;

      // create customer
      const customerRepo = PlatformTest.get<CustomerRepository>(
        CustomerRepository
      );
      const user = new Customer();
      user.password = "client";
      user.email = "client@aspire.test";
      user.firstName = "John";
      user.lastName = "Doe";
      user.age = 18;

      await customerRepo.save(user);
      // console.log(
      //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   // @ts-ignore
      //   (await customerRepo.findOne({ email: "client@aspire.test" })).type
      // );
    });
    it("fail with admin role: Insufficient role", async () => {
      await request
        .post("/loan/submit")
        .set("Authorization", adminLoginInfo.headers.Authorization)
        .send(formurlencoded({ term: 1, amount: 1 }))
        .expect(401);
    });
  });
});
