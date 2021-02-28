import { EntityRepository, Repository } from "typeorm";
import { Customer } from "../entities/Customer";

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {}
