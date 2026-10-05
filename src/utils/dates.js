const toISO = (d) => d.toISOString().slice(0, 10);
export const todayISO = () => toISO(new Date());
export const addDaysISO = (iso, n) => {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return toISO(d);
};
export const nightsBetween = (a, b) =>
  a && b ? Math.round((new Date(b) - new Date(a)) / 86400000) : 0;
export const formatDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
export const money = (n) => "$" + Number(n).toLocaleString(undefined, { maximumFractionDigits: 0 });
