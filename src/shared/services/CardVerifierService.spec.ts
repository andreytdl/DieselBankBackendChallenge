import AppError from "@shared/errors/Error";
import CardVerifierService from "./CardVerifierService"

describe('Card Verifier', () => {
    it('should not be able to pay with credit card', () => {
        
        const cardVerifier = new CardVerifierService();

        expect(cardVerifier.execute({
            transactionId: "es$%r%$cc1#21ctv3",
            description: `CASH IN VIA CARD`,
            transactionType: "CARD",
            entryDate: "2021-01-27 05:20:15",
            amount: "2000",
            type: "CREDIT"
        })).rejects.toBeInstanceOf(AppError);

    })
    
})