import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function GuestNumberModal({
  showModal,
  setShowModal,
  setBookingData,
  bookingData,
  adDetails,
}) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);

  const [tempData, setTempData] = useState({
    ...bookingData,
    adults: bookingData.adults > 0 ? bookingData.adults : 1,
  });

  useEffect(() => {
    if (showModal) {
      setTempData({
        ...bookingData,
        adults: bookingData.adults > 0 ? bookingData.adults : 1,
      });
    }
  }, [showModal, bookingData]);

  const maxValues = {
    adults: adDetails.max_adult_number,
    children: adDetails.max_children_number,
    baby: adDetails.max_baby_numbers,
    total: adDetails.max_people,
  };

  const totalPeople = tempData.adults + tempData.children + tempData.baby;

  const handleIncrease = (field) => {
    if (tempData[field] < maxValues[field] && totalPeople < maxValues.total) {
      setTempData((prev) => ({ ...prev, [field]: prev[field] + 1 }));
    }
  };

  const handleDecrease = (field) => {
    setTempData((prev) => ({
      ...prev,
      [field]:
        field === "adults"
          ? Math.max(1, prev[field] - 1)
          : Math.max(0, prev[field] - 1),
    }));
  };

  const handlePetsToggle = () => {
    setTempData((prev) => ({
      ...prev,
      with_pits: prev.with_pits === 1 ? 0 : 1,
    }));
  };

  const handleSaveChanges = () => {
    setBookingData({ ...tempData });
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setBookingData({
      adults: 1,
      children: 0,
      baby: 0,
      with_pits: 0,
    });
  };

  const renderCounter = (label, subtitle, field) => (
    <div className="counter-field">
      <h6>
        <span>{label}</span>
        <span>{subtitle}</span>
      </h6>
      <div className="counter-input">
        <button onClick={() => handleDecrease(field)}>
          <i className="fa-regular fa-minus"></i>
        </button>
        <input type="number" value={tempData[field]} readOnly />
        <button onClick={() => handleIncrease(field)}>
          <i className="fa-regular fa-plus"></i>
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      className="filter-modal"
      show={showModal}
      size="md"
      onHide={handleCancel}
    >
      <Modal.Header closeButton className={lang === "ar" ? "ar" : ""}>
        <Modal.Title>
          <label className="label">{t("guestCountTitle")}</label>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="filter-field">
          <div className="body">
            {renderCounter(t("filter.adults"), t("filter.age"), "adults")}
            {renderCounter(
              t("filter.children"),
              t("filter.childrenAge"),
              "children"
            )}
            {renderCounter(t("filter.babbies"), t("filter.babbiesAge"), "baby")}

            <div className="counter-field flex-column align-items-start">
              <label className="pets-label" htmlFor="with_pets">
                {t("filter.pets")}
              </label>
              <div className="pets-input d-flex align-items-center gap-2">
                <span>{t("filter.petsDes")}</span>
                <input
                  type="checkbox"
                  checked={!!tempData.with_pits}
                  onChange={handlePetsToggle}
                  id="with_pets"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-filter-footer">
        <button type="button" className="btn-cancel" onClick={handleCancel}>
          {t("book.cancelEdit")}
        </button>
        <button type="button" className="btn-apply" onClick={handleSaveChanges}>
          {t("book.saveChanges")}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
