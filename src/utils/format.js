export const money = (n) =>
  "Rs. " + Number(n || 0).toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// booking dates are stored as UTC midnight, so show them in UTC to avoid off-by-one days
export const fmtDate = (d) =>
  new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

export const fmtDateTime = (d) => new Date(d).toLocaleString();

export const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);
