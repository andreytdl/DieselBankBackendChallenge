import FakeBinoBankRepository from "@modules/binoBank/repositories/fakes/FakeBinoBankRepository";
import FakeProviderRepository from "@modules/providers/repositories/fakes/FakeProviderRepository";
import BinoBankReconciliationService from "./BinoBankReconciliationService";

describe('BinoBank Reconciliation', () => {
    it('should be able to reconciliate', () => {
        //I am using only 2 different statements. The balance have to be 4000
        
        //Creating the repositories
        const binoBank = new FakeBinoBankRepository()
        const providers = new FakeProviderRepository() 

        //Filling the BinoBank's database with statements
        binoBank.addToBinoBank(
            {
                transactionId: "es$%r%$cc1#21ctv3",
                description: `CASH IN VIA PIX`,
                transactionType: "PIX",
                entryDate: "2021-01-27 05:20:15",
                amount: "2000",
                type: "DEBIT"
            }
        )

        //Filling the BinoBank's database with statements
        binoBank.addToBinoBank(
            {
                transactionId: "es$%r%$c4312321ctv3",
                description: `CASH IN VIA CARD`,
                transactionType: "CARD",
                entryDate: "2021-01-27 05:20:15",
                amount: "2000",
                type: "DEBIT"
            },
        )

        //Filling the provider's database with statements
        providers.addStatements("provider1", [
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
        ])

        //Filling the provider's database with statements
        providers.addStatements("provider2", [
            {
                transactionId: "es$%r%asc1#21ctv3",
                description: `CASH IN VIA PIX`,
                transactionType: "PIX",
                entryDate: "2021-01-27 05:20:15",
                amount: "2000",
                type: "DEBIT"
            },
            {
                transactionId: "es$%1234312321ctv3",
                description: `CASH IN VIA CARD`,
                transactionType: "CARD",
                entryDate: "2021-01-27 05:20:15",
                amount: "2000",
                type: "DEBIT"
            },
        ])

        const binoBankReconciliationService = new BinoBankReconciliationService();

        binoBankReconciliationService.execute(binoBank, providers)

        const balance = binoBank.getUser().getBalance().balance

        //expected balance
        expect(balance).toBe(4000);
    })
})