import SuperTest from "supertest";
import { PlatformTest } from "@tsed/common";
import { PassportCtrl } from "./PassportCtrl";
import { bootstrapServer } from "../../../test/helpers/bootstrapServer";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import formurlencoded from "form-urlencoded";

describe("PassportController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeAll(
    bootstrapServer({
      mount: {
        "/": [PassportCtrl]
      }
    })
  );
  beforeAll(done => {
    request = SuperTest(PlatformTest.callback());
    done();
  });
  afterAll(PlatformTest.reset);

  describe("POST /auth/login", () => {
    it("login successfully with default account", async () => {
      const response = await request
        .post("/auth/login")
        .send(formurlencoded({ email: "admin@aspire.test", password: "admin" }))
        .expect(200);
      expect(response.body).toHaveProperty("access_token");
    });
    it("login fail with wrong credential", async () => {
      await request
        .post("/auth/login")
        .send(
          formurlencoded({ email: "admin@aspire.test", password: "admin1" })
        )
        .expect(401);
    });
  });
});
