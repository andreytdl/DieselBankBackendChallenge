import TransactionRequest from '@modules/providers/dtos/TransactionRequest';
import { Transaction } from '@modules/transactions/models/Transaction';
import { StatusParser } from '@modules/transactions/utils/StatusParser';
import { TransactionTypeParser } from '@modules/transactions/utils/TransactionTypeParser';
import { TypeParser } from '@modules/transactions/utils/TypeParser';
import UserRepository from '@modules/users/repositories/UserRepository';
import { v4 } from 'uuid';

export default class BinoBankRepository {

    private statusParser: StatusParser;
    private transactionTypeParser: TransactionTypeParser;
    private typeParser: TypeParser;
    private User: UserRepository;

    constructor() {
        this.statusParser = new StatusParser();
        this.transactionTypeParser = new TransactionTypeParser();
        this.typeParser = new TypeParser();
        this.User = new UserRepository(this);
    }

    private binoBankStatement: Transaction[] = [];

    public addToBinoBank(transaction: TransactionRequest): void {

        const newTransaction = {
            transactionId: v4(),
            amount: Number(transaction.amount),
            entryDate: new Date(transaction.entryDate),
            type: this.typeParser.execute(transaction.type),
            transactionType: this.transactionTypeParser.execute(transaction.transactionType),
            description: transaction.description,
            status: this.statusParser.execute(transaction.description.split(' ')[1]),
        }

        this.binoBankStatement.push(newTransaction);

        this.User.addNewTransaction(newTransaction);
    }

    public getStatements(): Transaction[] {
        return this.binoBankStatement
    }

    public getUser(): UserRepository {
        return this.User
    }
}