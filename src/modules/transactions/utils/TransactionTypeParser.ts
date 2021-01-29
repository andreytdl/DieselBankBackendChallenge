import AppError from "@shared/errors/Error";
import { TransactionType } from "../models/Transaction";

export class TransactionTypeParser {

    execute(transactionType: string): TransactionType {
        switch (transactionType) {
            case 'PIX':
                return TransactionType.PIX
            case 'CARD':
                return TransactionType.CARD
            default:
                throw new AppError(`Unexpected transaction code ${transactionType}`, 400);
        }
    }
}