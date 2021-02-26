import { EntityRepository, Repository } from "typeorm";
import { Loan } from "../entities/Loan";

@EntityRepository(Loan)
export class LoanRepository extends Repository<Loan> {}
