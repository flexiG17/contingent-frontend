import React, {useState} from "react";
import {MenuItem} from "@mui/material";
import {Answers} from "../../../utils/const";
import {IconDelete} from "../../../assets/Icons";
import styles from '../filterBody/filterBody.module.scss'

const FilterField = ({item, columns, setFilterArr, changeFilterProp}: any) => {
    const operators = [
        {value: 'coincidence', label: 'Содержит'},
        {value: 'equals', label: 'Равно'},
        {value: 'more', label: 'Больше'},
        {value: 'less', label: 'Меньше'},
        {value: 'moreE', label: 'Больше или равно'},
        {value: 'lessE', label: 'Меньше или равно'},
        {value: 'range', label: 'Диапазон'}
    ];

    const [inputType, setInputType] = useState(item.param.type);

    const [dateRange, setDateRange] = useState(
        [
            typeof (item.value) === 'string' ? null : item.value[0],
            typeof (item.value) === 'string' ? null : item.value[1]]
    );
    const [startDate, endDate] = dateRange;
    const [startDateSingleRange, setStartDateSingleRange] = useState(isNaN(new Date(item.value).getDate()) ? null : item.value);

    return (
        <MenuItem>
            <div className={styles.filter_container}>
                <select name="" id="" className={`${styles.first_parameter} ${styles.search_filter}`}
                        value={item.param.value}
                        onChange={(e) => {
                            window.scrollTo(0, 0);
                            let tmp = columns.filter((item: any) => e.target.value === item.value);
                            setInputType(tmp[0].type);
                            changeFilterProp(item.id, tmp[0], 'param');
                        }}>
                    <option hidden>Выберите поле</option>
                    {
                        columns
                            .filter((item: any) => item.value !== 'id')
                            .map((item: any) => {
                                return <option value={item.value} key={item.value}>{item.label}</option>
                            })
                    }
                </select>

                <select name="" id="" className={`${styles.second_parameter} ${styles.search_filter}`}
                        value={item.operator}
                        onChange={(e) => {
                            changeFilterProp(item.id, e.target.value, 'operator');
                        }}>
                    <option hidden>Выберите оператор</option>
                    {
                        operators.map((item) => {
                            return <option value={item.value} key={item.value}>{item.label}</option>
                        })
                    }
                </select>

                <div className={styles.third_parameter}>
                    {/*// @ts-ignore*/}
                    {(!Answers[item.param.value] && item.operator !== 'range') &&
                        <input className={styles.search_filter} type='text'
                               onChange={(e) => {
                                   changeFilterProp(item.id, e.target.value, 'value');
                               }}
                               value={item.value}/>}
                    {/*// @ts-ignore*/}
                    {Answers[item.param.value] &&
                        <select className={styles.search_filter} value={item.value}
                                style={{width: '205px'}}
                                onChange={(e) => {
                                    changeFilterProp(item.id, e.target.value, 'value');
                                }}>
                            <option hidden>Выберите значение</option>
                            {
                                // @ts-ignore
                                Answers[item.param.value]['answers']
                                    .map(({id, value}: any) => <option key={id} value={value}>{value}</option>)
                            }
                        </select>
                    }
                </div>
                <button className={styles.delete_filter_button}
                        onClick={() => {
                            // @ts-ignore
                            setFilterArr((prevState) => prevState.filter((obj) => {
                                return obj.id !== item.id;
                            }));
                        }}>
                    <IconDelete width={30}
                                height={20}/>
                </button>
            </div>
        </MenuItem>
    );
}

export default FilterField