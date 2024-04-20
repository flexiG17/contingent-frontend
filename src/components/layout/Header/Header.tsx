import React from 'react'
import styles from './header.module.scss'
import MainLogo from '../../../assets/main_logo.svg'
import {IconHouseDoor, IconProfile} from "../../../assets/Icons";

const Header = () => {

    return (
        <header className={styles.header}>
            <img src={MainLogo} alt={'Основное лого'} width={150} height={110}/>
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
        </header>
    )
}

export default Header