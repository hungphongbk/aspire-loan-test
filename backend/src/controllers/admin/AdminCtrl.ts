import { Controller, Get, Post, Req } from "@tsed/common";
import { Authorize } from "@tsed/passport";
import { AcceptRoles } from "../../decorators/AcceptRoles";
import { Customer } from "../../entities/Customer";
import { Inject } from "@tsed/di";
import { CustomerRepository } from "../../repositories/CustomerRepository";

@Controller("/admin")
export class AdminCtrl {
  @Inject()
  private customerRepo: CustomerRepository;

  @Get("/customers")
  @Authorize("jwt")
  @AcceptRoles("User")
  getAllCustomers(@Req() req: Req): Promise<Customer[]> {
    return this.customerRepo.find({ creatorId: req.user.id });
  }

  @Post("/customers")
  @Authorize("jwt")
  @AcceptRoles("User")
  createNewCustomer(@Req() req: Req): Promise<Customer> {
    const customer = new Customer();
    Object.assign(customer, req.body);
    customer.creator = req.user;
    return this.customerRepo.save(customer);
  }
}
