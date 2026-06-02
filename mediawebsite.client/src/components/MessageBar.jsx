import styles from "./component-styles/ConnectionMessage.module.css";
import placeholderUserIcon from "../../src/assets/user-icon.png";

function ConnectionMessage({ name, lastMessage, activePage, setActivePage }) {
    return (
        <button
            className={`${activePage?.name === name ? styles.buttonActive : ""} ${styles.layout} btn primary-hover`}
            onClick={() => setActivePage({ name })}
        >
            <img className={styles.userIcon} src={placeholderUserIcon} />

            <div className={styles.messageInfo}>
                <p className={`${styles.contactName} text-body`}>{name}</p>
                <p className={`${styles.contactLastMessage} text-body-secondary`}>{lastMessage}</p>
            </div>
        </button>
    );
}

export default ConnectionMessage;