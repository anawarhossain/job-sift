"use client";

import { useState, useId } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { AuthField } from "./AuthField";
import { AuthMessage } from "./AuthMessage";

// ── Validation ────────────────────────────────────────────────
function validateEmail(v) {
  if (!v.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()))
    return "Please enter a valid email address.";
  return null;
}

function validatePassword(v) {
  if (!v) return "Password is required.";
  if (v.length < 8) return "Password must be at least 8 characters.";
  return null;
}

// ── Better-auth error code → friendly message ─────────────────
function mapAuthError(code, message) {
  const map = {
    INVALID_EMAIL_OR_PASSWORD: "Incorrect email or password. Please try again.",
    USER_NOT_FOUND:
      "No account found with this email. Would you like to sign up?",
    TOO_MANY_REQUESTS:
      "Too many attempts. Please wait a few minutes and try again.",
    EMAIL_NOT_VERIFIED:
      "Please verify your email before signing in. Check your inbox.",
  };
  return map[code] ?? message ?? "Something went wrong. Please try again.";
}

// ── Eye icon ──────────────────────────────────────────────────
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

// ── Success checkmark icon ────────────────────────────────────
function CheckIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

// ── Input base styles — single line, no cn() to avoid hydration mismatch ──
const inputBase =
  "w-full text-sm dark:text-zinc-200 text-zinc-900 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 rounded-xl border px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60";
const inputNormal =
  inputBase +
  " dark:border-white/[0.10] dark:hover:border-white/[0.30] border-black/[0.10] hover:border-black/[0.30]";
const inputError =
  inputBase +
  " border-red-500/40 focus:ring-red-500/20 focus:border-red-500/50";
const inputSuccess =
  inputBase + " border-emerald-500/30 focus:ring-emerald-500/20";

export function SignInForm() {
  const router = useRouter();
  const uid = useId();

  // ── Field values ──────────────────────────────────────────
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ── Validation state ──────────────────────────────────────
  const [errors, setErrors] = useState({ email: null, password: null });
  const [touched, setTouched] = useState({ email: false, password: false });

  // ── Form-level state ──────────────────────────────────────
  const [formMessage, setFormMessage] = useState({ type: null, text: null });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ── Validate single field ─────────────────────────────────
  const validateField = (field, value) => {
    const error =
      field === "email"
        ? validateEmail(value ?? email)
        : field === "password"
          ? validatePassword(value ?? password)
          : null;
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  // ── Submit ────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage({ type: null, text: null });

    // Mark all touched
    setTouched({ email: true, password: true });

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setErrors({ email: emailErr, password: passwordErr });
    if (emailErr || passwordErr) return;

    setLoading(true);
    try {
      const { data, error } = await authClient.signIn.email({
        email: email.trim().toLowerCase(),
        password,
        rememberMe,
      });

      if (error) {
        setFormMessage({
          type: "error",
          text: mapAuthError(error.code, error.message),
        });
        // Shake password field on wrong credentials
        if (error.code === "INVALID_EMAIL_OR_PASSWORD") {
          setPassword("");
          setErrors((prev) => ({ ...prev, password: null }));
          setTouched((prev) => ({ ...prev, password: false }));
        }
      } else {
        setSuccess(true);
        setFormMessage({
          type: "success",
          text: "Welcome back! Redirecting you…",
        });

        // ✅ Role-based redirect
        const role = data?.user?.role;
        setTimeout(() => {
          if (role === "Recruiter") router.push("/dashboard/recruiter");
          else if (role === "Seeker") router.push("/dashboard/seeker");
          else router.push("/");
          router.refresh();
        }, 1200);
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

  // ── Derive input styles ───────────────────────────────────
  const emailStyle =
    touched.email && errors.email
      ? inputError
      : touched.email &&
          !errors.email &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? inputSuccess
        : inputNormal;

  const passwordStyle =
    touched.password && errors.password
      ? inputError
      : touched.password && !errors.password && password.length >= 8
        ? inputSuccess
        : inputNormal;

  const isDisabled = loading || success;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* ── Form-level message ── */}
      <AuthMessage type={formMessage.type} message={formMessage.text} />

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
          onChange={(e) => {
            setEmail(e.target.value);
            if (touched.email) validateField("email", e.target.value);
          }}
          onBlur={() => handleBlur("email")}
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={!!(touched.email && errors.email)}
          aria-describedby={
            touched.email && errors.email ? `${uid}-email-error` : undefined
          }
          className={emailStyle}
          disabled={isDisabled}
        />
      </AuthField>

      {/* ── Password ── */}
      <AuthField
        id={`${uid}-password`}
        label="Password"
        error={touched.password ? errors.password : null}
        required
      >
        {/* Forgot password — right-aligned inside label row */}
        <div className="flex items-center justify-between -mt-1 mb-1.5">
          <span /> {/* spacer */}
          <Link
            href="/forgot-password"
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-150 underline underline-offset-4"
            tabIndex={isDisabled ? -1 : 0}
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <input
            id={`${uid}-password`}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (touched.password) validateField("password", e.target.value);
            }}
            onBlur={() => handleBlur("password")}
            placeholder="••••••••"
            autoComplete="current-password"
            aria-invalid={!!(touched.password && errors.password)}
            aria-describedby={
              touched.password && errors.password
                ? `${uid}-password-error`
                : undefined
            }
            className={passwordStyle + " pr-11"}
            disabled={isDisabled}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
            disabled={isDisabled}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>
      </AuthField>

      {/* ── Remember me ── */}
      <label className="flex items-center gap-3 cursor-pointer select-none group">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isDisabled}
            className="sr-only peer"
            id={`${uid}-remember`}
          />
          {/* Custom checkbox */}
          <div className="w-4 h-4 rounded border border-black/30 dark:border-zinc/30  peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all duration-150 flex items-center justify-center ">
            {rememberMe && (
              <svg
                className="w-2.5 h-2.5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            )}
          </div>
        </div>
        <span className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
          Remember me for 7 days
        </span>
      </label>

      {/* ── Submit button ── */}
      <button
        type="submit"
        disabled={isDisabled}
        aria-busy={loading}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#4f46e5] to-[#6366f1] text-white text-sm font-semibold py-3.5 shadow-lg shadow-indigo-500/20 hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        {loading && <Spinner />}
        {success && <CheckIcon />}
        {loading ? "Signing in…" : success ? "Signed in!" : "Sign In"}
      </button>

      {/* ── Divider ── */}
      <div className="flex items-center gap-3">
        <span className="flex-1 h-px bg-black/30 dark:bg-white/30" />
        <span className="text-xs text-zinc-700 shrink-0">or</span>
        <span className="flex-1 h-px bg-black/30 dark:bg-white/30" />
      </div>

      {/* ── Sign up link (secondary CTA inside card) ── */}
      <p className="text-center text-sm text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-150 underline underline-offset-4"
        >
          Create one free
        </Link>
      </p>
    </form>
  );
}
