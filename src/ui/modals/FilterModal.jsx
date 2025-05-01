import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { setFilter } from "../../redux/slices/filterSlice";
import { handleApplyFilters } from "../../utils/helper";
import FilterCalender from "../home/FilterCalender";
import FilterGuests from "../home/FilterGuests";
import RangeSlider from "../RangeSlider";
import useGetPriceAdRange from "../../hooks/ads/useGetPriceAdRange";
import DataLoader from "../DataLoader";
import { useEffect } from "react";

export default function FilterModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  const formData = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ranges, isLoading } = useGetPriceAdRange();
  function handleSearch(e) {
    dispatch(setFilter({ search: e.target.value }));
  }

  const [, setSearchParms] = useSearchParams();

  function handleSliderChange(value) {
    dispatch(setFilter({ price_from: value[0], price_to: value[1] }));
  }
  useEffect(() => {
    dispatch(
      setFilter({ price_from: ranges?.min_price, price_to: ranges?.max_price })
    );
  }, [ranges, dispatch]);

  function handleSumit(e) {
    e.preventDefault();
    navigate("/for-rent");
    handleApplyFilters(setSearchParms, formData);
    setShowModal(false);
  }

  function resetFilters() {
    dispatch(
      setFilter({
        search: "",
        category_id: "",
        city_id: "",
        user_id: "",
        adult_number: "",
        children_number: "",
        baby_number: "",
        with_pits: "",
        area_id: "",
        from_date: "",
        to_date: "",
        price_from: ranges?.min_price,
        price_to: ranges.max_price,
      })
    );
    setSearchParms("");
    setShowModal(false);
  }
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
        <form onSubmit={handleSumit}>
          <div className="filter-field">
            <label className="label" htmlFor="search">
              {t("filter.search")}{" "}
            </label>
            <input
              value={formData.search}
              type="search"
              id="search"
              name="search"
              className="search-field"
              onChange={handleSearch}
              placeholder=""
            />
          </div>
          <div className="filter-field flex-row">
            {isLoading ? (
              <DataLoader />
            ) : (
              <RangeSlider
                min={ranges?.min_price}
                max={ranges?.max_price}
                steps={5}
                value={[formData.price_from, formData.price_to]}
                minType={t("sar")}
                maxType={t("sar")}
                handleSlide={(value) => handleSliderChange(value)}
              />
            )}
          </div>

          <div className="filter-field">
            <label className="label"> {t("filter.nightsNumber")} </label>
            <FilterCalender />
          </div>
          <div className="filter-field">
            <label className="label">{t("filter.guestNumber")} </label>
            <FilterGuests />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="modal-filter-footer">
        <button onClick={handleSumit} className="btn-apply">
          {t("home.search")}
        </button>
        <button onClick={resetFilters} className="btn-cancel">
          {t("home.deleteAll")}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
