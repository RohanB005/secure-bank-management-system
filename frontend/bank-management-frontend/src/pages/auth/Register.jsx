import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { register } from "../../services/authService";
import GrowthIllustration from "../../components/illustrations/GrowthIllustration";

function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        aadhaar: "",
        pan: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const requestData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            email: formData.email,
            mobile: formData.mobile,
            password: formData.password,
            aadhaar: formData.aadhaar,
            pan: formData.pan,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
        };

        try {
            setLoading(true);
            const response = await register(requestData);
            toast.success(response.data.message);
            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration Failed");
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
                    <h1>Open your account <br />in minutes.</h1>
                    <p className="lede">
                        Join Secure Bank for free digital banking, instant transfers and a
                        dedicated AI assistant to help you manage your money — no branch visit needed.
                    </p>
                    <div className="auth-illustration">
                        <GrowthIllustration />
                    </div>
                    <div className="auth-features">
                        <div className="feature"><span>✓</span> Free savings account, zero balance</div>
                        <div className="feature"><span>🛡</span> Aadhaar &amp; PAN verified onboarding</div>
                        <div className="feature"><span>⚡</span> Instant activation, no paperwork</div>
                    </div>
                </div>

                <div className="auth-panel" style={{ padding: "40px 30px" }}>
                    <div className="auth-card" style={{ maxWidth: 620 }}>
                        <div className="auth-head">
                            <span className="eyebrow">JOIN SECURE BANK</span>
                            <h2>Create your account</h2>
                            <p>Fill in your details below — it only takes a few minutes.</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="auth-section-title">Personal details</div>
                            <div className="form-grid">
                                <div className="auth-field">
                                    <label>First name<span className="req">*</span></label>
                                    <div className="auth-input-wrap">
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Jane" />
                                    </div>
                                </div>
                                <div className="auth-field">
                                    <label>Last name<span className="req">*</span></label>
                                    <div className="auth-input-wrap">
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="auth-field">
                                    <label>Date of birth<span className="req">*</span></label>
                                    <div className="auth-input-wrap">
                                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="auth-field">
                                    <label>Gender<span className="req">*</span></label>
                                    <div className="auth-input-wrap">
                                        <select name="gender" value={formData.gender} onChange={handleChange}>
                                            <option value="">Select</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHER">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="auth-section-title">Contact information</div>
                            <div className="form-grid">
                                <div className="auth-field">
                                    <label>Email<span className="req">*</span></label>
                                    <div className="auth-input-wrap">
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                                    </div>
                                </div>
                                <div className="auth-field">
                                    <label>Mobile number<span className="req">*</span></label>
                                    <div className="auth-input-wrap">
                                        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} maxLength="10" placeholder="10-digit number" />
                                    </div>
                                </div>
                            </div>

                            <div className="auth-section-title">Identity verification</div>
                            <div className="form-grid">
                                <div className="auth-field">
                                    <label>Aadhaar number<span className="req">*</span></label>
                                    <div className="auth-input-wrap">
                                        <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} maxLength="12" placeholder="XXXX XXXX XXXX" />
                                    </div>
                                </div>
                                <div className="auth-field">
                                    <label>PAN number<span className="req">*</span></label>
                                    <div className="auth-input-wrap">
                                        <input type="text" name="pan" value={formData.pan} onChange={handleChange} style={{ textTransform: "uppercase" }} placeholder="ABCDE1234F" />
                                    </div>
                                </div>
                            </div>

                            <div className="auth-section-title">Address</div>
                            <div className="auth-field">
                                <label>Street address<span className="req">*</span></label>
                                <textarea rows="2" name="address" value={formData.address} onChange={handleChange} placeholder="House no., street, area" />
                            </div>
                            <div className="form-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                                <div className="auth-field">
                                    <label>City<span className="req">*</span></label>
                                    <div className="auth-input-wrap">
                                        <input type="text" name="city" value={formData.city} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="auth-field">
                                    <label>State<span className="req">*</span></label>
                                    <div className="auth-input-wrap">
                                        <input type="text" name="state" value={formData.state} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="auth-field">
                                    <label>Pincode<span className="req">*</span></label>
                                    <div className="auth-input-wrap">
                                        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} maxLength="6" />
                                    </div>
                                </div>
                            </div>

                            <div className="auth-section-title">Security</div>
                            <div className="form-grid">
                                <div className="auth-field">
                                    <label>Password<span className="req">*</span></label>
                                    <div className="auth-input-wrap">
                                        <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Min. 8 characters" />
                                        <button type="button" className="auth-eye" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? "🙈" : "👁"}
                                        </button>
                                    </div>
                                </div>
                                <div className="auth-field">
                                    <label>Confirm password<span className="req">*</span></label>
                                    <div className="auth-input-wrap">
                                        <input type={showConfirm ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password" />
                                        <button type="button" className="auth-eye" onClick={() => setShowConfirm(!showConfirm)}>
                                            {showConfirm ? "🙈" : "👁"}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="form-notice" style={{ margin: "8px 0 20px" }}>
                                By creating an account you agree to our <span className="text-highlight">Terms of Service</span> and <span className="text-highlight">Privacy Policy</span>.
                            </div>

                            <button className="auth-submit" type="submit" disabled={loading}>
                                {loading ? "Creating your account…" : "Create account"}
                            </button>
                        </form>

                        <p className="auth-foot-note">
                            Already have an account? <Link to="/" style={{ color: "var(--blue)", fontWeight: 700 }}>Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
