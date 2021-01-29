import ReconciliationService from "@shared/services/ReconciliationService";
import BinoBankRepositoryType from "../models/BinoBankRepositoryType";
import ProviderRepositoryType from "@modules/providers/models/ProviderRepositoryType";
import * as AsyncLock from "async-lock";

export default class BinoBankReconciliationService{

    private reconcile: ReconciliationService;

    constructor() {
        this.reconcile = new ReconciliationService();
    }

    async execute(binoBank: BinoBankRepositoryType, providers: ProviderRepositoryType): Promise<number | void> {
        //Getting the async-lock library to let the concurrency safe
        const lock = new AsyncLock.default({timeout: 5000})
        
        //The lock will keep the concurrency safe
        return await lock.acquire('key', async () => {
            const newBalance = this.reconcile.execute(binoBank, providers);
            return newBalance
        })
        
    }
}