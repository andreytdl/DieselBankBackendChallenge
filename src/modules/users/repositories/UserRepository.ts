import { Status, Transaction } from '@modules/transactions/models/Transaction';
import BinoBankRepositoryType from '@modules/binoBank/models/BinoBankRepositoryType';

export default class UserRepository {

    private balance: number = 0;

    //depencency injection
    constructor(binoBank: BinoBankRepositoryType) {
        const binoBankStatements = binoBank.getStatements()
        
        //Updating binoBank's transactions
        binoBankStatements.map(statement => {
            this.addNewTransaction(statement)
        })
    }

    public addNewTransaction(transaction: Transaction): void {
        
        //if it is an cash in operation
        if(transaction.status == Status.IN){
            this.balance += transaction.amount
        }

        //if it is an cash out operation
        else{
            this.balance -= transaction.amount
        }        
        
    }

    public getBalance(){
        return {
            balance: this.balance
        }
    }

}