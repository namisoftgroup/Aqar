export const handleApplyFilters = (setSearchParams, searchFilterData) => {
  if (!searchFilterData) return;

  const newParams = new URLSearchParams();

  for (const [key, value] of Object.entries(searchFilterData)) {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value) && value.length > 0) {
        newParams.set(key, value.join("-"));
      } else if (!Array.isArray(value)) {
        newParams.set(key, value);
      }
    }
  }

  setSearchParams(newParams);
};

export function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1);
  const day = String(d.getDate());
  return `${year}-${month}-${day}`;
}

function getDaySuffix(day) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatDateRange(startDate, endDate, locale) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startDay = start.getDate();
  const endDay = end.getDate();

  const startSuffix = getDaySuffix(startDay);
  const endSuffix = getDaySuffix(endDay);

  const startFormatted = `${start.toLocaleDateString(locale, {
    weekday: "long",
  })}, ${startDay}${startSuffix} ${start.toLocaleDateString(locale, {
    month: "long",
  })}`;
  const endFormatted = `${end.toLocaleDateString(locale, {
    weekday: "long",
  })}, ${endDay}${endSuffix} ${end.toLocaleDateString(locale, {
    month: "long",
  })}`;

  return `${startFormatted} - ${endFormatted}`;
}
export function calculateNights(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function formateDateDetails(date, locale) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.toLocaleDateString(locale, { month: "long" });
  const day = String(d.getDate()).padStart(2, "0");
  return `${day} ${month} ${year}`;
}
