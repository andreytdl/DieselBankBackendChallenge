import BinoBankRepositoryType from "@modules/binoBank/models/BinoBankRepositoryType";
import ProviderRepositoryType from "@modules/providers/models/ProviderRepositoryType";
import { differenceInHours, parse, isEqual } from 'date-fns'
import CardVerifierService from "./CardVerifierService";

export default class ReconciliationService {

    private dateFormat: string = "yyyy-MM-dd HH:mm:ss"

    execute(binoBank: BinoBankRepositoryType, providers: ProviderRepositoryType): number {

        //Getting the provider's statements
        const provider1Statements = providers.getStatement('provider1')
        const provider2Statements = providers.getStatement('provider2')

        //To verify the credit card
        const cardVerifierService = new CardVerifierService();

        //Filtering provider1's 48 hours statements
        const provider1Acceptable = provider1Statements.filter(statement => {
            const statementDate = parse(statement.entryDate, this.dateFormat, 0);
            if (differenceInHours(new Date(), statementDate) <= 48) {
                return statement
            }
        })

        //Filtering provider2's 48 hours statements
        const provider2Acceptable = provider2Statements.filter(statement => {
            const statementDate = parse(statement.entryDate, this.dateFormat, 0);
            if (differenceInHours(new Date(), statementDate) <= 48) {
                return statement
            }
        })

        //Filtering also BinoBank's 48 hours statements
        const binoBankAcceptable = binoBank.getStatements().filter(statement => {
            if (differenceInHours(new Date(), statement.entryDate) <= 48) {
                return statement
            }
        })


        //Adding the new provider1's statements on BinoBank's statements
        const newProvider1Statements = provider1Acceptable.map(providerStatement => {
            //Selecting transactions that are inside Provider1 but aren't inside BinoBank
            const equals = binoBankAcceptable.filter(statement => {
                return isEqual(statement.entryDate, new Date(providerStatement.entryDate)) &&
                    statement.description === providerStatement.description &&
                    statement.amount === Number(providerStatement.amount) &&
                    statement.transactionType === providerStatement.transactionType &&
                    statement.type === providerStatement.type
            })

            //Case there is no one equal it means that the statement is new
            if (equals.length === 0) {
                return providerStatement
            }
        })

        //Adding the new transactions
        newProvider1Statements.map(newTransaction => {
            newTransaction ? cardVerifierService.execute(newTransaction): null
            newTransaction ? binoBank.addToBinoBank(newTransaction) : null
        })

        //Adding the new provider2's statements on BinoBank's statements
        const newProvider2Statements = provider2Acceptable.map(providerStatement => {
            //Selecting transactions that are inside Provider2 but aren't inside BinoBank
            const equals = binoBank.getStatements().filter(statement => {
                return isEqual(statement.entryDate, new Date(providerStatement.entryDate)) &&
                    statement.description === providerStatement.description &&
                    statement.amount === Number(providerStatement.amount) &&
                    statement.transactionType === providerStatement.transactionType &&
                    statement.type === providerStatement.type
            })

            //Case there is no one equal it means that the statement is new
            if (equals.length === 0) {
                return providerStatement
            }
        })

        //Adding the new transactions
        newProvider2Statements.map(newTransaction => {
            newTransaction ? cardVerifierService.execute(newTransaction): null
            newTransaction ? binoBank.addToBinoBank(newTransaction) : null
        })

        //Returning the new User's Balance
        const { balance } = binoBank.getUser().getBalance()

        return balance;
    }
}