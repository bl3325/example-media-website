import { useState } from "react"

import styles from "./page-styles/SettingsStyle.module.css"
import Appearance from "../SettingsComps/Appearance.jsx"
import Account from "../SettingsComps/Account.jsx"

import AccountIcon from "../../../src/assets/padlock.png"
import AppearanceIcon from "../../../src/assets/art-palette.png"

function Settings() {
    const [activePage, setActivePage] = useState("Account")

    return (
        <div className={styles.layout}>
            <div className={`${styles.settingsMain} border-secondary bg-light`}>
                <aside className={`${styles.settingsNavigator} border-secondary`}>
                    <div className={`${styles.searchBar} `}>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>

                    <hr className="border-secondary"></hr>

                    <h6 className="text-center ">Settings</h6>

                    <div className={`${styles.searchContent} button-group-vertical`} role="group" aria-label="Vertical button group">

                        <button type="button" className={`${activePage === "Account" ? styles.buttonActive : ""} btn`} onClick={() => setActivePage("Account")}>
                            <img className="ratio ratio-1x1 me-1" src={AccountIcon} style={{ width: "1rem" }}></img>
                            Account
                        </button>

                        <button type="button" className={`${activePage === "Appearance" ? styles.buttonActive : ""} btn`} onClick={() => setActivePage("Appearance")}>
                            <img className="ratio ratio-1x1 me-1" src={AppearanceIcon} style={{ width: "1rem" }}></img>
                            Appearance
                        </button>

                    </div>
                </aside>

                <div className={`${styles.mainContent}`}>
                    {activePage === "Account" && <Account />}
                    {activePage === "Appearance" && <Appearance />}
                </div>
            </div>
        </div>
  );
}

export default Settings;