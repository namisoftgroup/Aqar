import { useEffect, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/slices/filterSlice";
import {
  calculateNights,
  formatDate,
  formatDateRange,
} from "../../utils/helper";
export default function FilterCalender() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formData = useSelector((state) => state.filter);
  const lang = useSelector((state) => state.language.lang);

  const [nights, setNights] = useState(0);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const storedDates =
    formData.from_date && formData.to_date
      ? [new Date(formData.from_date), new Date(formData.to_date)]
      : [];
  const [value, setValue] = useState(storedDates);

  useEffect(() => {
    if (value.length === 2) {
      const fromDate = formatDate(value[0]);
      const toDate = formatDate(value[1]);
      const locale = lang === "ar" ? "ar-EG" : "en-US";

      const fromReadableDate = formatDateRange(value[0], value[1], locale);

      const nightsCount = calculateNights(value[0], value[1]);

      setDateRange({ from: fromReadableDate });
      setNights(nightsCount);
      dispatch(setFilter({ from_date: fromDate, to_date: toDate }));
    }
  }, [value, dispatch, lang]);

  function handleChange(selectedDates) {
    setValue(selectedDates);
  }

  return (
    <form className="calender-container">
      <div className="days_count">
        <h4>
          {nights} {t("filter.night")}{" "}
        </h4>
        <p>{dateRange.from}</p>
      </div>

      <Calendar
        range
        numberOfMonths={2}
        format="YYYY/MM/DD"
        className="custom-calendar"
        value={value}
        onChange={handleChange}
        minDate={new Date()}
      />
    </form>
  );
}
