import { Calendar } from "react-multi-date-picker";
export default function FilterCalender() {
  return (
    <div className="calender-container">
      <h4>6 ليله</h4>
      <p>ثلاثاء, 1 ابريل - اثنين , 7 ابريل</p>
      <Calendar
        range
        numberOfMonths={1}
        format="YYYY/MM/DD"
        className="custom-calendar"
      />
    </div>
  );
}
