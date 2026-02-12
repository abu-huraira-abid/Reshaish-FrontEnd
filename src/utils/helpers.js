export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    currencyDisplay: "code",
    maximumFractionDigits: 0
  }).format(value || 0);

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
