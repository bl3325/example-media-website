import { useState } from "react"
import styles from "./page-styles/ConnectionsStyle.module.css"

import ConnectionList from "../ConnectionList"
import ConnectionSearch from "../ConnectionSearch"

function Connections() {
    const [activePage, setActivePage] = useState("connections");

    return (
        <div className={`${styles.layout}`}>
            <div className={`${styles.mainContainer} bg-light border-secondary`}>
                <div className={`${styles.searchBar} `}>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search Connections" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>

                <div className={styles.connectionsHeader}>
                    <button className="btn p-1 lead" onClick={() => setActivePage("connections")}>Connections (0)</button>
                    <button className="btn p-1 ms-3 lead" onClick={() => setActivePage("search")}>Search</button>
                    {/*<hr className="border-secondary"></hr>*/}
                </div>

                {activePage === "connections" && <ConnectionList />}
                {activePage === "search" && <ConnectionSearch />}

            </div>
        </div>
    );
}

export default Connections;