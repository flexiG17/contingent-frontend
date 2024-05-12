import React, {useState} from 'react'
import styles from './header.module.scss'
import MainLogo from '../../../assets/main_logo.svg'
import {IconHouseDoor, IconProfile, MenuIcon} from "../../../assets/Icons";
import {Link} from "react-router-dom";
import {PathsEnum} from "../../../router/pathsEnum";

const Header = () => {
    const [isActive, setIsActive] = useState(false)

    return (
        <header className={styles.header}>
            <Link to={PathsEnum.MAIN} style={{cursor: 'pointer'}}>
                <img src={MainLogo} alt={'Основное лого'} width={150} height={110}/>
            </Link>
            <nav className={styles.header_nav}>
                <div className={styles.header_nav_link}>
                    <IconHouseDoor width={21} height={21} color={'#FA7A45'}/>
                    <h5>
                        Главная
                    </h5>
                </div>
                <div className={styles.header_nav_link}>
                    <IconProfile width={21} height={21} color={'#FA7A45'}/>
                    <h5>
                        Личный кабинет
                    </h5>
                </div>
            </nav>
            <MenuIcon
                onClick={() => setIsActive(prevState => !prevState)}
                style={isActive ? {transform: 'rotate(180deg)'} : {transform: 'rotate(0deg)'}}
                className={styles.header_menu_icon}/>
        </header>
    )
}

export default Header