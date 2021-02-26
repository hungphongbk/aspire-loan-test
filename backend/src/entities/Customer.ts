import { User } from "./User";
import { ChildEntity, OneToMany } from "typeorm";
import { Loan } from "./Loan";

@ChildEntity("Customer")
export class Customer extends User {
  @OneToMany(
    () => Loan,
    loan => loan.owner,
    { eager: true }
  )
  loans: Loan[];
}
