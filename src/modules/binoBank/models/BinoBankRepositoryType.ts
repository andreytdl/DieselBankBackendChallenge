import TransactionRequest from "@modules/providers/dtos/TransactionRequest";
import { Transaction } from "@modules/transactions/models/Transaction";
import UserRepository from "@modules/users/repositories/UserRepository";

//Interface for dependency injection
export default interface BinoBankRepositoryType{
    getStatements(): Transaction[];
    addToBinoBank(transaction: TransactionRequest): void;
    getUser(): UserRepository;
}