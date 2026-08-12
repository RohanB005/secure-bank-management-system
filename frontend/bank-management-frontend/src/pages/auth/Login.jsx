import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { login } from "../../services/authService";
import PhoneHeroIllustration from "../../components/illustrations/PhoneHeroIllustration";

function Login() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            setLoading(true);
            const response = await login(formData);
            const data = response.data;

            localStorage.setItem("token", data.token);
            localStorage.setItem("customerId", data.customerId);
            localStorage.setItem("firstName", data.firstName);
            localStorage.setItem("lastName", data.lastName);
            localStorage.setItem("email", data.email);

            toast.success(data.message);
            setTimeout(() => {
                navigate("/dashboard");
            }, 1200);
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid Email or Password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer position="top-right" />

            <div className="auth-shell">
                {/* Brand / marketing panel */}
                <div className="auth-brand">
                    <div className="auth-brand-mark">S</div>
                    <h1>All banking. <br />One click away.</h1>
                    <p className="lede">
                        Secure Bank gives you a single place to manage accounts, move money and
                        track every transaction — protected by bank-grade encryption at every step.
                    </p>

                    <div className="auth-illustration">
                        <PhoneHeroIllustration />
                    </div>

                    <div className="auth-features">
                        <div className="feature"><span>✓</span> Bank-grade, encrypted sessions</div>
                        <div className="feature"><span>⇄</span> Instant transfers between accounts</div>
                        <div className="feature"><span>↺</span> Real-time transaction history</div>
                        <div className="feature"><span>◎</span> 24/7 support &amp; AI assistant</div>
                    </div>

                    <div className="auth-strip">
                        <div><strong>2M+</strong><span>ACTIVE CUSTOMERS</span></div>
                        <div><strong>99.9%</strong><span>UPTIME</span></div>
                        <div><strong>24/7</strong><span>SUPPORT</span></div>
                    </div>
                </div>

                {/* Form panel */}
                <div className="auth-panel">
                    <div className="auth-card">
                        <div className="auth-head">
                            <span className="eyebrow">SECURE BANKING</span>
                            <h2>Welcome back</h2>
                            <p>Sign in to continue to your account</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="auth-field">
                                <label>Email address<span className="req">*</span></label>
                                <div className="auth-input-wrap">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        autoComplete="username"
                                    />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label>Password<span className="req">*</span></label>
                                <div className="auth-input-wrap">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        className="auth-eye"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? "🙈 Hide" : "👁 Show"}
                                    </button>
                                </div>
                            </div>

                            <div className="auth-links" style={{ marginTop: -6, marginBottom: 16 }}>
                                <span />
                                <Link to="/forgot-password">Forgot password?</Link>
                            </div>

                            <button className="auth-submit" disabled={loading}>
                                {loading ? "Signing in…" : "Log in securely"}
                            </button>
                        </form>

                        <div className="auth-divider">New to Secure Bank?</div>

                        <Link to="/register" className="btn-gold" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
                            Open an account
                        </Link>

                        <p className="auth-foot-note">
                            <span className="text-highlight">Protected</span> by 256-bit encryption · © 2026 Secure Bank
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
