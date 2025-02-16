import { useTranslation } from "react-i18next";
import { Autoplay } from "swiper/modules";
import PropertyCard from "../cards/PropertyCard";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SimilarAds({ similarAds }) {
  const { t } = useTranslation();
  return (
    <section className="rates">
      <h4>{t("forRent.similarAds")}</h4>
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
        {similarAds.map((ad) => (
          <SwiperSlide key={ad.id} style={{ height: "auto" }}>
            <PropertyCard ad={ad} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
