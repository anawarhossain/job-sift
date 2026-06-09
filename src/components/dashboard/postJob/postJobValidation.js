// ✅ Pure functions — no React, importable anywhere

/**
 * Validate the entire form state.
 * Returns: { [fieldName]: "error message" | null }
 * Only returns errors for fields that have a problem.
 */
export function validateJobForm(data) {
  const errors = {};

  // ── Job Info ──────────────────────────────────────────────
  if (!data.title.trim()) errors.title = "Job title is required.";
  else if (data.title.trim().length < 3)
    errors.title = "Title must be at least 3 characters.";
  else if (data.title.trim().length > 100)
    errors.title = "Title must be under 100 characters.";

  if (!data.category) errors.category = "Please select a category.";

  if (!data.type) errors.type = "Please select a job type.";

  if (!data.salaryMin && !data.salaryMax) {
    // Both empty — that's fine (optional)
  } else {
    const min = Number(data.salaryMin);
    const max = Number(data.salaryMax);
    if (data.salaryMin && isNaN(min))
      errors.salaryMin = "Must be a valid number.";
    if (data.salaryMax && isNaN(max))
      errors.salaryMax = "Must be a valid number.";
    if (
      !isNaN(min) &&
      !isNaN(max) &&
      data.salaryMin &&
      data.salaryMax &&
      min > max
    )
      errors.salaryMin = "Min salary cannot exceed max salary.";
  }

  if (!data.isRemote) {
    if (!data.city.trim()) errors.city = "City is required when not remote.";
    if (!data.country.trim())
      errors.country = "Country is required when not remote.";
  }

  if (!data.deadline) errors.deadline = "Application deadline is required.";
  else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(data.deadline);
    if (selected <= today) errors.deadline = "Deadline must be a future date.";
  }

  // ── Job Description ───────────────────────────────────────
  if (!data.responsibilities.trim())
    errors.responsibilities = "Responsibilities are required.";
  else if (data.responsibilities.trim().length < 30)
    errors.responsibilities = "Please provide more detail (min 30 characters).";

  if (!data.requirements.trim())
    errors.requirements = "Requirements are required.";
  else if (data.requirements.trim().length < 30)
    errors.requirements = "Please provide more detail (min 30 characters).";

  return errors;
}

/** Returns true if the errors object has no keys */
export function isFormValid(errors) {
  return Object.keys(errors).length === 0;
}

/** Validate a single field on blur */
export function validateField(fieldName, data) {
  const allErrors = validateJobForm(data);
  return allErrors[fieldName] ?? null;
}
