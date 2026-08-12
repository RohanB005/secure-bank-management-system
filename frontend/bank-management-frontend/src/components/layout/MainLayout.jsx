import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout({ children }) {
    return (
        <div className="app-shell">
            <Sidebar />
            <div className="app-main">
                <Navbar />
                <main className="page-content">{children}</main>
                <Footer />
            </div>
        </div>
    );
}

export default MainLayout;
