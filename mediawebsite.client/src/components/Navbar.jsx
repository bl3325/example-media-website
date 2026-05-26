import { useNavigate } from "react-router-dom";

import userIcon from "../assets/user-icon.png"

function Navbar() {
    const navigate = useNavigate();

    async function handleUserIconClick() {
        const resp = await fetch("/Account/IsLoggedIn");
        const data = await resp.json();

        if (data.authenticated) {
            navigate("/Settings");
        } else {
            navigate("/Account/Login");
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">Media Website</a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navMenu"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navMenu">
                    <ul className="navbar-nav ms-auto" style={{ height: "100%" }}>

                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                            >
                                Pages
                            </a>

                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/">Home</a></li>
                                <li><a className="dropdown-item" href="/messages">Messages</a></li>
                                <li><a className="dropdown-item" href="/connections">Connections</a></li>
                                <li><a className="dropdown-item" href="/settings">Settings</a></li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <img src={userIcon} style={{ width: "2.5rem", cursor: "pointer" }} onClick={handleUserIconClick}></img>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar