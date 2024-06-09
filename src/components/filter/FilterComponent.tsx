import React, {useEffect, useState} from "react";
import FilterBody from "./filterBody/FilterBody";
import {StudentInterface} from "../../interfaces/student/StudentInterface";
import {PageInterface} from "../../interfaces/table/PageInterface";
import SetStudentDataProps from "../../pages/main/SetStudentDataInterface";

const FilterComponent = () => {
    const [filters, setFilters] = useState([]);
    /*const multiFilter = (item: any) => {
        for (let i = 0; i < filters.length; i++) {
            let filter: any = filters[i];
            if (item[filter.param.value] === undefined) return false;
            switch (filter.operator) {
                case "coincidence":
                    if (
                        !String(item[filter.param.value])
                            .toLowerCase()
                            .includes(filter.value.toLowerCase())
                    )
                        return false;
                    break;
                case "equals":
                    const tmp1 = new Date(item[filter.param.value]).setHours(0, 0, 0);
                    const tmp2 = new Date(filter.value).setHours(0, 0, 0);

                    if (filter.param.type === 'date' && tmp1 !== tmp2) {
                        return false;
                    } else if (item[filter.param.value] === null)
                        return false
                    else if (filter.param.type !== 'date' && item[filter.param.value].toLowerCase() !== filter.value.toLowerCase())
                        return (item[filter.param.value] === filter.value);
                    break;
                case "more":
                    const studentDate = new Date(item[filter.param.value]).setHours(0, 0, 0);
                    const actualDate = new Date(filter.value).setHours(0, 0, 0);

                    if (filter.param.type === 'date' && studentDate <= actualDate) {
                        return false;
                    } else if (item[filter.param.value] <= Number(filter.value)) {
                        return false;
                    }
                    break;
                case "less":
                    const lessStudentDate = new Date(item[filter.param.value]).setHours(0, 0, 0);
                    const lessActualDate = new Date(filter.value).setHours(0, 0, 0);

                    if (filter.param.type === 'date' && lessStudentDate >= lessActualDate) {
                        return false;
                    } else if (item[filter.param.value] >= Number(filter.value)) {
                        return false;
                    }
                    break;
                case "moreE":
                    const studentDate1 = new Date(item[filter.param.value]).setHours(0, 0, 0);
                    const actualDate1 = new Date(filter.value).setHours(0, 0, 0);

                    if (filter.param.type === 'date' && studentDate1 < actualDate1) {
                        return false;
                    } else if (item[filter.param.value] < Number(filter.value)) {
                        return false;
                    }
                    break;
                case "lessE":
                    const studentDate2 = new Date(item[filter.param.value]).setHours(0, 0, 0);
                    const actualDate2 = new Date(filter.value).setHours(0, 0, 0);

                    if (filter.param.type === 'date' && studentDate2 > actualDate2) {
                        return false;
                    } else if (item[filter.param.value] > Number(filter.value)) {
                        return false;
                    }
                    break;
                case "range":
                    const valueToFilter = new Date(item[filter.param.value]).setHours(0, 0, 0);
                    const startDate = new Date(filter.value[0]).setHours(0, 0, 0);
                    const endDate = new Date(filter.value[1]).setHours(0, 0, 0);

                    if (filter.param.type === 'date' && !(valueToFilter >= startDate && valueToFilter <= endDate)) {
                        return false;
                    }
                    break;
                default:
                    return false;
            }
        }
        return true;
    };

    useEffect(() => {
        setData(data.filter(row => {
            return multiFilter(row);
        }))
    }, [filters])*/

    return (
        <FilterBody filters={filters} setFilters={setFilters}/>
    )
}

export default FilterComponent