import { useState } from "react";
import SelectField from "../form/SelectField";
import { useTranslation } from "react-i18next";
import SubmitButton from "../form/SubmitButton";
import FilterModal from "../modals/FilterModal";
import { useGetCities } from "../../hooks/useCities";
import { useGetAreas } from "../../hooks/useAreas";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/slices/filterSlice";
import { useGetCategories } from "../../hooks/categories/useCategories";
import { useNavigate, useSearchParams } from "react-router";
import { handleApplyFilters } from "../../utils/helper";

export default function FilterBox() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [targetCity, setTargetCity] = useState();
  const { cities } = useGetCities();
  const { categories } = useGetCategories();
  const { areas, isLoading: isAreaLoading } = useGetAreas(
    targetCity,
    Boolean(targetCity)
  );
  const [, setSearchParams] = useSearchParams();
  const formData = useSelector((state) => state.filter);
  const navigate = useNavigate();
  function handleCityChange(e) {
    setTargetCity(e.target.value);
    dispatch(setFilter({ city_id: e.target.value }));
  }

  function handleAreaChange(e) {
    const { name, value } = e.target;
    dispatch(setFilter({ [name]: value }));
  }
  function handleCategoryChange(e) {
    dispatch(setFilter({ category_id: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/for-rent");
    handleApplyFilters(setSearchParams, formData);
  }

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit} className="search-form">
        <SelectField
          value={targetCity}
          id="city"
          name="city"
          hiddenOption={{ value: "", label: t("home.city") }}
          onChange={handleCityChange}
          options={cities}
        />

        <SelectField
          value={formData.area_id}
          id="area"
          name="area_id"
          hiddenOption={{ value: "", label: t("home.area") }}
          options={areas}
          onChange={handleAreaChange}
          loading={isAreaLoading}
        />
        <SelectField
          value={formData.category_id}
          id="area"
          name="area_id"
          hiddenOption={{ value: "", label: t("home.propertyType") }}
          options={categories}
          onChange={handleCategoryChange}
        />

        <SubmitButton className="p-3" img="/icons/search.svg" />
        <button
          className="filter-btn"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          <img src="/icons/filter.svg" className="to_dark" alt="filter" />
        </button>
      </form>
      <FilterModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
