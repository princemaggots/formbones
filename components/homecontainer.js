import Head from 'next/head'
import Link from 'next/link'
import styles from './homecontainer.module.css'


export default function HomeContainer() {
    return (
        <div className={styles.containerhome}>
            <div className={styles.welcome}>
                <h1> Welcome!</h1>
                <p>Bygones are the days of character info in several Google Docs and half-finished bios in Toyhou.se — Bare Bones is an online character database where you can:</p>
                <ul>
                    <li>create (unlimited) character profiles for both fandom and original characters</li>
                    <li> view other people's characters</li>  
                </ul>
                <p> Posting is dead simple with a detailed form and profiles are sorted neatly so all the information looks nice. I hope you enjoy your time here!</p>

            </div>
            <div className={styles.homeimg}><img src="/welcome.png"/></div>

        </div>
    )
}