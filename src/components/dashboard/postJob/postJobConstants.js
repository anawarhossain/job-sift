// ✅ Pure data — server ও client উভয়ে import করা যাবে

export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Remote",
  "Contract",
  "Internship",
];

export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Product & Management",
  "Marketing & Growth",
  "Sales & Business Dev",
  "Finance & Accounting",
  "HR & People Ops",
  "Legal & Compliance",
  "Customer Support",
  "Data & Analytics",
  "DevOps & Infrastructure",
  "Other",
];

export const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD — US Dollar" },
  { code: "EUR", symbol: "€", label: "EUR — Euro" },
  { code: "GBP", symbol: "£", label: "GBP — British Pound" },
  { code: "BDT", symbol: "৳", label: "BDT — Bangladeshi Taka" },
  { code: "INR", symbol: "₹", label: "INR — Indian Rupee" },
  { code: "CAD", symbol: "$", label: "CAD — Canadian Dollar" },
  { code: "AUD", symbol: "$", label: "AUD — Australian Dollar" },
  { code: "SGD", symbol: "$", label: "SGD — Singapore Dollar" },
  { code: "AED", symbol: "د.إ", label: "AED — UAE Dirham" },
];

export const PLAN_JOB_LIMITS = {
  Free: 3,
  Growth: 10,
  Enterprise: 50,
};

// Empty initial form state — single source of truth
export const INITIAL_FORM_STATE = {
  // Job Info
  title: "",
  category: "",
  type: "",
  salaryMin: "",
  salaryMax: "",
  currency: "USD",
  isRemote: false,
  city: "",
  country: "",
  deadline: "",
  // Job Description
  responsibilities: "",
  requirements: "",
  benefits: "",
};
