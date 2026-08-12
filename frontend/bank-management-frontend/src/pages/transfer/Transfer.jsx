import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

function Transfer() {
    const [form, setForm] = useState({ recipient: "", account: "", amount: "", note: "" });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <MainLayout>
            <div className="page-heading">
                <div><span className="eyebrow">MONEY MOVEMENT</span><h2>Transfer Money</h2><p>Send money securely from your bank account.</p></div>
            </div>

            <div className="form-layout">
                <section className="panel transfer-card">
                    <div className="panel-heading">
                        <div><span className="eyebrow">NEW TRANSFER</span><h3>Recipient details</h3></div>
                        <span className="form-step">01</span>
                    </div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-grid">
                            <div className="field full"><label>Recipient name</label><input name="recipient" value={form.recipient} onChange={handleChange} placeholder="Enter recipient name" /></div>
                            <div className="field"><label>Account number</label><input name="account" value={form.account} onChange={handleChange} placeholder="Enter account number" /></div>
                            <div className="field"><label>Amount</label><input name="amount" type="number" min="1" value={form.amount} onChange={handleChange} placeholder="₹ 0.00" /></div>
                            <div className="field full"><label>Note <span>Optional</span></label><textarea name="note" value={form.note} onChange={handleChange} placeholder="What's this transfer for?" rows="3" /></div>
                        </div>
                        <div className="form-notice">🔒 Transfers are protected by authenticated banking services.</div>
                        <button className="primary-button" type="submit">Continue Transfer <span>→</span></button>
                    </form>
                </section>

                <aside className="panel transfer-side">
                    <div className="side-illustration">⇄</div>
                    <h3>Simple & secure</h3>
                    <p>Review recipient information carefully before confirming a transfer.</p>
                    <div className="mini-list"><span>✓</span> Secure authentication</div>
                    <div className="mini-list"><span>✓</span> Transaction tracking</div>
                    <div className="mini-list"><span>✓</span> Fraud monitoring</div>
                </aside>
            </div>
        </MainLayout>
    );
}

export default Transfer;
