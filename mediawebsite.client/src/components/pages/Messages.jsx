import { useState } from "react";

import styles from "./page-styles/MessagesStyle.module.css"
import ConnectionMessage from "../MessageBar"

function Messages() {
    const [activePage, setActivePage] = useState()

    const exampleConnections = [
        { name: "Card 1", lastMessage: "This is the first card." },
        { name: "Card 2", lastMessage: "This is the second card." },
        { name: "Card 3", lastMessage: "This is the third card." },
    ];

    return (
        <div className={styles.layout}>
            <div className={`${styles.connectionList} bg-surface border-theme`}>
                <div className={`${styles.searchBar} `}>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-theme-outline search-hover" type="submit">Search</button>
                    </form>
                </div>

                <hr className="border-theme"></hr>

                <h6 className="text-center ">Messages</h6>

                <div className={`${styles.searchContent} button-group-vertical`} role="group" aria-label="Vertical button group">
                    {exampleConnections.map((connection, index) => (
                        <ConnectionMessage key={index} name={connection.name} lastMessage={connection.lastMessage} activePage={activePage} setActivePage={setActivePage} />
                    ))}
                </div>
            </div>

            <div className={`${styles.messageContainer} bg-surface border-theme`}>
                
            </div>
        </div>
    );
}

export default Messages;