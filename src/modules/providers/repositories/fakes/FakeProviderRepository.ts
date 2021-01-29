import TransactionRequest from "@modules/providers/dtos/TransactionRequest";
import ProviderRepositoryType from "@modules/providers/models/ProviderRepositoryType";
import AppError from "@shared/errors/Error";

export default class ProviderRepository implements ProviderRepositoryType {

    private provider1Statement: TransactionRequest[] = [];
    private provider2Statement: TransactionRequest[] = [];

    public addStatements(name: string, transaction: TransactionRequest[]): void{
        switch(name){
            case "provider1": {
                this.provider1Statement.push(...transaction)
                return
            }

            case "provider2": {
                this.provider2Statement.push(...transaction)
                return
            }

            //Case is a unknown provider
            default: {
                throw new AppError(`Unexpected provider ${name}`, 404)
            }
        }
    }

    public getStatement(name: string): TransactionRequest[]{

        switch(name){
            case 'provider1': {
                return this.provider1Statement
            }

            case 'provider2': {
                return this.provider2Statement
            }

            //Case is a unknown provider
            default: {
                throw new AppError(`Unexpected provider ${name}`, 404)
            }
        }

    }
}