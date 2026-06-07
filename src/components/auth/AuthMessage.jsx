// ✅ Server Component — purely presentational
/**
 * Top-level form message banner.
 * type: "error" | "success"
 */
export function AuthMessage({ type, message }) {
  if (!message) return null;

  const isError = type === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live="polite"
      className={
        isError
          ? "flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-400"
          : "flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-4 py-3 text-sm text-emerald-400"
      }
    >
      {/* Icon */}
      <span className="mt-0.5 shrink-0" aria-hidden="true">
        {isError ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
      <span>{message}</span>
    </div>
  );
}
