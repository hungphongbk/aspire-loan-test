import { Controller, Post, Req } from "@tsed/common";
import { Authenticate } from "@tsed/passport";

@Controller("/auth")
export class PassportCtrl {
  @Post("/login")
  @Authenticate("login", { failWithError: false })
  login(@Req() req: Req) {
    // FACADE
    return req.user;
  }
}
