import { Status } from "@modules/transactions/models/Transaction";
import AppError from "@shared/errors/Error";

export class StatusParser {

    execute(status: string): Status {
        switch (status) {
            case 'IN':
                return Status.IN
            case 'OUT':
                return Status.OUT
            default:
                throw new AppError(`Unexpected status code ${status}`, 400);
        }
    }
}