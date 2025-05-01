import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Calendar } from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { calculateNights, formatDateRange } from "../../utils/helper";
import {
  clearBooking,
  setDate,
  setDates,
} from "../../redux/slices/bookingSlice";

export default function DateModal({ showModal, setShowModal, per }) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const booking = useSelector((state) => state.booking);
  const dispatch = useDispatch();

  console.log("DateModal Rendered");
  console.log("per:", per);
  console.log("booking:", booking);

  // Determine the initial stored dates based on `per`
  let storedDates;
  if (per === "day") {
    storedDates =
      booking.from && booking.to
        ? [new Date(booking.from), new Date(booking.to)]
        : [];
  } else {
    storedDates = booking.date ? new Date(booking.date) : null;
  }
  console.log("storedDates:", storedDates);

  const [value, setValue] = useState(storedDates);
  const [nights, setNights] = useState(0);
  const [dateRange, setDateRange] = useState();

  useEffect(() => {
    console.log("useEffect triggered");
    console.log("value:", value);
    const locale = lang === "ar" ? "ar-EG" : "en-US";
    if (per === "day" && value?.length === 2) {
      const range = formatDateRange(value[0], value[1], locale);
      setDateRange(range);
      setNights(calculateNights(value[0], value[1]));
      console.log("Date range set:", range);
    } else if (per !== "day" && value) {
      const singleDate = formatDateRange(value, null, locale);
      setDateRange(singleDate);
      console.log("Single date set:", singleDate);
    }
  }, [value, lang, per]);

  function handleChange(selectedDates) {
    console.log("handleChange called");
    console.log("selectedDates:", selectedDates);

    if (
      !selectedDates ||
      (Array.isArray(selectedDates) && selectedDates.length === 0)
    ) {
      console.log("No dates selected");
      return;
    }

    if (per === "day") {
      const validDates = selectedDates.map((date) =>
        date instanceof Date ? date : new Date(date)
      );
      setValue(validDates);
      console.log("Range of dates set:", validDates);
    } else {
      const singleDate =
        selectedDates instanceof Date ? selectedDates : new Date(selectedDates);
      setValue(singleDate);
      console.log("Single date set:", singleDate);
    }
  }

  function handleSaveChanges() {
    console.log("handleSaveChanges called");
    console.log("value:", value);

    if (per === "day" && value.length === 2) {
      // Handle range selection for "day"
      dispatch(
        setDates({
          from: new Date(value[0]).toISOString(),
          to: new Date(value[1]).toISOString(),
        })
      );
      console.log("Dates saved for range:", value);
    } else if (per === "month" && value) {
      // Handle single date selection for "month"
      const fromDate = new Date(value);
      const toDate = new Date(fromDate.getTime() + 30 * 24 * 60 * 60 * 1000);
      console.log(toDate);

      dispatch(
        setDates({
          from: fromDate.toISOString(),
          to: toDate.toISOString(),
        })
      );
      dispatch(
        setDate({
          date: fromDate.toISOString(),
        })
      );
      console.log("Dates saved for month:", { from: fromDate, to: toDate });
    } else if (per === "year" && value) {
      // Handle single date selection for "year"
      const fromDate = new Date(value);
      const toDate = new Date(
        new Date(fromDate).setFullYear(fromDate.getFullYear() + 1)
      );
      dispatch(
        setDates({
          from: fromDate.toISOString(),
          to: toDate.toISOString(),
        })
      );
      dispatch(
        setDate({
          date: fromDate.toISOString(),
        })
      );
      console.log("Dates saved for year:", { from: fromDate, to: toDate });
    } else if (per !== "day" && value) {
      // Handle single date selection for other cases
      dispatch(
        setDate({
          date: new Date(value).toISOString(),
        })
      );
      console.log("Date saved for single date:", value);
    }

    setShowModal(false);
  }

  function handleCancel() {
    console.log("handleCancel called");
    setShowModal(false);
    dispatch(clearBooking());
    setValue(per === "day" ? [] : null);
    console.log("Modal closed and booking cleared");
  }

  return (
    <Modal
      className="filter-modal"
      show={showModal}
      size="md"
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton className={`${lang === "ar" ? "ar" : ""}`}>
        <Modal.Title>
          <label className="label">{t("filter.nightsNumber")}</label>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="filter-field">
          <div className="calender-container">
            {per === "day" && nights === 0 ? (
              <p>{t("book.pickDateMessage")}</p>
            ) : per === "day" ? (
              <>
                <h4>
                  {nights} {t("book.nights")}
                </h4>
                <p>{dateRange}</p>
              </>
            ) : (
              <p>{dateRange}</p>
            )}
            <Calendar
              range={per === "day"} // Enable range selection for "day"
              multiple={false} // Single date selection for "month" or "year"
              numberOfMonths={1}
              format="YYYY/MM/DD"
              value={value}
              onChange={handleChange}
              minDate={new Date()}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-filter-footer">
        <button type="button" className="btn-cancel" onClick={handleCancel}>
          {t("book.cancelEdit")}
        </button>
        <button type="button" onClick={handleSaveChanges} className="btn-apply">
          {t("book.saveChanges")}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
