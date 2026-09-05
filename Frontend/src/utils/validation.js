export function isRequired(value) {
  return value !== undefined && value !== null && String(value).trim() !== "";
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
}

export function isPositiveNumber(value) {
  return !Number.isNaN(Number(value)) && Number(value) >= 0;
}

export function inRange(value, min, max) {
  const n = Number(value);
  return !Number.isNaN(n) && n >= min && n <= max;
}

export function validatePassword(value) {
  return (value || "").length >= 8;
}
