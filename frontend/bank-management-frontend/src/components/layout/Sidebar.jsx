import { NavLink } from "react-router-dom";
import { ShieldIcon } from "../illustrations/ActionIcons";

const mainLinks = [
    { to: "/dashboard", icon: "⌂", label: "Dashboard" },
    { to: "/accounts", icon: "▣", label: "My Accounts" },
    { to: "/accounts/create", icon: "+", label: "Open Account" },
];

const moneyLinks = [
    { to: "/deposit", icon: "↓", label: "Deposit" },
    { to: "/withdraw", icon: "↑", label: "Withdraw" },
    { to: "/transfer", icon: "⇄", label: "Transfer Money" },
    { to: "/history", icon: "↺", label: "Transactions" },
];

function Sidebar() {
    const linkClass = ({ isActive }) => `side-link ${isActive ? "active" : ""}`;

    return (
        <aside className="sidebar">
            <div className="brand">
                <div className="brand-mark">S</div>
                <div>
                    <div className="brand-name">Secure Bank</div>
                    <div className="brand-subtitle">Digital Banking</div>
                </div>
            </div>

            <div className="side-section">
                <div className="side-label">OVERVIEW</div>
                {mainLinks.map((item) => (
                    <NavLink key={item.to} to={item.to} className={linkClass}>
                        <span className="side-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </div>

            <div className="side-section">
                <div className="side-label">MONEY</div>
                {moneyLinks.map((item) => (
                    <NavLink key={item.to} to={item.to} className={linkClass}>
                        <span className="side-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </div>

            <div className="side-section">
                <div className="side-label">SUPPORT</div>
                <NavLink to="/profile" className={linkClass}>
                    <span className="side-icon">◎</span>
                    <span>My Profile</span>
                </NavLink>
                <NavLink to="/chatbot" className={linkClass}>
                    <span className="side-icon">✦</span>
                    <span>AI Assistant</span>
                </NavLink>
            </div>

            <div className="sidebar-bottom">
                <div className="security-card">
                    <div className="security-icon"><ShieldIcon /></div>
                    <div>
                        <strong>Bank-grade security</strong>
                        <span>Your session is protected</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
