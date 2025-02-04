import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FilterCalender from "../home/FilterCalender";

export default function FilterModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  return (
    <Modal
      className="filter-modal"
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton className="">
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
          <div>
            <p>
              يسع هذا المنزل 2 ضيوفبخلاف الرضع و لا يسمح باحضار الحيوانات
              الاليفه
            </p>
            <p>
              اشار المضيف الي ن مسكنه يخختوي علي مميزات غير ملائمه للاطفالالصغار{" "}
              و اذا لازلت مهتما يرجى ارسال طلب حجز للمضيف للحصول علي المزيد من
              التفاصيل{" "}
            </p>
            <div className="body">
              <div className="counter-field">
                <h6>
                  <span>بالغون</span>
                  <span>العمر +13</span>
                </h6>
                <div className="counter-input">
                  <button>
                    <i className="fa-regular fa-minus"></i>
                  </button>
                  <input type="number" value={1} />
                  <button>
                    <i className="fa-regular fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="counter-field">
                <h6>
                  <span>الاطفال</span>
                  <span>الاعمار من 2 الي 12</span>
                </h6>
                <div className="counter-input">
                  <button>
                    <i className="fa-regular fa-minus"></i>
                  </button>
                  <input type="number" value={1} />
                  <button>
                    <i className="fa-regular fa-plus"></i>
                  </button>
                </div>
              </div>

              <div className="counter-field">
                <h6>
                  <span>الحيوانات الاليفه</span>
                  <span>هل ستحضر حيوانات اليفه</span>
                </h6>
                <div className="counter-input">
                  <button>
                    <i className="fa-regular fa-minus"></i>
                  </button>
                  <input type="number" value={1} />
                  <button>
                    <i className="fa-regular fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="counter-field">
                <h6>
                  <span>الرضع</span>
                  <span>اصغر من 2</span>
                </h6>
                <div className="counter-input">
                  <button>
                    <i className="fa-regular fa-minus"></i>
                  </button>
                  <input type="number" value={1} />
                  <button>
                    <i className="fa-regular fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
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
