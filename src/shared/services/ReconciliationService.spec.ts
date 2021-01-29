import FakeBinoBankRepository from "@modules/binoBank/repositories/fakes/FakeBinoBankRepository";
import FakeProviderRepository from "@modules/providers/repositories/fakes/FakeProviderRepository";
import ReconciliationService from "./ReconciliationService";
import { subHours, getDate } from 'date-fns'

describe('Reconciliate', () => {

    const acceptableDay = subHours(new Date(), 24).getDate()
    const acceptableHour = subHours(new Date(), 24).getHours()

    const notAcceptableDay = subHours(new Date(), 60).getDate()
    const notAcceptableHour = subHours(new Date(), 60).getHours()


    console.log('today: ', new Date())
    console.log('Day: ', notAcceptableDay)
    console.log('hour: ', notAcceptableHour)

    it('should be able to reconciliate only provider1', () => {
        //Creating the repositories
        const binoBank = new FakeBinoBankRepository()
        const providers = new FakeProviderRepository() 

        //Filling the provider's database with statements
        providers.addStatements("provider1", [
            {
                transactionId: "es$%r%$cc1#21ctv3",
                description: `CASH IN VIA PIX`,
                transactionType: "PIX",
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
                amount: "2000",
                type: "DEBIT"
            },
            {
                transactionId: "es$%r%$c4312321ctv3",
                description: `CASH IN VIA CARD`,
                transactionType: "CARD",
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
                amount: "2000",
                type: "DEBIT"
            },
            {
                transactionId: "es$%r%$cc1#21ctv3",
                description: `CASH OUT VIA PIX`,
                transactionType: "PIX",
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
                amount: "4000",
                type: "DEBIT"
            },
            {
                transactionId: "es$%r%$cc1#21ctv3",
                description: `CASH IN VIA PIX`,
                transactionType: "PIX",
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
                amount: "1000",
                type: "CREDIT"
            },
        ])

        const reconciliationService = new ReconciliationService();

        reconciliationService.execute(binoBank, providers)

        const { balance } = binoBank.getUser().getBalance()

        //expected balance
        expect(balance).toBe(1000);

    }),

    it('should be able to reconciliate only provider2', async () => {
        //Creating the repositories
        const binoBank = new FakeBinoBankRepository()
        const providers = new FakeProviderRepository() 

        //Filling the provider's database with statements
        providers.addStatements("provider2", [
            {
                transactionId: "es$%r%$cc1#21ctv3",
                description: `CASH IN VIA PIX`,
                transactionType: "PIX",
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
                amount: "2000",
                type: "DEBIT"
            },
            {
                transactionId: "es$%r%$c4312321ctv3",
                description: `CASH IN VIA CARD`,
                transactionType: "CARD",
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
                amount: "2000",
                type: "DEBIT"
            },
            {
                transactionId: "es$%r%$cc1#21ctv3",
                description: `CASH OUT VIA PIX`,
                transactionType: "PIX",
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
                amount: "4000",
                type: "DEBIT"
            },
            {
                transactionId: "es$%r%$cc1#21ctv3",
                description: `CASH IN VIA PIX`,
                transactionType: "PIX",
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
                amount: "1000",
                type: "CREDIT"
            },
        ])

        const reconciliationService = new ReconciliationService();

        reconciliationService.execute(binoBank, providers)

        const { balance } = binoBank.getUser().getBalance()

        //expected balance
        expect(balance).toBe(1000);

    }),
    it('should be able to reconciliate both providers', async () => {
        //Creating the repositories
        const binoBank = new FakeBinoBankRepository()
        const providers = new FakeProviderRepository() 

        //Filling the provider's database with statements
        providers.addStatements("provider1", [
            {
                transactionId: "es$%r%$cc1#21ctv3",
                description: `CASH IN VIA PIX`,
                transactionType: "PIX",
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
                amount: "2000",
                type: "DEBIT"
            },
            {
                transactionId: "es$%r%$c4312321ctv3",
                description: `CASH IN VIA CARD`,
                transactionType: "CARD",
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
                amount: "2000",
                type: "DEBIT"
            },
        ])

        //Filling the provider's database with statements
        providers.addStatements("provider2", [
            {
                transactionId: "es$%r%$123#21ctv3",
                description: `CASH OUT VIA PIX`,
                transactionType: "PIX",
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
                amount: "4000",
                type: "DEBIT"
            },
            {
                transactionId: "es$%r%$cc1#21ctv3",
                description: `CASH IN VIA PIX`,
                transactionType: "PIX",
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
                amount: "1000",
                type: "CREDIT"
            },
        ])

        const reconciliationService = new ReconciliationService();

        reconciliationService.execute(binoBank, providers)

        const { balance } = binoBank.getUser().getBalance()

        //expected balance
        expect(balance).toBe(1000);

    })
    it("should be able to reconciliate repeated items between providers", async () => {
        //Creating the repositories
        const binoBank = new FakeBinoBankRepository()
        const providers = new FakeProviderRepository() 

        //Filling the provider's database with statements
        providers.addStatements("provider1", [
            {
                transactionId: "es$%r%$cc1#21ctv3",
                description: `CASH IN VIA PIX`,
                transactionType: "PIX",
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
                amount: "2000",
                type: "DEBIT"
            },
            {
                transactionId: "es$%r%$c4312321ctv3",
                description: `CASH IN VIA CARD`,
                transactionType: "CARD",
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
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
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
                amount: "2000",
                type: "DEBIT"
            },
            {
                transactionId: "es$%1234312321ctv3",
                description: `CASH IN VIA CARD`,
                transactionType: "CARD",
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
                amount: "2000",
                type: "DEBIT"
            },
        ])

        const reconciliationService = new ReconciliationService();

        reconciliationService.execute(binoBank, providers)

        const { balance } = binoBank.getUser().getBalance()
        
        //expected balance
        expect(balance).toBe(4000);

    }),
    it("should be able to reconciliate repeated items between providers and BinoBank", async () => {
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
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
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
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
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
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
                amount: "2000",
                type: "DEBIT"
            },
            {
                transactionId: "es$%r%$c4312321ctv3",
                description: `CASH IN VIA CARD`,
                transactionType: "CARD",
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
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
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
                amount: "2000",
                type: "DEBIT"
            },
            {
                transactionId: "es$%1234312321ctv3",
                description: `CASH IN VIA CARD`,
                transactionType: "CARD",
                entryDate: `2021-01-${acceptableDay} ${acceptableHour}:20:15`,
                amount: "2000",
                type: "DEBIT"
            },
        ])

        const reconciliationService = new ReconciliationService();

        reconciliationService.execute(binoBank, providers)

        const { balance } = binoBank.getUser().getBalance()

        //expected balance
        expect(balance).toBe(4000);
    }),
    it("should not conciliate provider's old items", async () => {
        //I am using only 2 different statements. The balance have to be 4000
        
        //Creating the repositories
        const binoBank = new FakeBinoBankRepository()
        const providers = new FakeProviderRepository() 

        //Filling the BinoBank's database with a up to 48 hours statement
        binoBank.addToBinoBank(
            {
                transactionId: "es$%r%$cc1#21ctv3",
                description: `CASH IN VIA PIX`,
                transactionType: "PIX",
                entryDate: `2021-01-${notAcceptableDay} ${notAcceptableHour}:20:15`,
                amount: "2000",
                type: "DEBIT"
            }
        )

        //Filling the provider's database with a up to 48 hours statement
        providers.addStatements("provider1", [
            {
                transactionId: "es$%r%$cc1#21ctv3",
                description: `CASH IN VIA PIX`,
                transactionType: "PIX",
                entryDate: `2021-01-${notAcceptableDay} ${notAcceptableHour}:20:15`,
                amount: "2000",
                type: "DEBIT"
            },
            {
                transactionId: "es$%r%$c4312321ctv3",
                description: `CASH IN VIA CARD`,
                transactionType: "CARD",
                entryDate: `2021-01-${notAcceptableDay} ${notAcceptableHour}:20:15`,
                amount: "2000",
                type: "DEBIT"
            },
        ])

        //Filling the provider's database with a up to 48 hours statement
        providers.addStatements("provider2", [
            {
                transactionId: "es$%r%asc1#21ctv3",
                description: `CASH IN VIA PIX`,
                transactionType: "PIX",
                entryDate: `2021-01-${notAcceptableDay} ${notAcceptableHour}:20:15`,
                amount: "2000",
                type: "DEBIT"
            },
            {
                transactionId: "es$%1234312321ctv3",
                description: `CASH IN VIA CARD`,
                transactionType: "CARD",
                entryDate: `2021-01-${notAcceptableDay} ${notAcceptableHour}:20:15`,
                amount: "2000",
                type: "DEBIT"
            },
        ])

        const reconciliationService = new ReconciliationService();

        reconciliationService.execute(binoBank, providers)

        const { balance } = binoBank.getUser().getBalance()

        //expected balance
        expect(balance).toBe(2000);
    })
    
})