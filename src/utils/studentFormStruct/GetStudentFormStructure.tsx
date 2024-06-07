import GetLeftSideFields from "./GetLeftSideFields";
import GetRightSideFields from "./GetRightSideFields";

export const GetStudentFormStructure = () => {
    return (
        {
            leftSideFields: GetLeftSideFields,
            rightSideFields: GetRightSideFields,
        }
    )
}