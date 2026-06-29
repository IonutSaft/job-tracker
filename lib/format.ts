export const workTypeLabels: Record<string, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
};

const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
  CHF: "Fr",
  CNY: "¥",
  INR: "₹",
};

export function formatSalary(
  min: number | null,
  max: number | null,
  currency: string | null,
): string | null {
  const symbol = currency ? (currencySymbols[currency] ?? currency) : "$";

  if (min !== null && max !== null) {
    return `${symbol}${min.toLocaleString()} - ${symbol}${max.toLocaleString()}`;
  }
  if (min !== null) {
    return `${symbol}${min.toLocaleString()}+`;
  }
  if (max !== null) {
    return `Up to ${symbol}${max.toLocaleString()}`;
  }
  return null;
}
