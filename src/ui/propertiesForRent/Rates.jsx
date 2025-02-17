import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import GuestRateCard from "../cards/GuestRateCard";
import { Autoplay } from "swiper/modules";

export default function Rates({ adRates }) {
  const { t } = useTranslation();
  return (
    <section className="rates">
      <h4>{t("forRent.rates")}</h4>
      <Swiper
        spaceBetween={12}
        slidesPerView={4}
        loop={true}
        modules={[Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {adRates.map((rate) => (
          <SwiperSlide key={rate.key} style={{ height: "auto" }}>
            <GuestRateCard rate={rate} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
