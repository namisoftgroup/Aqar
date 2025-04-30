import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Calendar } from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { calculateNights, formatDateRange } from "../../utils/helper";
import { clearBooking, setDates } from "../../redux/slices/bookingSlice";

export default function DateModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const booking = useSelector((state) => state.booking);
  const dispatch = useDispatch();

  const storedDates =
    booking.from && booking.to
      ? [new Date(booking.from), new Date(booking.to)]
      : [];

  const [value, setValue] = useState(storedDates);
  const [nights, setNights] = useState(0);
  const [dateRange, setDateRange] = useState();

  useEffect(() => {
    if (value.length === 2) {
      const locale = lang === "ar" ? "ar-EG" : "en-US";
      setDateRange(formatDateRange(value[0], value[1], locale));
      setNights(calculateNights(value[0], value[1]));
    }
  }, [value, lang]);

  function handleChange(selectedDates) {
    setValue(selectedDates);
  }

  function handleSaveChanges() {
    console.log(value);
    console.log(new Date(value[0]).toISOString());
    console.log(new Date(value[1]).toISOString());

    if (value.length === 2) {
      dispatch(
        setDates({
          from: new Date(value[0]).toISOString(),
          to: new Date(value[1]).toISOString(),
        })
      );
    }
    setShowModal(false);
  }

  function handleCancel() {
    setShowModal(false);
    dispatch(clearBooking());
    setValue([]);
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
            {nights === 0 ? (
              <p>{t("book.pickDateMessage")}</p>
            ) : (
              <>
                <h4>
                  {nights} {t("book.nights")}
                </h4>
                <p>{dateRange}</p>
              </>
            )}
            <Calendar
              range
              numberOfMonths={1}
              format="YYYY/MM/DD"
              className="custom-calendar"
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
