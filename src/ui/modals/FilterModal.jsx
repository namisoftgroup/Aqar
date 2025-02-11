import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FilterCalender from "../home/FilterCalender";
import FilterGuests from "../home/FilterGuests";
import { useSelector } from "react-redux";

export default function FilterModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  return (
    <Modal
      className="filter-modal"
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton className={`${lang === "ar" ? "ar" : ""}`}>
        {t("home.filter")}
      </Modal.Header>
      <Modal.Body className="modal-filter-body">
        <div className="filter-field">
          <label className="label" htmlFor="search">
            اين وجهتك؟
          </label>
          <input type="search" id="search" className="search-field" />
        </div>
        <div className="filter-field">
          <label className="label"> كم عدد الليالي ؟</label>
          <FilterCalender />
        </div>
        <div className="filter-field">
          <label className="label"> كم عدد الضيوف ؟</label>
          <FilterGuests />
        </div>
        <div className="filter-field">
          <label className="label">مطلبات الايجار ؟ </label>
          <div className="body  ">
            {" "}
            <label className="checkbox-field" htmlFor="premium-houses">
              <input type="checkbox" id="premium-houses" />
              <div>
                <span>منازل فاخره </span>
              </div>
            </label>
            <label className="checkbox-field" htmlFor="hotel-homes">
              <input type="checkbox" id="hotel-homes" />
              <div>
                <span>منازل فندقيه</span>
              </div>
            </label>
            <label className="checkbox-field" htmlFor="studio">
              <input type="checkbox" id="studio" />
              <div>
                <span>استوديو</span>
              </div>
            </label>
            <label className="checkbox-field" htmlFor="villa">
              <input type="checkbox" id="villa" />
              <div>
                <span>فيلا</span>
              </div>
            </label>
            <label className="checkbox-field" htmlFor="office">
              <input type="checkbox" id="office" />
              <div>
                <span>مكتب</span>
              </div>
            </label>
            <label className="checkbox-field" htmlFor="shared-rooms">
              <input type="checkbox" id="shared-rooms" />
              <div>
                <span>غرف مشتركه</span>
              </div>
            </label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-filter-footer">
        <button className="btn-apply">{t("home.search")}</button>
        <button className="btn-cancel">{t("home.deleteAll")}</button>
      </Modal.Footer>
    </Modal>
  );
}
