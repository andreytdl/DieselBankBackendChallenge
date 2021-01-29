import FakeBinoBankRepository from "@modules/binoBank/repositories/fakes/FakeBinoBankRepository";
import { StatusParser } from "@modules/transactions/utils/StatusParser";
import { TransactionTypeParser } from "@modules/transactions/utils/TransactionTypeParser";
import { TypeParser } from "@modules/transactions/utils/TypeParser";
import UserRepository from "./UserRepository";

describe("User's Repository", () => {
    it("should be able to get balance", () => {
        //Creating the repositories
        const binoBank = new FakeBinoBankRepository()
        const userRepository = new UserRepository(binoBank)
        
        const balance = userRepository.getBalance()

        //expected balance
        expect(balance).toHaveProperty('balance');

    }),
    it("should be able to add a new cash-in Transaction", async () => {
        //Creating the parsers
        const statusParser = new StatusParser();
        const transactionTypeParser = new TransactionTypeParser();
        const typeParser = new TypeParser();

        //Creating the repositories
        const binoBank = new FakeBinoBankRepository()
        const userRepository = new UserRepository(binoBank)

        //Creating the transaction
        const transaction = {
            transactionId: "es$%r%$cc1#21ctv3",
            description: `CASH IN VIA PIX`,
            transactionType: "PIX",
            entryDate: "2021-01-27 05:20:15",
            amount: "2000",
            type: "DEBIT"
        }

        //Formatting the transaction as a BinoBank transaction
        const newTransaction = {
            transactionId: 'asdyu2123vu12@$#',
            amount: Number(transaction.amount),
            entryDate: new Date(transaction.entryDate),
            type: typeParser.execute(transaction.type),
            transactionType: transactionTypeParser.execute(transaction.transactionType),
            description: transaction.description,
            status: statusParser.execute(transaction.description.split(' ')[1]),
        }
        
        //Adding the new transaction to the user
        userRepository.addNewTransaction(newTransaction)

        const userBalance = userRepository.getBalance().balance

        //Expected balance
        expect(userBalance).toBe(2000);

    })
    it("should be able to add a new cash-out Transaction", async () => {
        //Creating the parsers
        const statusParser = new StatusParser();
        const transactionTypeParser = new TransactionTypeParser();
        const typeParser = new TypeParser();

        //Creating the repositories
        const binoBank = new FakeBinoBankRepository()
        const userRepository = new UserRepository(binoBank)

        //Creating the transaction
        const transaction = {
            transactionId: "es$%r%$cc1#21ctv3",
            description: `CASH OUT VIA PIX`,
            transactionType: "PIX",
            entryDate: "2021-01-27 05:20:15",
            amount: "2000",
            type: "DEBIT"
        }

        //Formatting the transaction as a BinoBank transaction
        const newTransaction = {
            transactionId: 'asdyu2123vu12@$#',
            amount: Number(transaction.amount),
            entryDate: new Date(transaction.entryDate),
            type: typeParser.execute(transaction.type),
            transactionType: transactionTypeParser.execute(transaction.transactionType),
            description: transaction.description,
            status: statusParser.execute(transaction.description.split(' ')[1]),
        }
        
        //Adding the new transaction to the user
        userRepository.addNewTransaction(newTransaction)

        const userBalance = userRepository.getBalance().balance

        //Expected balance
        expect(userBalance).toBe(-2000);

    })
})