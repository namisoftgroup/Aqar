import { useState } from "react";
import SelectField from "../form/SelectField";
import { useTranslation } from "react-i18next";
import SubmitButton from "../form/SubmitButton";
import FilterModal from "../modals/FilterModal";

export default function FilterBox() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="search-box">
      <form className="search-form">
        <SelectField
          value=""
          id="property-type"
          name="property-type"
          hiddenOption={{ value: "", label: t("home.city") }}
          options={[
            { value: "riyadh", label: "الرياض" },
            { value: "jeddah", label: "جدة" },
            { value: "dammam", label: "الدمام" },
            { value: "makkah", label: "مكة المكرمة" },
            { value: "madinah", label: "المدينة المنورة" },
            { value: "khobar", label: "الخبر" },
            { value: "taif", label: "الطائف" },
            { value: "abha", label: "أبها" },
          ]}
        />
        <SelectField
          value=""
          id="property-type"
          name="property-type"
          hiddenOption={{ value: "", label: t("home.propertyType") }}
          options={[
            { value: "studio", label: "إستودبو" },
            { value: "apartment", label: "شقة" },
            { value: "house", label: "فيلا" },
          ]}
        />
        <SubmitButton text={t("home.search")} img="/icons/search.svg" />
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
