import Gallary from "../ui/propertiesForRent/Gallary";
import { useTranslation } from "react-i18next";
import Owner from "../ui/propertiesForRent/owner";
import Features from "../ui/propertiesForRent/Features";
import PropertyInfo from "../ui/propertiesForRent/PropertyInfo";
import Rates from "../ui/propertiesForRent/Rates";
import SimilaerAds from "../ui/propertiesForRent/SimilaerAds";
import MapSection from "../ui/propertiesForRent/MapSection";

export default function ForRentDetails() {
  const { t } = useTranslation();
  return (
    <section className="for-rent-details">
      <section className="container">
        <Gallary />
        <div className="row">
          <div className="col-8">
            <Owner />
            <div className="description">
              <h4>{t("forRent.desc")}</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                auctor sollicitudin purus, non consectetur velit fringilla vel.
                Sed vel ligula sit amet velit consectetur posuere. Donec non est
                vel nunc facilisis vulputate. Sed vel neque auctor, ullamcorper
                urna vel, consequat felis. Nulla facilisi. Aliquam non justo id
                justo consectetur cursus. Donec id convallis nunc. Donec et
                ipsum vel velit consequat lobortis. Donec vel neque auctor,
                ullamcorper urna vel,
              </p>
            </div>
            <Features />
          </div>
          <div className="col-4">
            <PropertyInfo />
          </div>
        </div>
        <div className="map-container">
          <h4>{t("forRent.location")}</h4>
          <p>شارع الحمسه،حي الرياض،</p>
          <MapSection />
        </div>
        <Rates />
        <SimilaerAds />
      </section>
    </section>
  );
}
