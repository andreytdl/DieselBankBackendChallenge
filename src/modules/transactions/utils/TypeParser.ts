import AppError from "@shared/errors/Error";
import { PaymentType } from "../models/Transaction";

export class TypeParser {

    execute(type: string): PaymentType{
        switch (type) {
            case 'CREDIT':
                return PaymentType.CREDIT
            case 'DEBIT':
                return PaymentType.DEBIT
            default:
                throw new AppError(`Unexpected payment type code ${type}`, 400);
        }
    }
}