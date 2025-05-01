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
  const startDay = start.getDate();
  const startSuffix = getDaySuffix(startDay);
  const startFormatted = `${start.toLocaleDateString(locale, {
    weekday: "long",
  })}, ${startDay}${startSuffix} ${start.toLocaleDateString(locale, {
    month: "long",
  })}`;

  if (!endDate) {
    return startFormatted;
  }
  const end = new Date(endDate);

  const endDay = end.getDate();

  const endSuffix = getDaySuffix(endDay);

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

export function truncateText(text, charNumber = 80) {
  return text.length > charNumber
    ? text.substr(0, charNumber - 3) + "..."
    : text;
}

export const formatMessageTime = (timestamp) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  const timeStr = `${hours}:${minutesStr} ${ampm}`;
  return timeStr;
};

// Format recording time
export const formatRecordingTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};
// Extract file name from URL
export const extractTextAfterMessages = (url, fileName) => {
  const regex = /_messages\.(.*)/;
  const match = url.match(regex);
  return match ? match[1] : fileName;
};
