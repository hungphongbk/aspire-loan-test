import { BodyParams, Controller, Get, Post, Req } from "@tsed/common";
import { Authorize } from "@tsed/passport";
import { Inject } from "@tsed/di";
import { LoanRepository } from "../../repositories/LoanRepository";
import { Loan } from "../../entities/Loan";
import { AcceptRoles } from "../../decorators/AcceptRoles";
import { Customer } from "../../entities/Customer";
import { PaymentRepository } from "../../repositories/PaymentRepository";

@Controller("/loan")
export class LoanCtrl {
  @Inject()
  private repo: LoanRepository;

  @Inject()
  private paymentRepo: PaymentRepository;

  @Get("/")
  @Authorize("jwt")
  @AcceptRoles("Customer")
  getAll(@Req() req: Req): Loan[] {
    const loans = (req.user as Customer).loans;
    return loans || [];
  }

  @Post("/submit")
  @Authorize("jwt")
  @AcceptRoles("Customer")
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
