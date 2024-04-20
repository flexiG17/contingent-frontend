import React, {ReactNode} from 'react'
import Header from "./Header/Header";
import styles from './layout.module.scss'
//import ScrollToTop from "../utils/scrollToTop";

const Layout = ({children} : {children: ReactNode}) => {
    return (
        <div className={styles.grid}>
            <section className={styles.body}>
                <Header/>
                {/*<ScrollToTop/>*/}
                {children}
            </section>
        </div>
    )
}

export default Layout