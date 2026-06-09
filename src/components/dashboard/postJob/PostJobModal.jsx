"use client";

import { useState, useEffect, useId, useCallback } from "react";
import { PostJobField } from "./PostJobField";
import {
  validateJobForm,
  validateField,
  isFormValid,
} from "./postJobValidation";
import {
  JOB_TYPES,
  JOB_CATEGORIES,
  CURRENCIES,
  INITIAL_FORM_STATE,
} from "./postJobConstants";

// ── Shared input class builders ───────────────────────────────
// Single-line strings — no hydration mismatch
const base =
  "w-full bg-[#111111] text-sm text-zinc-200 placeholder-zinc-600 rounded-xl border px-3.5 py-2.5 outline-none transition-all duration-150 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 disabled:opacity-50";
const normal = base + " border-white/[0.08] hover:border-white/[0.14]";
const errored =
  base + " border-red-500/40 focus:ring-red-500/20 focus:border-red-500/50";
const success = base + " border-emerald-500/25 focus:ring-emerald-500/15";

function inputCls(field, errors, touched, extraOk = true) {
  if (touched[field] && errors[field]) return errored;
  if (touched[field] && !errors[field] && extraOk) return success;
  return normal;
}

// ── Section heading ───────────────────────────────────────────
function SectionHeading({ step, title, subtitle }) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 text-xs font-bold shrink-0 mt-0.5">
        {step}
      </span>
      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

