export function convertToLocaleStringToYYYYMMDD(localeString) {
  const date = new Date(localeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

export function convertDateStringToYYYYMMDD(dateString) {
  let date = new Date(Date.parse(dateString));
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);

  return date.toISOString().split("T")[0];
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
