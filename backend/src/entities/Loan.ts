import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  term: number;

  @Column()
  status: "pending" | "approved" | "rejected";

  @ManyToOne(
    () => Customer,
    customer => customer.loans
  )
  owner: Customer;
}
