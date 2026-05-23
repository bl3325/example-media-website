import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./page-styles/AccountAccess.module.css";

function AccountSignUp() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        try {
            const resp = await fetch("/Account/Register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    UserName: userName,
                    Email: email,
                    Password: password
                }),
            });

            if (resp.ok) {
                navigate("/");
            } else {
                const text = await resp.text();
                setError(text || "Register failed");
                console.error("Register failed", text);
            }
        } catch (ex) {
            setError("Network error");
            console.error(ex);
        }
    }

    return (
        <div className={styles.layout}>
            <form className={`${styles.card} bg-light rounded-2 shadow d-flex flex-column align-items-center`} onSubmit={handleSubmit}>
                <div className="bg-primary w-100 rounded-top" style={{ height: "10px" }} />
                <p className="text-center p-2 fs-3 text-decoration-underline">Sign Up</p>
                <div style={{ width: "80%" }}>
                    <p className="fs-6 mb-1 text-start">Username</p>
                    <input value={userName} onChange={e => setUserName(e.target.value)} className="form-control mb-4" />
                    <p className="fs-6 mb-1 text-start">Email</p>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control mb-4" />
                    <p className="fs-6 mb-1 text-start">Password</p>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control mb-4" />
                </div>
                <button type="submit" className="btn btn-outline-success shadow-sm mb-3">Sign Up</button>
                {error && <div className="text-danger mb-2 text-align-center">Unable to Register</div>}
            </form>
        </div>
    );
}

export default AccountSignUp;