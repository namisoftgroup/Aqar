import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FilterGuests from "../home/FilterGuests";

export default function GuestNumberModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  return (
    <Modal
      className="filter-modal"
      show={showModal}
      size="md"
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <label className="label"> كم عدد الضيوف ؟</label>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="filter-field">
          <FilterGuests />
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
