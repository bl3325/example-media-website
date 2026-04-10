import styles from "./component-styles/ConnectionMessage.module.css"
import placeholderUserIcon from "../../src/assets/user-icon.jpg"

function ConnectionMessage({ name, lastMessage }) {
    return (
        <button className={`${styles.layout} btn bg-oranj`}>
            <img className={styles.userIcon} src={placeholderUserIcon}></img>

            <div className={styles.messageInfo}>
                <p className={`${styles.contactName} text-body`}>{name}</p>
                <p className={`${styles.contactLastMessage} text-body-secondary`}>{lastMessage}</p>
            </div>
        </button>
    );
}

export default ConnectionMessage;