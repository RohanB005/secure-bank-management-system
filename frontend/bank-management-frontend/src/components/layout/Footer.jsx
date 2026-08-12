function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-top">
                <div className="footer-brand-col">
                    <div className="brand">
                        <div className="brand-mark">S</div>
                        <div>
                            <div className="brand-name">Secure Bank</div>
                            <div className="brand-subtitle">Digital Banking</div>
                        </div>
                    </div>
                    <p>
                        Secure Bank is committed to safe, simple digital banking —
                        manage accounts, payments and transfers from one trusted place.
                    </p>
                    <div className="footer-social">
                        <a href="#" aria-label="Facebook">f</a>
                        <a href="#" aria-label="Instagram">◎</a>
                        <a href="#" aria-label="YouTube">▶</a>
                        <a href="#" aria-label="Twitter / X">𝕏</a>
                        <a href="#" aria-label="LinkedIn">in</a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>About Us</h4>
                    <ul>
                        <li><a href="#">Overview</a></li>
                        <li><a href="#">Investor Relations</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">News Room</a></li>
                        <li><a href="#">Corporate Governance</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Useful Links</h4>
                    <ul>
                        <li><a href="/accounts">My Accounts</a></li>
                        <li><a href="/deposit">Deposit Money</a></li>
                        <li><a href="/transfer">Transfer Funds</a></li>
                        <li><a href="/history">Transaction History</a></li>
                        <li><a href="/accounts/create">Open an Account</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="#">Interest Rates</a></li>
                        <li><a href="#">Fees &amp; Charges</a></li>
                        <li><a href="#">Bank Holiday List</a></li>
                        <li><a href="#">Glossary</a></li>
                        <li><a href="#">Learning Centre</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Calculators</h4>
                    <ul>
                        <li><a href="#">EMI Calculator</a></li>
                        <li><a href="#">Fixed Deposit Calculator</a></li>
                        <li><a href="#">Recurring Deposit Calculator</a></li>
                        <li><a href="#">Loan Eligibility Calculator</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Need Help</h4>
                    <ul>
                        <li><a href="/chatbot">AI Assistant</a></li>
                        <li><a href="#">Grievance Redressal</a></li>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Customer Care</a></li>
                        <li><a href="#">Report Fraud</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <span>© {year} Secure Bank. All rights reserved.</span>
                <div className="footer-contact">
                    <span>📞 1800-XXX-XXX</span>
                    <span>✉ support@securebank.com</span>
                    <span className="badge-alert">Report a lost card immediately</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
