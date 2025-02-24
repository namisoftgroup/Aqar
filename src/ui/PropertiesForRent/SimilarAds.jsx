import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import { Autoplay } from "swiper/modules";
import PropertyCard from "../cards/PropertyCard";

export default function SimilarAds({ similarAds }) {
  const { t } = useTranslation();
  return (
    <section className="rates">
      <h4>{t("forRent.similarAds")}</h4>
      <Swiper
        spaceBetween={16}
        slidesPerView={3}
        loop={true}
        modules={[Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        {similarAds.map((ad) => (
          <SwiperSlide key={ad.id} style={{ height: "auto" }}>
            <PropertyCard ad={ad} className="bg_gray" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
