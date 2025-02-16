import { useEffect, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/slices/filterSlice";
import {
  calculateNights,
  formatDate,
  formatDateRange,
} from "../../utils/helper";
export default function FilterCalender() {
  const formData = useSelector((state) => state.filter);
  const lang = useSelector((state) => state.language.lang);
  const dispatch = useDispatch();
  const [value, setValue] = useState([]);
  const [nights, setNights] = useState(0);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

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
    console.log(formData);
  }

  return (
    <form className="calender-container">
      <h4>{nights} ليله</h4>
      <p>{dateRange.from}</p>
      <Calendar
        range
        numberOfMonths={1}
        format="YYYY/MM/DD"
        className="custom-calendar"
        value={value}
        onChange={handleChange}
        minDate={new Date()}
      />
    </form>
  );
}
