import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { formatDate } from "../../utils/helper";
import { useEffect, useState } from "react";
import { setDates } from "../../redux/slices/bookingSlice"; // Import setDates action

export default function BookingSummary({
  bookingData,
  adDetails,
  setShowDateModal,
  setShowGuestModal,
  duration,
  setDuration,
}) {
  const dispatch = useDispatch(); 
  const booking = useSelector((state) => state.booking);
  const { t } = useTranslation();
  const [endDate, setEndDate] = useState(null);

  const totalNumber =
    bookingData.adults + bookingData.children + bookingData.baby;

  const handleAdd = () => {
    if (adDetails.per === "month") {
      setDuration((prev) => Math.min(prev + 1, 12));
    } else if (adDetails.per === "year") {
      setDuration((prev) => Math.min(prev + 1, 2));
    }
  };

  const handleSubtract = () => {
    setDuration((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    if (booking.date) {
      let newDate = new Date(booking.date);
      if (adDetails.per === "month") {
        newDate.setMonth(newDate.getMonth() + duration);
      } else if (adDetails.per === "year") {
        newDate.setFullYear(newDate.getFullYear() + duration);
      }
      setEndDate(newDate);

      dispatch(
        setDates({
          from: booking.date,
          to: newDate.toISOString().split("T")[0],
        })
      );
    }
  }, [booking.date, adDetails.per, duration, dispatch]);

  const renderDateRange = () => {
    if (adDetails.per === "day" && booking.from && booking.to) {
      return `${formatDate(booking.from)} - ${formatDate(booking.to)}`;
    }
    if (
      (adDetails.per === "month" || adDetails.per === "year") &&
      booking.from &&
      booking.to
    ) {
      return `${formatDate(booking.from)} - ${formatDate(booking.to)}`;
    }
    return null;
  };

  return (
    <div className="your-trip mt-3 mt-lg-0">
      <h4>{t("book.BookingRequestSummary")}</h4>
      <ul>
        {/* Dates Section */}
        <li>
          <div className="trip-data">
            <span>{t("dates")}</span>
            {(booking.from && booking.to) || booking.date ? (
              <>
                <span>{renderDateRange()}</span>
                {(adDetails?.per === "month" || adDetails?.per === "year") && (
                  <li>
                    <div className="duration-controls">
                      <button onClick={handleSubtract} className="btn-minus">
                        -
                      </button>
                      <span>{duration}</span>
                      <button onClick={handleAdd} className="btn-plus">
                        +
                      </button>
                    </div>
                  </li>
                )}
              </>
            ) : (
              <span>{t("noDatesSelected")}</span>
            )}
          </div>
          <button onClick={() => setShowDateModal(true)}>
            {t("book.edit")}
          </button>
        </li>

        {/* Guests Section */}
        <li>
          <div className="trip-data">
            <span>{t("guests")}</span>
            {totalNumber > 0 ? (
              <span>{totalNumber} ضيوف</span>
            ) : (
              <span>{t("noGuestsSelected")}</span>
            )}
          </div>
          <button onClick={() => setShowGuestModal(true)}>
            {t("book.edit")}
          </button>
        </li>
      </ul>
    </div>
  );
}
