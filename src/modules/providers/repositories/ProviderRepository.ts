import AppError from "@shared/errors/Error";
import TransactionRequest from "../dtos/TransactionRequest";
import ProviderRepositoryType from "../models/ProviderRepositoryType";

export default class ProviderRepository implements ProviderRepositoryType {

    private provider1Statement: TransactionRequest[] = [];
    private provider2Statement: TransactionRequest[] = [];

    constructor(){
        //Static Transactions database
        //Filling the provider's database with statements
        this.provider1Statement = [
            {
                transactionId: "es$%r%$cc1#21ctv3",
                description: `CASH IN VIA PIX`,
                transactionType: "PIX",
                entryDate: "2021-01-27 05:20:15",
                amount: "2000",
                type: "DEBIT"
            },
            {
                transactionId: "es$%r%$c4312321ctv3",
                description: `CASH IN VIA CARD`,
                transactionType: "CARD",
                entryDate: "2021-01-27 05:20:15",
                amount: "2000",
                type: "DEBIT"
            },
        ]

        //Filling the provider's database with statements
        this.provider2Statement = [
            {
                transactionId: "es$%r%$123#21ctv3",
                description: `CASH OUT VIA PIX`,
                transactionType: "PIX",
                entryDate: "2021-01-27 05:20:15",
                amount: "4000",
                type: "DEBIT"
            },
            {
                transactionId: "es$%r%$cc1#21ctv3",
                description: `CASH IN VIA PIX`,
                transactionType: "PIX",
                entryDate: "2021-01-27 05:20:15",
                amount: "1000",
                type: "CREDIT"
            },
        ]
    }

    public getStatement(name: string): TransactionRequest[]{
        switch(name){
            case "provider1": {
                return this.provider1Statement
            }

            case "provider2": {
                return this.provider2Statement
            }

            //Case is a unknown provider
            default: {
                throw new AppError(`Unexpected provider ${name}`, 404)
            }
        }

    }
}