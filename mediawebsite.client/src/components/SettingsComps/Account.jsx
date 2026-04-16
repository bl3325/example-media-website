import mainStyles from "../component-styles/SettingsMain.module.css"
import AccountIcon from "../../../src/assets/padlock.png"

function Account() {
    return (
        <div className={`${mainStyles.layout} position-relative`}>
            <img className="ratio ratio-1x1 ms-4 mt-2 position-absolute" style={{ width: "3rem" }} src={AccountIcon}></img>

            <div className={`${mainStyles.title} `}>
                <p className="display-6">Account</p>
            </div>

            <div className={`${mainStyles.contentContainer} p-3`}>
                <div className={`${mainStyles.subSection} `}>
                    <p className="lead">Account Info</p>

                    <div className={`${mainStyles.subSection} `}>

                    </div>
                </div>

                <div className={`${mainStyles.subSection} `}>
                    <p className="lead">Passwords & Authentication</p>

                    <div className={`${mainStyles.subSection} `}>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;