import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Customer,
    customer => customer.loans
  )
  owner: Customer;
}
