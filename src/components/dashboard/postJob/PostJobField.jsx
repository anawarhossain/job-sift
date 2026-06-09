// ✅ Server Component — reusable field wrapper
// Same pattern as AuthField, tuned for dashboard dark style

export function PostJobField({
  id,
  label,
  error,
  required = false,
  hint,
  children,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {/* Label row */}
      <label
        htmlFor={id}
        className="flex items-center gap-1 text-xs font-medium text-zinc-400 tracking-wide"
      >
        {label}
        {required && (
          <span className="text-indigo-400" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {/* Input slot */}
      {children}

      {/* Error */}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          aria-live="polite"
          className="flex items-center gap-1.5 text-xs text-red-400"
        >
          <svg
            className="w-3 h-3 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      {/* Hint — only when no error */}
      {hint && !error && <p className="text-xs text-zinc-600">{hint}</p>}
    </div>
  );
}
