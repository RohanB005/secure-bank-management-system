import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { forgotPassword } from "../../services/authService";

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your registered email");
            return;
        }
        try {
            setLoading(true);
            const response = await forgotPassword({ email });
            toast.success(response.data?.message || "Reset instructions sent to your email");
            setTimeout(() => navigate("/reset-password"), 1200);
        } catch (error) {
            toast.error(error.response?.data?.message || "Unable to process request");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer position="top-right" />
            <div className="auth-shell">
                <div className="auth-brand">
                    <div className="auth-brand-mark">S</div>
                    <h1>Account recovery, <br />made simple.</h1>
                    <p className="lede">
                        Enter the email linked to your account and we'll send you secure
                        instructions to reset your password.
                    </p>
                    <div className="auth-features">
                        <div className="feature"><span>✓</span> One-time secure reset link</div>
                        <div className="feature"><span>⏱</span> Link expires in 15 minutes</div>
                        <div className="feature"><span>🛡</span> Your account stays protected</div>
                    </div>
                </div>

                <div className="auth-panel">
                    <div className="auth-card">
                        <div className="auth-head">
                            <span className="eyebrow">ACCOUNT RECOVERY</span>
                            <h2>Forgot password?</h2>
                            <p>No worries — we'll send reset instructions to your email.</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="auth-field">
                                <label>Registered email<span className="req">*</span></label>
                                <div className="auth-input-wrap">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <button className="auth-submit" disabled={loading}>
                                {loading ? "Sending instructions…" : "Send reset instructions"}
                            </button>
                        </form>

                        <p className="auth-foot-note">
                            Remembered your password? <Link to="/" style={{ color: "var(--blue)", fontWeight: 700 }}>Back to login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
