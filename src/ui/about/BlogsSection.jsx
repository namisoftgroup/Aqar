import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "../cards/BlogCard";
import AboutSectionHeader from "./AboutSectionHeader";
import { Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";

export default function BlogsSection() {
  const { t } = useTranslation();
  return (
    <div className="blogs">
      <div className="container">
        <AboutSectionHeader
          title={t("about.blogTitle")}
          description={t("about.blogDescription")}
        />
        <Swiper
          spaceBetween={15}
          slidesPerView={3}
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
          }}
        >
          {Array(8)
            .fill()
            .map((_, i) => (
              <SwiperSlide key={i} style={{ height: "auto" }}>
                <BlogCard />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
