import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./page-styles/SettingsStyle.module.css"
import Appearance from "../SettingsComps/Appearance.jsx"
import Account from "../SettingsComps/Account.jsx"

import AccountIcon from "../../../src/assets/padlock.png"
import AppearanceIcon from "../../../src/assets/art-palette.png"

function Settings() {
    const [activePage, setActivePage] = useState("Account")

    /* Account Verification */
    const navigate = useNavigate();

    async function handleUserIconClick() {
        const resp = await fetch("/Account/IsLoggedIn");
        const data = await resp.json();

        if (!data || !data.authenticated) {
            navigate("/Account/Login");
        }
    };

    handleUserIconClick();

    return (
        <div className={styles.layout}>
            <div className={`${styles.settingsMain} border-theme bg-surface`}>
                <aside className={`${styles.settingsNavigator} border-theme`}>
                    <div className={`${styles.searchBar} `}>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-theme-outline search-hover" type="submit">Search</button>
                        </form>
                    </div>

                    <hr className="border-theme"></hr>

                    <h6 className="text-center ">Settings</h6>

                    <div className={`${styles.searchContent} button-group-vertical`} role="group" aria-label="Vertical button group" aria-orientation="vertical">

                        <button type="button" className={`${activePage === "Account" ? styles.buttonActive : ""} btn primary-hover`} onClick={() => setActivePage("Account")}>
                            <img className="ratio ratio-1x1 me-1" src={AccountIcon} style={{ width: "1rem" }}></img>
                            Account
                        </button>

                        <button type="button" className={`${activePage === "Appearance" ? styles.buttonActive : ""} btn primary-hover`} onClick={() => setActivePage("Appearance")}>
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