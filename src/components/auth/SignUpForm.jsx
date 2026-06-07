"use client";

import { useState, useId } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthField } from "./AuthField";
import { AuthMessage } from "./AuthMessage";
import { PasswordStrength } from "./PasswordStrength";
import { authClient } from "@/lib/auth-client";

// ── Validation helpers ────────────────────────────────────────────
function validateName(v) {
  if (!v.trim()) return "Name is required.";
  if (v.trim().length < 2) return "Name must be at least 2 characters.";
  if (v.trim().length > 60) return "Name must be under 60 characters.";
  return null;
}

function validateEmail(v) {
  if (!v.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
    return "Please enter a valid email address.";
  return null;
}

function validatePassword(v) {
  if (!v) return "Password is required.";
  if (v.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Z]/.test(v)) return "Must include at least one uppercase letter.";
  if (!/[0-9]/.test(v)) return "Must include at least one number.";
  return null;
}

function validateConfirm(v, password) {
  if (!v) return "Please confirm your password.";
  if (v !== password) return "Passwords do not match.";
  return null;
}

// ── Password strength calculator ────────────────────────────────
function getStrength(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

// ── Eye toggle icon ────────────────────────────────────────────
function EyeIcon({ open }) {
  return open ? (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  ) : (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    </svg>
  );
}

// ── Spinner ───────────────────────────────────────────────────
function Spinner() {
  return (
    <svg
      className="w-4 h-4 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ── Input base styles ──────────────────────────────────────────
const inputBase =
  "w-full text-sm dark:text-zinc-200 text-zinc-900 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 rounded-xl border px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60";
const inputNormal = `${inputBase} dark:border-white/[0.10] dark:hover:border-white/[0.30] border-black/[0.10] hover:border-black/[0.30]`;
const inputError = `${inputBase} border-red-500/40 focus:ring-red-500/20 focus:border-red-500/50`;
const inputSuccess = `${inputBase} border-emerald-500/30 focus:ring-emerald-500/20`;

// ── Main component ─────────────────────────────────────────────
export function SignUpForm() {
  const router = useRouter();
  const uid = useId(); // stable SSR-safe IDs

  // Form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // Field-level errors (shown after first blur)
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    confirm: null,
  });
  // Track which fields have been touched
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirm: false,
  });

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Form-level state
  const [formMessage, setFormMessage] = useState({ type: null, text: null });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ── Blur handlers — validate on leave ─────────────────────
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field) => {
    let error = null;
    if (field === "name") error = validateName(name);
    if (field === "email") error = validateEmail(email);
    if (field === "password") error = validatePassword(password);
    if (field === "confirm") error = validateConfirm(confirm, password);
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  // ── Live re-validate confirm when password changes ─────────
  const handlePasswordChange = (val) => {
    setPassword(val);
    if (touched.confirm && confirm) {
      setErrors((prev) => ({
        ...prev,
        confirm: val !== confirm ? "Passwords do not match." : null,
      }));
    }
  };

  // ── Submit ─────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage({ type: null, text: null });

    // Validate all fields
    const allTouched = {
      name: true,
      email: true,
      password: true,
      confirm: true,
    };
    setTouched(allTouched);

    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirm: validateConfirm(confirm, password),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        callbackURL: "/",
      });

      if (error) {
        // Map better-auth error codes to friendly messages
        const msg =
          error.code === "USER_ALREADY_EXISTS"
            ? "An account with this email already exists. Try signing in."
            : (error.message ?? "Something went wrong. Please try again.");
        setFormMessage({ type: "error", text: msg });
      } else {
        setSuccess(true);
        setFormMessage({
          type: "success",
          text: "Account created! Redirecting you to the homepage…",
        });
        setTimeout(() => router.push("/"), 2000);
      }
    } catch {
      setFormMessage({
        type: "error",
        text: "Network error. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const strength = getStrength(password);

  // Helper: which input style to use
  const fieldStyle = (field, extraCondition = true) => {
    if (touched[field] && errors[field]) return inputError;
    if (touched[field] && !errors[field] && extraCondition) return inputSuccess;
    return inputNormal;
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Form-level message */}
      <AuthMessage type={formMessage.type} message={formMessage.text} />

      {/* ── Name ── */}
      <AuthField
        id={`${uid}-name`}
        label="Full Name"
        error={touched.name ? errors.name : null}
        required
      >
        <input
          id={`${uid}-name`}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => handleBlur("name")}
          placeholder="John Doe"
          autoComplete="name"
          aria-invalid={touched.name && !!errors.name}
          aria-describedby={
            touched.name && errors.name ? `${uid}-name-error` : undefined
          }
          className={fieldStyle("name", name.trim().length >= 2)}
          disabled={loading || success}
        />
      </AuthField>

      {/* ── Email ── */}
      <AuthField
        id={`${uid}-email`}
        label="Email Address"
        error={touched.email ? errors.email : null}
        required
      >
        <input
          id={`${uid}-email`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur("email")}
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={touched.email && !!errors.email}
          aria-describedby={
            touched.email && errors.email ? `${uid}-email-error` : undefined
          }
          className={fieldStyle(
            "email",
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
          )}
          disabled={loading || success}
        />
      </AuthField>

      {/* ── Password ── */}
      <AuthField
        id={`${uid}-password`}
        label="Password"
        error={touched.password ? errors.password : null}
        hint="Min. 8 characters, one uppercase, one number."
        required
      >
        <div className="relative">
          <input
            id={`${uid}-password`}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            onBlur={() => handleBlur("password")}
            placeholder="••••••••"
            autoComplete="new-password"
            aria-invalid={touched.password && !!errors.password}
            aria-describedby={
              touched.password && errors.password
                ? `${uid}-password-error`
                : undefined
            }
            className={`${fieldStyle("password", !validatePassword(password))} pr-11`}
            disabled={loading || success}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
            tabIndex={-1}
            disabled={loading || success}
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>
        {/* Password strength bar — rendered here, inside the field */}
        <PasswordStrength
          strength={touched.password || password ? strength : 0}
        />
      </AuthField>

      {/* ── Confirm Password ── */}
      <AuthField
        id={`${uid}-confirm`}
        label="Confirm Password"
        error={touched.confirm ? errors.confirm : null}
        required
      >
        <div className="relative">
          <input
            id={`${uid}-confirm`}
            type={showConfirm ? "text" : "password"}
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
              if (touched.confirm) {
                setErrors((prev) => ({
                  ...prev,
                  confirm:
                    e.target.value !== password
                      ? "Passwords do not match."
                      : null,
                }));
              }
            }}
            onBlur={() => handleBlur("confirm")}
            placeholder="••••••••"
            autoComplete="new-password"
            aria-invalid={touched.confirm && !!errors.confirm}
            aria-describedby={
              touched.confirm && errors.confirm
                ? `${uid}-confirm-error`
                : undefined
            }
            className={`${fieldStyle("confirm", confirm === password && confirm !== "")} pr-11`}
            disabled={loading || success}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
            tabIndex={-1}
            disabled={loading || success}
          >
            <EyeIcon open={showConfirm} />
          </button>
        </div>
      </AuthField>

      {/* ── Terms notice ── */}
      <p className="text-xs text-zinc-600 leading-relaxed -mt-1">
        By creating an account you agree to our{" "}
        <Link
          href="/terms"
          className="text-zinc-500 hover:text-zinc-300 underline underline-offset-2 transition-colors"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="text-zinc-500 hover:text-zinc-300 underline underline-offset-2 transition-colors"
        >
          Privacy Policy
        </Link>
        .
      </p>

      {/* ── Submit button ── */}
      <button
        type="submit"
        disabled={loading || success}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#4f46e5] to-[#6366f1] text-white text-sm font-semibold py-3.5 shadow-lg shadow-indigo-500/20 hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-busy={loading}
      >
        {loading && <Spinner />}
        {loading
          ? "Creating account…"
          : success
            ? "Account created!"
            : "Create Account"}
      </button>

      {/* ── Divider ── */}
      <div className="flex items-center gap-3 -mx-1">
        <span className="flex-1 h-px bg-black/30 dark:bg-white/30" />
        <span className="text-xs text-zinc-700 shrink-0">or</span>
        <span className="flex-1 h-px bg-black/30 dark:bg-white/30" />
      </div>

      {/* ── Sign in link (secondary CTA inside card) ── */}
      <p className="text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-150 underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
