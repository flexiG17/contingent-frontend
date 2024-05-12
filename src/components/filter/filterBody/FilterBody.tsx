import React, {useEffect, useState} from "react";
import {fieldPriorities} from "../../../utils/const";
import {getColumns} from "../../../actions/student";
import {Badge, IconButton, Menu} from "@mui/material";
import FilterField from "../filterField/FilterField";
import {IconDelete} from "../../../assets/Icons";
import styles from './filterBody.module.scss'

const ITEM_HEIGHT = 50;
const SortColumns = (columns: any[]) => {
    const sortedColumns = [...columns]

    sortedColumns.map(column => {
        fieldPriorities.map(priority => {
            if (column.value === priority.label)
                column['rating'] = priority.rating
            else if (!column['rating'])
                column['rating'] = fieldPriorities.length + 1
        })
    })
        // @ts-ignore
        .sort((a, b) => a.rating - b.rating)

    return sortedColumns.sort((a, b) => a.rating - b.rating)
}
const FilterBody = ({filters, setFilters}: any) => {
    const [anchorEl, setAnchorEl] = useState();
    const open = Boolean(anchorEl);

    const [filterArr, setFilterArr] = useState(filters);
    const [columns, setColumns] = useState([]);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        // @ts-ignore
        setAnchorEl(null);
    };

    const changeFilterProp = (id: any, value: any, operator: any) => {
        setFilterArr((prevState: any) => {
            return prevState.map((item: any) => {
                if (item.id === id) {
                    return {...item, [operator]: value};
                }
                return item;
            });
        });
    };

    useEffect(() => {
        getColumns()
            .then(res =>
                setColumns(res.data.map((item: any) => {
                    return {
                        value: item.name,
                        label: item.ru,
                        type: item.type
                    }
                })));
    }, []);

    return (
        <div>
            <button
                style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}
                onClick={handleClick}>
                <p>
                    Фильтрация
                </p>
            </button>
            <Menu
                autoFocus={false}
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        minHeight: ITEM_HEIGHT * 7,
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '900px',
                    },
                }}
            >
                {filterArr.map((item: any) => (
                    <FilterField key={item.id} item={item} columns={SortColumns(columns)} setFilterArr={setFilterArr}
                                 changeFilterProp={changeFilterProp}/>
                ))}
                <div className={styles.button_position}>
                    <button className={styles.add_filter_button} onClick={() => {
                        setFilterArr([...filterArr, {
                            id: filterArr.length !== 0 ? filterArr[filterArr.length - 1].id + 1 : 1,
                            param:
                                {value: '', label: ''},
                            operator:
                                {value: '', label: ''},
                            value: '',
                        }]);
                    }}>
                        Добавить
                        {/*<AddIcon/>*/}
                    </button>
                    {
                        (filters.length !== 0 || filterArr.length !== 0) &&
                        <>
                            <button className={styles.add_filter_button} onClick={() => {
                                setFilterArr([]);
                                setFilters([]);
                                handleClose();
                            }}>
                                Сбросить
                            </button>
                            <button className={styles.add_filter_button}
                                    onClick={() => {
                                        for (let i = 0; i < filterArr.length; i++) {
                                            if (filterArr[i].operator === 'range' && filterArr[i].param.type !== "date") {
                                                break
                                            } else if (filterArr[i].operator === 'coincidence' && filterArr[i].param.type === "date") {
                                                break
                                            } else if (typeof (filterArr[i].value) !== 'string' && filterArr[i].param.type !== "date") {
                                                break
                                            } else if (filterArr[i].operator.value === '') {
                                                break
                                            } else if (i === filterArr.length - 1) {
                                                setFilters(filterArr);
                                                handleClose();
                                            }
                                        }
                                    }}>
                                Применить
                            </button>
                        </>
                    }
                </div>
            </Menu>
        </div>
    );
}

export default FilterBody