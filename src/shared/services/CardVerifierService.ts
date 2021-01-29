import TransactionRequest from "@modules/providers/dtos/TransactionRequest"
import AppError from "@shared/errors/Error"

export default class CardVerifierService {

    public async execute(transaction: TransactionRequest) {

        if(transaction.transactionType == 'CARD'&&
            transaction.type == 'CREDIT'){
            throw new AppError("You can't use a credit card!")
        }
    }
}