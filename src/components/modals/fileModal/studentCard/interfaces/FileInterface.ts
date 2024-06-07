import {FilesSectionsEnum} from "../../enums/FilesSectionsEnum";
import {UserInterface} from "../../../../../interfaces/UserInterface";

export interface FileInterface extends File {
    id: string,
    created_by_id: string,
    section: FilesSectionsEnum,
    user: UserInterface,
    created_at: Date,
    updated_at: Date,
}