import { useState } from "react"
import styles from "./page-styles/ConnectionsStyle.module.css"

import ConnectionList from "../ConnectionList"
import ConnectionSearch from "../ConnectionSearch"

function Connections() {
    const [activePage, setActivePage] = useState("connections");

    return (
        <div className={`${styles.layout}`}>
            <div className={`${styles.mainContainer} bg-surface border-theme`}>
                <div className={`${styles.searchBar} `}>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search Connections" aria-label="Search" />
                        <button className="btn btn-theme-outline search-hover" type="submit">Search</button>
                    </form>
                </div>

                <div className={styles.connectionsHeader}>
                    <button className={`${ activePage === "connections" ? styles.buttonActive : "" } btn p-1 lead primary-hover`} onClick={() => setActivePage("connections")}>Connections (0)</button>
                    <button className={`${activePage === "search" ? styles.buttonActive : ""} btn ms-1 p-1 lead primary-hover`} onClick={() => setActivePage("search")}>Search</button>
                </div>

                {activePage === "connections" && <ConnectionList />}
                {activePage === "search" && <ConnectionSearch />}

            </div>
        </div>
    );
}

export default Connections;