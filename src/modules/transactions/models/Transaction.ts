export enum PaymentType {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT',
}

export enum TransactionType {
    PIX = 'PIX',
    CARD = 'CARD',
    BOLETO = 'BOLETO',
    BILL = 'BILL',
    TED = 'TED'
}

export enum Status{
    IN = 'IN',
    OUT = 'OUT'
}

export interface Transaction{
    transactionId: string;
    description: string;
    transactionType: string;
    entryDate: Date;
    amount: number;
    type: string;
    status: Status;
}