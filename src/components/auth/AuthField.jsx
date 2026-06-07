// ✅ Server Component — purely presentational, no state
// Client wrapper (AuthInputWrapper) handles the interactive eye-toggle for password

/**
 * Reusable form field component.
 * Props:
 *   id, label, error, hint, required, children (the actual <input> element)
 */
export function AuthField({ id, label, error, hint, required = false, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {/* Label */}
      <label
        htmlFor={id}
        className="text-xs font-medium text-zinc-400 tracking-wide"
      >
        {label}
        {required && <span className="text-indigo-400 ml-0.5" aria-hidden="true">*</span>}
      </label>

      {/* Input slot */}
      {children}

      {/* Error message */}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          aria-live="polite"
          className="flex items-center gap-1.5 text-xs text-red-400 mt-0.5"
        >
          {/* Error icon */}
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}

      {/* Hint (shown only when no error) */}
      {hint && !error && (
        <p className="text-xs text-zinc-600 mt-0.5">{hint}</p>
      )}
    </div>
  );
}