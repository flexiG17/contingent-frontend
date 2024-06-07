import {PaginationInterface} from "./PaginationInterface";

export interface PageInterface<T> {
    readonly data: T[];
    readonly meta: PaginationInterface;
}