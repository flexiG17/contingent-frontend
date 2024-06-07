import {PageInterface} from "./PageInterface";
import {StudentInterface} from "../student/StudentInterface";
import {PaginationInterface} from "./PaginationInterface";

export class Page<T> implements PageInterface<T> {
    readonly data: T[];

    readonly meta: PaginationInterface;

    constructor(data: T[], meta: PaginationInterface) {
        this.data = data;
        this.meta = meta;
    }
}