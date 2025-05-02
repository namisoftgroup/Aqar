import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InputField from "../form/InputField";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { Link } from "react-router";

export default function ChargeModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const [chargeValue, setChargeValue] = useState("");
  const [cookies] = useCookies(["token"]);
  const token = cookies?.token;
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
            value={chargeValue}
            onChange={(e) => setChargeValue(e.target.value)}
            label={t("wallet.enterTheAmount")}
          />{" "}
          <Link
            className="main-btn text-center"
            to={
              chargeValue === 0 || chargeValue === ""
                ? ""
                : `https://api.noot.com.sa/payment/${chargeValue}/wallet?Authorization=${token}&Redirect_url=${window.location.href}`
            }
          >
            {t("wallet.charge")}
          </Link>
        </form>
      </Modal.Body>
    </Modal>
  );
}