// ── Section divider ───────────────────────────────────────────
function SectionDivider() {
  return <hr className="border-none h-px bg-white/[0.05] my-6" />;
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

// ── Close icon ────────────────────────────────────────────────
function CloseIcon() {
  return (
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
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

// ── Main Modal ────────────────────────────────────────────────
export function PostJobModal({ isOpen, onClose, company }) {
  const uid = useId();

  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Reset when reopened
  useEffect(() => {
    if (isOpen) {
      setForm(INITIAL_FORM_STATE);
      setErrors({});
      setTouched({});
      setSubmitted(false);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (loading) return;
    onClose();
  }, [loading, onClose]);

  // ── Field change ──────────────────────────────────────────
  const set = (field, value) => {
    const next = { ...form, [field]: value };
    setForm(next);
    // Re-validate live after first touch
    if (touched[field]) {
      const err = validateField(field, next);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  // ── Blur ──────────────────────────────────────────────────
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, form);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  // ── Submit ────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields touched
    const allTouched = Object.keys(INITIAL_FORM_STATE).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {},
    );
    setTouched(allTouched);

    const newErrors = validateJobForm(form);
    setErrors(newErrors);
    if (!isFormValid(newErrors)) {
      // Scroll first error into view
      const firstErrField = Object.keys(newErrors)[0];
      document
        .getElementById(`${uid}-${firstErrField}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);

    // Build final payload
    const payload = {
      ...form,
      title: form.title.trim(),
      company: company ?? { name: "Your Company", plan: "Free", activeJobs: 0 },
      status: "active",
      postedAt: new Date().toISOString(),
      location: form.isRemote
        ? "Remote"
        : `${form.city.trim()}, ${form.country.trim()}`,
    };

    // Simulate async — real project-এ API call এখানে
    setTimeout(() => {
      console.log("📋 New Job Post Payload:", payload);
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (!isOpen) return null;

  // ── Plan limit check ──────────────────────────────────────
  const planLimit =
    { Free: 3, Growth: 10, Enterprise: 50 }[company?.plan ?? "Free"] ?? 3;
  const activeJobs = company?.activeJobs ?? 0;
  const limitReached = activeJobs >= planLimit;

  // ── Success screen ────────────────────────────────────────
  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        />
        <div className="relative z-10 w-full max-w-md bg-[#0e0e0e] border border-white/[0.08] rounded-2xl p-10 flex flex-col items-center gap-5 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-emerald-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Job posted!</h3>
            <p className="text-sm text-zinc-500 mt-1">
              <span className="text-white font-medium">{form.title}</span> is
              now live and visible to candidates.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-full rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#6366f1] text-white text-sm font-semibold py-3 hover:opacity-90 transition-opacity"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${uid}-modal-title`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full sm:max-w-2xl max-h-[95dvh] sm:max-h-[90dvh] flex flex-col bg-[#0e0e0e] border border-white/[0.08] sm:rounded-2xl rounded-t-2xl shadow-2xl shadow-black/60 overflow-hidden">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] shrink-0">
          <div>
            <h2
              id={`${uid}-modal-title`}
              className="text-base font-bold text-white"
            >
              Post a New Job
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {company?.name ?? "Your Company"}
              {company?.plan && (
                <span className="ml-2 px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-400 text-[10px] font-semibold uppercase tracking-wide">
                  {company.plan}
                </span>
              )}
              {company && (
                <span className="ml-2 text-zinc-600">
                  {activeJobs}/{planLimit} active jobs
                </span>
              )}
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            aria-label="Close modal"
            className="w-8 h-8 flex items-center justify-center rounded-xl text-zinc-500 hover:text-white hover:bg-white/[0.08] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <CloseIcon />
          </button>
        </div>

        {/* ── Plan limit warning ── */}
        {limitReached && (
          <div className="mx-6 mt-4 shrink-0 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.07] px-4 py-3">
            <svg
              className="w-4 h-4 text-amber-400 mt-0.5 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-amber-400">
              You&apos;ve reached your <strong>{company?.plan}</strong> plan
              limit of <strong>{planLimit}</strong> active jobs.{" "}
              <a
                href="/dashboard/recruiter/settings"
                className="underline underline-offset-2 hover:text-amber-300 transition-colors"
              >
                Upgrade your plan
              </a>{" "}
              to post more.
            </p>
          </div>
        )}

        {/* ── Scrollable form body ── */}
        <form
          id={`${uid}-form`}
          onSubmit={handleSubmit}
          noValidate
          className="flex-1 overflow-y-auto px-6 py-6 space-y-0"
        >
          {/* ════════════════════════════════════
              SECTION 1 — JOB INFO
          ════════════════════════════════════ */}
          <SectionHeading
            step="1"
            title="Job Info"
            subtitle="Basic details about the position."
          />

          {/* Title */}
          <div className="grid grid-cols-1 gap-4">
            <PostJobField
              id={`${uid}-title`}
              label="Job Title"
              error={touched.title ? errors.title : null}
              required
            >
              <input
                id={`${uid}-title`}
                type="text"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                onBlur={() => handleBlur("title")}
                placeholder="e.g. Senior Frontend Developer"
                maxLength={100}
                disabled={loading || limitReached}
                className={inputCls(
                  "title",
                  errors,
                  touched,
                  form.title.trim().length >= 3,
                )}
              />
            </PostJobField>
          </div>

          {/* Category + Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <PostJobField
              id={`${uid}-category`}
              label="Job Category"
              error={touched.category ? errors.category : null}
              required
            >
              <select
                id={`${uid}-category`}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                onBlur={() => handleBlur("category")}
                disabled={loading || limitReached}
                className={inputCls(
                  "category",
                  errors,
                  touched,
                  !!form.category,
                )}
              >
                <option value="">Select category…</option>
                {JOB_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </PostJobField>

            <PostJobField
              id={`${uid}-type`}
              label="Job Type"
              error={touched.type ? errors.type : null}
              required
            >
              <div className="flex flex-wrap gap-2 pt-0.5">
                {JOB_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      set("type", t);
                      setTouched((p) => ({ ...p, type: true }));
                    }}
                    disabled={loading || limitReached}
                    className={
                      form.type === t
                        ? "px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600/25 text-indigo-300 border border-indigo-500/40 transition-all"
                        : "px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 border border-white/[0.08] hover:border-white/[0.18] hover:text-zinc-200 transition-all"
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>
              {touched.type && errors.type && (
                <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1">
                  <svg
                    className="w-3 h-3 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.type}
                </p>
              )}
            </PostJobField>
          </div>

          {/* Salary */}
          <div className="mt-4">
            <p className="text-xs font-medium text-zinc-400 tracking-wide mb-2">
              Salary Range <span className="text-zinc-600">(optional)</span>
            </p>
            <div className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end">
              <PostJobField
                id={`${uid}-salaryMin`}
                label="Min"
                error={touched.salaryMin ? errors.salaryMin : null}
              >
                <input
                  id={`${uid}-salaryMin`}
                  type="number"
                  min={0}
                  value={form.salaryMin}
                  onChange={(e) => set("salaryMin", e.target.value)}
                  onBlur={() => handleBlur("salaryMin")}
                  placeholder="50,000"
                  disabled={loading || limitReached}
                  className={inputCls(
                    "salaryMin",
                    errors,
                    touched,
                    !!form.salaryMin,
                  )}
                />
              </PostJobField>

              <PostJobField
                id={`${uid}-salaryMax`}
                label="Max"
                error={touched.salaryMax ? errors.salaryMax : null}
              >
                <input
                  id={`${uid}-salaryMax`}
                  type="number"
                  min={0}
                  value={form.salaryMax}
                  onChange={(e) => set("salaryMax", e.target.value)}
                  onBlur={() => handleBlur("salaryMax")}
                  placeholder="90,000"
                  disabled={loading || limitReached}
                  className={inputCls(
                    "salaryMax",
                    errors,
                    touched,
                    !!form.salaryMax,
                  )}
                />
              </PostJobField>

              <PostJobField id={`${uid}-currency`} label="Currency">
                <select
                  id={`${uid}-currency`}
                  value={form.currency}
                  onChange={(e) => set("currency", e.target.value)}
                  disabled={loading || limitReached}
                  className={normal}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code}
                    </option>
                  ))}
                </select>
              </PostJobField>
            </div>
          </div>

          {/* Location */}
          <div className="mt-4">
            {/* Remote toggle */}
            <label className="flex items-center gap-3 cursor-pointer select-none group w-fit mb-3">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={form.isRemote}
                  onChange={(e) => set("isRemote", e.target.checked)}
                  disabled={loading || limitReached}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 rounded-full bg-white/[0.08] border border-white/[0.10] peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all duration-200" />
                <div className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white/40 peer-checked:bg-white peer-checked:translate-x-4 transition-all duration-200" />
              </div>
              <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">
                This is a fully remote position
              </span>
            </label>

            {!form.isRemote && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PostJobField
                  id={`${uid}-city`}
                  label="City"
                  error={touched.city ? errors.city : null}
                  required
                >
                  <input
                    id={`${uid}-city`}
                    type="text"
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    onBlur={() => handleBlur("city")}
                    placeholder="e.g. San Francisco"
                    disabled={loading || limitReached}
                    className={inputCls(
                      "city",
                      errors,
                      touched,
                      !!form.city.trim(),
                    )}
                  />
                </PostJobField>

                <PostJobField
                  id={`${uid}-country`}
                  label="Country"
                  error={touched.country ? errors.country : null}
                  required
                >
                  <input
                    id={`${uid}-country`}
                    type="text"
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                    onBlur={() => handleBlur("country")}
                    placeholder="e.g. United States"
                    disabled={loading || limitReached}
                    className={inputCls(
                      "country",
                      errors,
                      touched,
                      !!form.country.trim(),
                    )}
                  />
                </PostJobField>
              </div>
            )}
          </div>

          {/* Deadline */}
          <div className="mt-4">
            <PostJobField
              id={`${uid}-deadline`}
              label="Application Deadline"
              error={touched.deadline ? errors.deadline : null}
              required
              hint="Candidates won't be able to apply after this date."
            >
              <input
                id={`${uid}-deadline`}
                type="date"
                value={form.deadline}
                onChange={(e) => set("deadline", e.target.value)}
                onBlur={() => handleBlur("deadline")}
                min={
                  new Date(Date.now() + 86400000).toISOString().split("T")[0]
                }
                disabled={loading || limitReached}
                className={
                  inputCls("deadline", errors, touched, !!form.deadline) +
                  " [color-scheme:dark]"
                }
              />
            </PostJobField>
          </div>

          <SectionDivider />

          {/* ════════════════════════════════════
              SECTION 2 — JOB DESCRIPTION
          ════════════════════════════════════ */}
          <SectionHeading
            step="2"
            title="Job Description"
            subtitle="Tell candidates what the role involves."
          />

          {/* Responsibilities */}
          <PostJobField
            id={`${uid}-responsibilities`}
            label="Responsibilities"
            error={touched.responsibilities ? errors.responsibilities : null}
            required
            hint="Describe the day-to-day tasks. Use new lines for each point."
          >
            <textarea
              id={`${uid}-responsibilities`}
              value={form.responsibilities}
              onChange={(e) => set("responsibilities", e.target.value)}
              onBlur={() => handleBlur("responsibilities")}
              placeholder={
                "• Lead the frontend architecture decisions\n• Collaborate with designers and backend engineers\n• Mentor junior team members"
              }
              rows={5}
              disabled={loading || limitReached}
              className={
                inputCls(
                  "responsibilities",
                  errors,
                  touched,
                  form.responsibilities.trim().length >= 30,
                ) + " resize-none leading-relaxed"
              }
            />
          </PostJobField>

          {/* Requirements */}
          <div className="mt-4">
            <PostJobField
              id={`${uid}-requirements`}
              label="Requirements"
              error={touched.requirements ? errors.requirements : null}
              required
              hint="List must-have qualifications and skills."
            >
              <textarea
                id={`${uid}-requirements`}
                value={form.requirements}
                onChange={(e) => set("requirements", e.target.value)}
                onBlur={() => handleBlur("requirements")}
                placeholder={
                  "• 3+ years of experience with React\n• Proficiency in TypeScript\n• Strong communication skills"
                }
                rows={5}
                disabled={loading || limitReached}
                className={
                  inputCls(
                    "requirements",
                    errors,
                    touched,
                    form.requirements.trim().length >= 30,
                  ) + " resize-none leading-relaxed"
                }
              />
            </PostJobField>
          </div>

          {/* Benefits */}
          <div className="mt-4">
            <PostJobField
              id={`${uid}-benefits`}
              label="Benefits"
              hint="Optional — health insurance, equity, remote perks, etc."
            >
              <textarea
                id={`${uid}-benefits`}
                value={form.benefits}
                onChange={(e) => set("benefits", e.target.value)}
                placeholder={
                  "• Competitive salary & equity\n• Health, dental, and vision insurance\n• Flexible remote work policy"
                }
                rows={4}
                disabled={loading || limitReached}
                className={normal + " resize-none leading-relaxed"}
              />
            </PostJobField>
          </div>

          <SectionDivider />

          {/* ════════════════════════════════════
              SECTION 3 — COMPANY (auto-filled)
          ════════════════════════════════════ */}
          <SectionHeading
            step="3"
            title="Company"
            subtitle="Auto-filled from your registered company."
          />

          <div className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            {/* Company initial avatar */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold shrink-0">
              {(company?.name ?? "C")[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {company?.name ?? "Your Company"}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Plan:{" "}
                <span className="text-zinc-300 font-medium">
                  {company?.plan ?? "Free"}
                </span>
                <span className="mx-2 text-zinc-700">•</span>
                Active Jobs:{" "}
                <span
                  className={
                    activeJobs >= planLimit
                      ? "text-red-400 font-medium"
                      : "text-zinc-300 font-medium"
                  }
                >
                  {activeJobs}/{planLimit}
                </span>
              </p>
            </div>
            {/* Approved badge */}
            {company?.approved ? (
              <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wide shrink-0">
                <svg
                  className="w-2.5 h-2.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Approved
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wide shrink-0">
                Pending
              </span>
            )}
          </div>
        </form>

        {/* ── Footer — sticky ── */}
        <div className="shrink-0 flex items-center justify-between gap-3 px-6 py-4 border-t border-white/[0.06] bg-[#0a0a0a]">
          <p className="text-xs text-zinc-600">
            <span className="text-red-400">*</span> Required fields
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-400 border border-white/[0.08] hover:bg-white/[0.05] hover:text-zinc-200 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form={`${uid}-form`}
              disabled={loading || limitReached}
              aria-busy={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#4f46e5] to-[#6366f1] text-white shadow-lg shadow-indigo-500/20 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              {loading && <Spinner />}
              {loading ? "Posting…" : "Post Job"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
