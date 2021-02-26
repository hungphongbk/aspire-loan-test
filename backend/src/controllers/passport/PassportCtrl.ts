import { BodyParams, Controller, Post, Req } from "@tsed/common";
import { Authenticate } from "@tsed/passport";
import { User } from "../../entities/User";
import { Groups } from "@tsed/schema";

@Controller("/auth")
export class PassportCtrl {
  @Post("/login")
  @Authenticate("login", { failWithError: false })
  login(
    @Req("user") jwt: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @BodyParams() @Groups("credentials") credentials: User
  ): Record<string, string> {
    return {
      bearer_format: "Bearer",
      access_token: jwt
    };
  }
}
