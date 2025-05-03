import { useTranslation } from "react-i18next";
import GuestRateCard from "../cards/GuestRateCard";

import "swiper/css/pagination";
import CustomPagination from "../CustomPagination";

export default function Rates({ adRates }) {
  const { t } = useTranslation();


  return (
    <section className="mt-5">
      <h4>{t("forRent.rates")}</h4>
      <div className="row g-0">
        {adRates.map((rate) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-4 p-2" key={rate.id}>
            <GuestRateCard rate={rate} />
          </div>
        ))}
      </div>
      {adRates?.total > 4 && (
        <CustomPagination count={adRates?.total} pageSize={4} />
      )}
    </section>
  );
}
