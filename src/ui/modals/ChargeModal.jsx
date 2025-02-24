import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InputField from "../form/InputField";

export default function ChargeModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);

  function handleSubmit(event) {
    event.preventDefault();
    setShowModal(false);
  }
  return (
    <Modal
      className="charge-modal"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header className={`${lang === "ar" ? "ar" : ""}`} closeButton>
        <Modal.Title>{t("wallet.charge")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <InputField
            placeholder={`00 ${t("sar")}`}
            type="number"
            label={t("wallet.enterTheAmount")}
          />
          <button className="main-btn">{t("wallet.charge")}</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
