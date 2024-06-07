import {StudentPaymentInterface} from "./StudentPaymentInterface";

export interface PaymentInterface {
    id?: string;
    contract_amount?: number;
    payment_status?: string;
    student_payments?: StudentPaymentInterface;
}