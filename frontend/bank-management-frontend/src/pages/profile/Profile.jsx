import MainLayout from "../../components/layout/MainLayout";

function Profile() {
    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";
    const email = localStorage.getItem("email") || "Not available";
    const customerId = localStorage.getItem("customerId") || "—";

    return (
        <MainLayout>
            <div className="page-heading">
                <div><span className="eyebrow">ACCOUNT SETTINGS</span><h2>My Profile</h2><p>Your personal banking information.</p></div>
            </div>

            <div className="profile-layout">
                <section className="panel profile-hero">
                    <div className="large-avatar">{(firstName.charAt(0) || "C").toUpperCase()}</div>
                    <h2>{firstName} {lastName}</h2>
                    <p>{email}</p>
                    <span className="verified-pill">✓ Verified customer</span>
                </section>

                <section className="panel profile-details">
                    <div className="panel-heading"><div><span className="eyebrow">PERSONAL INFORMATION</span><h3>Profile details</h3></div></div>
                    <div className="details-grid">
                        <div><span>Customer ID</span><strong>{customerId}</strong></div>
                        <div><span>First name</span><strong>{firstName || "—"}</strong></div>
                        <div><span>Last name</span><strong>{lastName || "—"}</strong></div>
                        <div><span>Email address</span><strong>{email}</strong></div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}

export default Profile;
