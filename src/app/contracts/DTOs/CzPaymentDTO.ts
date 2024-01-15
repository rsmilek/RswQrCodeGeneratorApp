export interface CzPaymentDTO {
    prefix: string;
    account: string;
    bank: string;
    amount: string ;
    variableSymbol: string;
    specificSymbol: string;
    constantSymbol: string;
    message: string;
}