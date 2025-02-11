import { Modal } from "react-bootstrap";
import FilterCalender from "../home/FilterCalender";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function DateModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  return (
    <Modal
      className="filter-modal"
      show={showModal}
      size="md"
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton className={`${lang === "ar" ? "ar" : ""}`}>
        <Modal.Title>
          {" "}
          <label className="label"> كم عدد الليالي ؟</label>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="filter-field">
          <FilterCalender />
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-filter-footer">
        <button
          type="button"
          className="btn-cancel"
          onClick={() => Modal.getInstance().hide()}
        >
          {t("book.cancelEdit")}
        </button>
        <button type="button" className="btn-apply">
          {t("book.saveChanges")}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
