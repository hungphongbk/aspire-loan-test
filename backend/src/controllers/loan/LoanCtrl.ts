import { BodyParams, Controller, Post, Req } from "@tsed/common";
import { Authorize } from "@tsed/passport";
import { Inject } from "@tsed/di";
import { LoanRepository } from "../../repositories/LoanRepository";
import { Loan } from "../../entities/Loan";

@Controller("/loan")
export class LoanCtrl {
  @Inject()
  private repo: LoanRepository;

  @Post("/submit")
  @Authorize("jwt")
  submitLoan(
    @Req() req: Req,
    @BodyParams("term") term: number,
    @BodyParams("amount") amount: number
  ): Promise<Loan> {
    return this.repo.save({
      term,
      amount,
      owner: req.user,
      status: "pending"
    });
  }
}
