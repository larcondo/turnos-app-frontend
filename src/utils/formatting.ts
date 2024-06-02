import { MONTHS_ES, DAYS_ES } from "./constants";

export const formattedDateString = (f: string, cap: boolean = false) => {
  const [y, m, d] = f.split("-");

  const month_str = MONTHS_ES[Number(m) - 1];
  const day_str = DAYS_ES[new Date(f).getUTCDay()];

  const formatted = `${day_str}, ${d} de ${month_str} de ${y}`;

  return cap ? capitalizeFirstLetter(formatted) : formatted;
};

export const capitalizeFirstLetter = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1);
}