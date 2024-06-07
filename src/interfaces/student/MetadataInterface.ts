import {UserInterface} from "../UserInterface";

export interface MetadataInterface {
    id?: string,
    is_archived?: false,
    comments?: string,
    created_at?: Date,
    updated_at?: Date,
    created_by_id?: string,
    student_id?: string,
    user?: UserInterface
}