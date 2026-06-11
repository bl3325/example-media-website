import { useEffect, useState } from "react"
import styles from "./page-styles/ConnectionsStyle.module.css"

import ConnectionList from "../ConnectionList"
import ConnectionRequests from "../ConnectionRequests"
import ConnectionPeople from "../ConnectionPeople"

function Connections() {
    const [activePage, setActivePage] = useState("connections");
    const [counts, setCounts] = useState({ connections: 0, requests: 0 });

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const resp = await fetch("/api/connections/counts", { credentials: "include" });
                if (!resp.ok) return;
                const data = await resp.json();
                if (mounted) setCounts({ connections: data.connections ?? 0, requests: data.requests ?? 0 });
            }
            catch { /* network errors */ }
        })();
        return () => { mounted = false; }
    }, []);

    return (
        <div className={`${styles.layout}`}>
            <div className={`${styles.mainContainer} bg-surface border-theme`}>
                <div className={styles.connectionsHeader}>
                    <button className={`${activePage === "connections" ? styles.buttonActive : ""} btn p-1 lead primary-hover`} onClick={() => setActivePage("connections")}>
                        Connections ({counts.connections})
                    </button>
                    <button className={`${activePage === "requests" ? styles.buttonActive : ""} btn p-1 lead primary-hover ms-1`} onClick={() => setActivePage("requests")}>
                        Requests ({counts.requests})
                    </button>
                    <button className={`${activePage === "search" ? styles.buttonActive : ""} btn ms-1 p-1 lead primary-hover`} onClick={() => setActivePage("search")}>
                        Users
                    </button>
                </div>

                {activePage === "connections" && <ConnectionList />}
                {activePage === "requests" && <ConnectionRequests />}
                {activePage === "search" && <ConnectionPeople />}

            </div>
        </div>
    );
}

export default Connections;