// ✅ Server Component — receives strength level as prop from client
/**
 * Props:
 *   strength: 0 | 1 | 2 | 3 | 4
 *   (0=empty, 1=weak, 2=fair, 3=good, 4=strong)
 */

const levels = [
  { label: "", color: "bg-zinc-800" },
  { label: "Weak", color: "bg-red-500" },
  { label: "Fair", color: "bg-orange-400" },
  { label: "Good", color: "bg-yellow-400" },
  { label: "Strong", color: "bg-emerald-500" },
];

export function PasswordStrength({ strength = 0 }) {
  if (strength === 0) return null;

  const current = levels[strength];

  return (
    <div className="flex flex-col gap-1.5 mt-1">
      {/* 4-segment bar */}
      <div className="flex gap-1" aria-hidden="true">
        {[1, 2, 3, 4].map((seg) => (
          <div
            key={seg}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${seg <= strength ? current.color : "bg-zinc-800"}`}
          />
        ))}
      </div>
      {/* Label */}
      <p className="text-xs text-zinc-500">
        Password strength:{" "}
        <span
          className={
            strength === 1
              ? "text-red-400 font-medium"
              : strength === 2
                ? "text-orange-400 font-medium"
                : strength === 3
                  ? "text-yellow-400 font-medium"
                  : "text-emerald-400 font-medium"
          }
        >
          {current.label}
        </span>
      </p>
    </div>
  );
}
