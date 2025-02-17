import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/slices/filterSlice";

export default function FilterGuests() {
  const { t } = useTranslation();
  const formData = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  function handleIncrease(e, field) {
    e.preventDefault();
    dispatch(setFilter({ [field]: Number(formData[field]) + 1 }));
  }
  function handleDecrease(e, field) {
    e.preventDefault();
    dispatch(
      setFilter({
        [field]:
          Number(formData[field]) - 1 > 0 ? Number(formData[field]) - 1 : 0,
      })
    );
  }
  function handleChange(e) {
    dispatch(setFilter({ "with-pits": e.target.value }));
  }
  return (
    <div>
      <div className="body">
        <div className="counter-field">
          <h6>
            <span>{t("filter.adults")}</span>
            <span>{t("filter.age")}</span>
          </h6>
          <div className="counter-input">
            <button onClick={(e) => handleDecrease(e, "adult_number")}>
              <i className="fa-regular fa-minus"></i>
            </button>
            <input
              type="number"
              value={formData.adult_number === "" ? 0 : formData.adult_number}
            />
            <button onClick={(e) => handleIncrease(e, "adult_number")}>
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
            <button onClick={(e) => handleDecrease(e, "children_number")}>
              <i className="fa-regular fa-minus"></i>
            </button>
            <input
              type="number"
              value={
                formData.children_number === "" ? 0 : formData.children_number
              }
            />
            <button onClick={(e) => handleIncrease(e, "children_number")}>
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
            <button onClick={(e) => handleDecrease(e, "baby_number")}>
              <i className="fa-regular fa-minus"></i>
            </button>
            <input
              type="number"
              value={formData.baby_number === "" ? 0 : formData.baby_number}
            />
            <button onClick={(e) => handleIncrease(e, "baby_number")}>
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
                value={formData.with_pits === "" ? 0 : formData.with_pits}
              />
            </div>
          </label>
          {/* <button onClick={() => handleIncrease("with_pits")}>
              <i className="fa-regular fa-plus"></i>
            </button> */}
        </div>
      </div>
    </div>
  );
}
