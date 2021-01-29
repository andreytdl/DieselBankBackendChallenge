import TransactionRequest from "../dtos/TransactionRequest";

//Interface for dependency injection
export default interface ProviderRepositoryType {
    getStatement(name: string): TransactionRequest[];
}