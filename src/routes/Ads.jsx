import { useTranslation } from "react-i18next";
import Steps from "../ui/Ads/steps";
import InputField from "../ui/form/InputField";
import SelectField from "../ui/form/SelectField";

export default function Ads() {
  const { t } = useTranslation();
  return (
    <section className="ads">
      <div className="form-wrapper">
        <div className="ads-header">
          <div className="ads-title">
            <button>
              <i className="fa-solid  fa-chevron-left"></i>
            </button>
            <h3>أضف عقارك</h3>
          </div>
          <p>
            <span>1</span> / 6
          </p>
        </div>
        <div>
          <Steps />
          <div>
            <form>
              <div className="row g-3">
                <div className="col-6">
                  <SelectField
                    value=""
                    id="property-type"
                    name="property-type"
                    placeholder={"enter"}
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
                </div>
                <div className="col-6">
                  <SelectField />
                </div>
                <div className="col-6">
                  <SelectField />
                </div>
                <div className="col-12">
                  <InputField label={"اسم العقار"} />
                </div>
                <div className="col-12">
                  <label>الوصف</label>
                  <textarea></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="banner-wrapper">
        <img className="banner1" src="/images/house2.jpg" />
        <img className="banner2" src="" />
      </div>
    </section>
  );
}
