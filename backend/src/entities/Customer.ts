import { User } from "./User";
import { ChildEntity, OneToMany } from "typeorm";
import { Loan } from "./Loan";

@ChildEntity()
export class Customer extends User {
  @OneToMany(
    () => Loan,
    loan => loan.owner
  )
  loans: Loan[];
}
