import styles from "./component-styles/ConnectionStyle.module.css"
import userIcon from "../assets/user-icon.jpg"

function Connection({ title, description }) {
    return (
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
                <div className={`${styles.imgContainer} col-md-4`}>
                    <img src={userIcon} className={`${styles.userIcon} img-fluid rounded-start`} alt="user icon"></img>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Connection;