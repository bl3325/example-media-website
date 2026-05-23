import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./page-styles/AccountAccess.module.css";

function AccountLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const resp = await fetch("/Account/Login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (resp.ok) {
            navigate("/");
        } else {
            console.error("Login failed");
        }
    }

    return (
        <div className={styles.layout}>
            <form className={`${styles.card} bg-light rounded-2 shadow d-flex flex-column align-items-center`} onSubmit={handleSubmit}>
                <div className="bg-success w-100 rounded-top" style={{ height: "10px" }} />
                <p className="text-center p-2 fs-3 text-decoration-underline">Login</p>
                <div style={{ width: "80%" }}>
                    <p className="fs-6 mb-1 text-start">Email or Username</p>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="form-control mb-4" />
                    <p className="fs-6 mb-1 text-start">Password</p>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control mb-4" />
                </div>
                <button type="submit" className="btn btn-outline-success shadow-sm mb-3">Login</button>
                <p style={{ margin: 0 }}>Don't have an account? <Link to="/account/signup">Sign Up</Link></p>
            </form>
        </div>
    );
}

export default AccountLogin;