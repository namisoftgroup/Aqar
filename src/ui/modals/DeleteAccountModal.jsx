import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useDeleteAccount from "../../hooks/account/useDeleteAccount";

export default function DeleteAccountModal({
  openDeleteModal,
  setOpenDeleteModal,
}) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const { deleteAccount, isLoading } = useDeleteAccount();
  const handleDelete = function () {
    setOpenDeleteModal(false);
    deleteAccount();
  };
  return (
    <Modal
      show={openDeleteModal}
      onHide={() => setOpenDeleteModal(false)}
      centered
      size="md"
    >
      <Modal.Header
        closeButton
        className={`delete-account-modal border-0 ${lang === "ar" ? "ar" : ""}`}
      >
        <Modal.Title>
          <h3>{t("profile.deleteAccount")}</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="delete-account-modal-body">
          <p>{t("profile.deleteAccountmessage")}</p>
          <div className="delete-account-modal-footer">
            <button
              onClick={() => setOpenDeleteModal(false)}
              className="cancel"
            >
              {t("cancel")}
            </button>
            <button className="delete" onClick={handleDelete}>
              {t("confirm")}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
