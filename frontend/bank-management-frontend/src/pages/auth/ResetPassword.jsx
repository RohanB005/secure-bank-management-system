import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { resetPassword } from "../../services/authService";

function ResetPassword() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            setLoading(true);
            const response = await resetPassword(formData);
            toast.success(response.data?.message || "Password reset successfully");
            setTimeout(() => navigate("/"), 1200);
        } catch (error) {
            toast.error(error.response?.data?.message || "Unable to reset password");
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
                    <h1>Set a new, <br />stronger password.</h1>
                    <p className="lede">
                        Choose a strong password you haven't used before to keep your
                        Secure Bank account protected.
                    </p>
                    <div className="auth-features">
                        <div className="feature"><span>✓</span> At least 8 characters</div>
                        <div className="feature"><span>✓</span> Mix of letters, numbers &amp; symbols</div>
                        <div className="feature"><span>🛡</span> Never reuse an old password</div>
                    </div>
                </div>

                <div className="auth-panel">
                    <div className="auth-card">
                        <div className="auth-head">
                            <span className="eyebrow">ACCOUNT RECOVERY</span>
                            <h2>Reset password</h2>
                            <p>Enter the OTP sent to your email along with your new password.</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="auth-field">
                                <label>Registered email<span className="req">*</span></label>
                                <div className="auth-input-wrap">
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label>OTP<span className="req">*</span></label>
                                <div className="auth-input-wrap">
                                    <input type="text" name="otp" value={formData.otp} onChange={handleChange} maxLength="6" placeholder="6-digit code" />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label>New password<span className="req">*</span></label>
                                <div className="auth-input-wrap">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        placeholder="Min. 8 characters"
                                    />
                                    <button type="button" className="auth-eye" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? "🙈" : "👁"}
                                    </button>
                                </div>
                            </div>

                            <div className="auth-field">
                                <label>Confirm new password<span className="req">*</span></label>
                                <div className="auth-input-wrap">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Re-enter new password"
                                    />
                                </div>
                            </div>

                            <button className="auth-submit" disabled={loading}>
                                {loading ? "Resetting password…" : "Reset password"}
                            </button>
                        </form>

                        <p className="auth-foot-note">
                            <Link to="/" style={{ color: "var(--blue)", fontWeight: 700 }}>Back to login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
