import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function GuestNumberModal({
  showModal,
  setShowModal,
  setBookingData,
  adDetails,
}) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const [peopleNumber, setPeopleNumber] = useState({
    adults: 0,
    children: 0,
    baby: 0,
    with_pits: 0,
  });

  const maxValues = {
    adults: adDetails.max_adult_number,
    children: adDetails.max_children_number,
    baby: adDetails.max_baby_numbers,
    total: adDetails.max_people,
  };

  function handleIncrease(e, field) {
    e.preventDefault();
    setPeopleNumber((prev) => {
      const newValue = Number(prev[field]) + 1;
      const totalPeople = prev.adults + prev.children + prev.baby + 1;

      if (newValue > maxValues[field] || totalPeople > maxValues.total) {
        return prev;
      }

      return { ...prev, [field]: newValue };
    });
  }
  function handleDecrease(e, field) {
    e.preventDefault();
    setPeopleNumber((prev) => ({
      ...prev,
      [field]: Number(prev[field]) - 1 > 0 ? Number(prev[field]) - 1 : 0,
    }));
  }
  function handleChange(e) {
    setPeopleNumber((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  }
  function handleSaveChanges() {
    setBookingData((prev) => ({
      ...prev,
      ...peopleNumber,
    }));

    setPeopleNumber({
      adults: 0,
      children: 0,
      baby: 0,
      with_pits: 0,
    });
    setShowModal(false);
  }

  function handleCancel() {
    setShowModal(false);
    setPeopleNumber({
      adults: 0,
      children: 0,
      baby: 0,
      with_pits: 0,
    });
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
          <label className="label"> كم عدد الضيوف ؟</label>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="filter-field">
          <div>
            <div className="body">
              <div className="counter-field">
                <h6>
                  <span>{t("filter.adults")}</span>
                  <span>{t("filter.age")}</span>
                </h6>
                <div className="counter-input">
                  <button onClick={(e) => handleDecrease(e, "adults")}>
                    <i className="fa-regular fa-minus"></i>
                  </button>
                  <input
                    type="number"
                    value={peopleNumber.adults === 0 ? 0 : peopleNumber.adults}
                  />
                  <button onClick={(e) => handleIncrease(e, "adults")}>
                    <i className="fa-regular fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="counter-field">
                <h6>
                  <span>{t("filter.children")}</span>
                  <span> {t("filter.childrenAge")} </span>
                </h6>
                <div className="counter-input">
                  <button onClick={(e) => handleDecrease(e, "children")}>
                    <i className="fa-regular fa-minus"></i>
                  </button>
                  <input
                    type="number"
                    value={
                      peopleNumber.children === 0 ? 0 : peopleNumber.children
                    }
                  />
                  <button onClick={(e) => handleIncrease(e, "children")}>
                    <i className="fa-regular fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="counter-field">
                <h6>
                  <span>{t("filter.babbies")}</span>
                  <span>{t("filter.babbiesAge")}</span>
                </h6>
                <div className="counter-input">
                  <button onClick={(e) => handleDecrease(e, "baby")}>
                    <i className="fa-regular fa-minus"></i>
                  </button>
                  <input
                    type="number"
                    value={peopleNumber.baby === 0 ? 0 : peopleNumber.baby}
                  />
                  <button onClick={(e) => handleIncrease(e, "baby")}>
                    <i className="fa-regular fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="counter-field">
                <label>
                  <p className="pets-label"> {t("filter.pets")}</p>

                  <div className="pets-input">
                    <span> {t("filter.petsDes")}</span>
                    <input
                      onChange={handleChange}
                      type="checkbox"
                      value={
                        peopleNumber.with_pits === ""
                          ? 0
                          : peopleNumber.with_pits
                      }
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-filter-footer">
        <button type="button" className="btn-cancel" onClick={handleCancel}>
          {t("book.cancelEdit")}
        </button>
        <button onClick={handleSaveChanges} type="button" className="btn-apply">
          {t("book.saveChanges")}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
