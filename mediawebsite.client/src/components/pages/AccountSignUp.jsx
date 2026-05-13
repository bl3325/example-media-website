import styles from "./page-styles/AccountAccess.module.css"

function AccountSignUp() {
    return (
        <div className={styles.layout}>
            <div className={`${styles.card} bg-light rounded-2 shadow d-flex flex-column align-items-center`}>
                <div className="bg-primary w-100 rounded-top" style={{ height: "10px" }}></div>

                <p className="text-center p-2 fs-3 text-decoration-underline">Sign Up</p>

                <div style={{ width: "80%" }}>
                    <p className="fs-6 mb-1 text-start">Email or Username</p>
                    <input type="text" className="form-control mb-4" placeholder="Email or Username"></input>

                    <p className="fs-6 mb-1 text-start">Password</p>
                    <input type="text" className="form-control mb-4" placeholder="Password"></input>
                </div>

                <button className="btn btn-outline-success shadow-sm mb-3">Sign Up</button>
            </div>
        </div>
    );
}

export default AccountSignUp;