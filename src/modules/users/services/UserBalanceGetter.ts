import UserRepository from "../repositories/UserRepository";

export default class UserBalanceGetter{

    private balance: number;

    execute(user: UserRepository): number {
        
        //Only one user's balance
        this.balance = user.getBalance().balance
        return this.balance
        
    }
}