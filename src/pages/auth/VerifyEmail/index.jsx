import React, { useEffect, useMemo, useRef, useState } from "react";
import { Clock3, MailCheck, RotateCcw, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import {
  resendEmailOtp,
  verifyEmailOtp
} from "../../../services/api/auth.js";
import Loading from "../../../components/common/Loading.jsx";

const OTP_LENGTH = 6;
const OTP_SECONDS = 600;

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(OTP_SECONDS);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);
  const lastAttemptedCode = useRef("");

  const maskedEmail = useMemo(() => {
    if (!email.includes("@")) return email || "your email";
    const [name, domain] = email.split("@");
    return `${name.slice(0, 2)}${"*".repeat(Math.max(name.length - 2, 2))}@${domain}`;
  }, [email]);
  const code = digits.join("");
  const timerLabel = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(
    secondsLeft % 60
  ).padStart(2, "0")}`;

  useEffect(() => {
    if (secondsLeft <= 0) return undefined;
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(current - 1, 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [secondsLeft]);

  useEffect(() => {
    if (
      code.length === OTP_LENGTH &&
      !loading &&
      secondsLeft > 0 &&
      code !== lastAttemptedCode.current
    ) {
      handleVerify(code);
    }
  }, [code, loading, secondsLeft]);

  const handleDigitChange = (index, value) => {
    const cleanValue = value.replace(/\D/g, "");
    lastAttemptedCode.current = "";
    if (!cleanValue) {
      setDigits((prev) => prev.map((digit, i) => (i === index ? "" : digit)));
      return;
    }

    const nextDigits = [...digits];
    cleanValue.slice(0, OTP_LENGTH - index).split("").forEach((digit, offset) => {
      nextDigits[index + offset] = digit;
    });
    setDigits(nextDigits);

    const nextIndex = Math.min(index + cleanValue.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    lastAttemptedCode.current = "";
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const nextDigits = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((digit, index) => {
      nextDigits[index] = digit;
    });
    setDigits(nextDigits);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH) - 1]?.focus();
  };

  const handleVerify = async (nextCode = code) => {
    if (!email || nextCode.length !== OTP_LENGTH) {
      toast.error("Enter your email and the 6-digit verification code.");
      return;
    }
    if (secondsLeft <= 0) {
      toast.error("Verification code expired. Request a new code.");
      return;
    }

    lastAttemptedCode.current = nextCode;
    setLoading(true);
    try {
      const session = await verifyEmailOtp({ email, code: nextCode });
      const user = login(session);
      toast.success("Email verified successfully.");
      navigate("/onboarding", { replace: true, state: { role: user.role } });
    } catch (err) {
      toast.error(err.message || "Invalid verification code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("Enter your email first.");
      return;
    }
    setResending(true);
    try {
      const response = await resendEmailOtp(email);
      setDigits(Array(OTP_LENGTH).fill(""));
      lastAttemptedCode.current = "";
      setSecondsLeft(response.expires_in_seconds || OTP_SECONDS);
      inputRefs.current[0]?.focus();
      toast.success("A fresh verification code has been sent.");
    } catch (err) {
      toast.error(err.message || "Unable to resend verification code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div>
      <div className="verify-email-icon">
        <MailCheck size={30} />
      </div>
      <h3 className="mb-2">Verify Your Email</h3>
      <p className="text-muted mb-4">
        We sent a secure 6-digit code to <strong>{maskedEmail}</strong>.
      </p>

      <div>
        <label className="form-label">Email address</label>
        <div className="input-group mb-3">
          <span className="input-group-text auth-input-icon">
            <ShieldCheck size={16} />
          </span>
          <input
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div className="otp-label-row">
          <label className="form-label mb-0">Verification code</label>
          <span className={secondsLeft <= 60 ? "otp-timer danger" : "otp-timer"}>
            <Clock3 size={15} />
            {timerLabel}
          </span>
        </div>
        <div className="otp-grid" onPaste={handlePaste}>
          {digits.map((digit, index) => (
            <input
              className="form-control otp-box"
              inputMode="numeric"
              key={index}
              maxLength="1"
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              value={digit}
              onChange={(event) => handleDigitChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              disabled={loading || secondsLeft <= 0}
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>
        <div className="otp-helper">
          {loading
            ? "Verifying automatically..."
            : secondsLeft <= 0
              ? "Code expired. Resend a fresh code."
              : "The code verifies automatically after the sixth digit."}
        </div>
        {loading && <div className="mt-3"><Loading label="Securing your account" /></div>}
      </div>

      <div className="verify-email-actions">
        <button className="btn btn-light border" type="button" onClick={handleResend} disabled={resending}>
          <RotateCcw size={15} />
          {resending ? "Sending..." : "Resend code"}
        </button>
        <Link className="auth-link" to="/auth/login">Back to login</Link>
      </div>
    </div>
  );
}
