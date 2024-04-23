import React from "react";

export interface TableColumnsInterface {
    key: React.Key;
    date_creation: string;
    education_type: "Квота" | "Контракт";
    educational_program: string;
    latin_name: string;
    russian_name: string;
    country: string;
    gender: "Мужской" | "Женский";
    contract_number: string;
    payment_status: "Оплачено" | "Оплачено частично" | "Не оплачено";
    enrollment_order: string;
    enrollment_status: "Зачислен" | "Отчислен" | "Не зачислен"
}