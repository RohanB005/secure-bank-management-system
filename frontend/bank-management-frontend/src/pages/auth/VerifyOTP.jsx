import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { verifyOTP } from "../../services/authService";

function VerifyOTP() {
    const navigate = useNavigate();
    const [digits, setDigits] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const inputsRef = useRef([]);

    const handleDigitChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;
        const next = [...digits];
        next[index] = value;
        setDigits(next);
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otp = digits.join("");
        if (otp.length !== 6) {
            toast.error("Please enter the complete 6-digit OTP");
            return;
        }
        try {
            setLoading(true);
            const email = localStorage.getItem("email") || "";
            const response = await verifyOTP({ email, otp });
            toast.success(response.data?.message || "OTP verified successfully");
            setTimeout(() => navigate("/dashboard"), 1000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid or expired OTP");
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
                    <h1>One last step <br />to verify it's you.</h1>
                    <p className="lede">
                        We've sent a 6-digit verification code to your registered email
                        or mobile number to keep your account secure.
                    </p>
                    <div className="auth-features">
                        <div className="feature"><span>✓</span> Code valid for 5 minutes</div>
                        <div className="feature"><span>🛡</span> Extra layer of account security</div>
                    </div>
                </div>

                <div className="auth-panel">
                    <div className="auth-card">
                        <div className="auth-head">
                            <span className="eyebrow">VERIFICATION</span>
                            <h2>Enter OTP</h2>
                            <p>Enter the 6-digit code we sent you to continue.</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="auth-otp-boxes">
                                {digits.map((digit, i) => (
                                    <input
                                        key={i}
                                        ref={(el) => (inputsRef.current[i] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleDigitChange(i, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(i, e)}
                                    />
                                ))}
                            </div>

                            <button className="auth-submit" disabled={loading}>
                                {loading ? "Verifying…" : "Verify & continue"}
                            </button>
                        </form>

                        <p className="auth-foot-note">
                            Didn't get a code? <Link to="/forgot-password" style={{ color: "var(--blue)", fontWeight: 700 }}>Resend</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VerifyOTP;
