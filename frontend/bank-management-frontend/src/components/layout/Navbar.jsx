import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const firstName = localStorage.getItem("firstName") || "Customer";

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <header className="topbar">
            <div>
                <div className="topbar-eyebrow">SECURE BANKING</div>
                <h1 className="topbar-title">Welcome back, {firstName}</h1>
            </div>

            <div className="topbar-actions">
                <button className="icon-button" title="Notifications" aria-label="Notifications">
                    🔔<span className="notif-dot" />
                </button>
                <Link to="/profile" className="profile-chip">
                    <span className="avatar">{firstName.charAt(0).toUpperCase()}</span>
                    <span className="profile-name">{firstName}</span>
                </Link>
                <button className="logout-button" onClick={logout}>Logout</button>
            </div>
        </header>
    );
}

export default Navbar;
