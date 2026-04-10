import styles from "./page-styles/ConnectionsStyle.module.css"
import Connection from "../ConnectionTemplate"

function Connections() {
    const cardsData = [
        { title: "Card 1", description: "This is the first card." },
        { title: "Card 2", description: "This is the second card." },
        { title: "Card 3", description: "This is the third card." },
    ];

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
                    <span className="lead">Connections (0)</span>
                    <hr className="border-secondary"></hr>
                </div>

                <div className={`${styles.container} `}>
                    <div className={`${styles.connectionsContainer} `}>
                        {cardsData.map((card, index) => (
                            <Connection key={index} title={card.title} description={card.description} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Connections;