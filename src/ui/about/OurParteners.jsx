import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AboutSectionHeader from "./AboutSectionHeader";
import { useTranslation } from "react-i18next";

export default function OurParteners() {
  const { t } = useTranslation();
  return (
    <div className="our-parteners">
      <div className="container">
        <AboutSectionHeader
          title={t("about.ourPartnersTitle")}
          description={t("about.ourPartnersDescription")}
        />
        <Swiper
          spaceBetween={12}
          slidesPerView={5}
          loop={true}
          modules={[Autoplay]}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {Array(8)
            .fill()
            .map((_, i) => (
              <SwiperSlide key={i} style={{ height: "auto" }}>
                <div className="partner-box">
                  <img
                    src="/images/01.png"
                    alt={t(`about.partner${i + 1}Alt`)}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
