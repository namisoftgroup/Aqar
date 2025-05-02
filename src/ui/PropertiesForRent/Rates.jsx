import { useTranslation } from "react-i18next";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import GuestRateCard from "../cards/GuestRateCard";

import "swiper/css/pagination";

export default function Rates({ adRates }) {
  const { t } = useTranslation();

  return (
    <section className="rates">
      <h4>{t("forRent.rates")}</h4>
      <Swiper
        spaceBetween={10}
        loop={false}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          type: "bullets",
        }}
        slidesPerGroupAuto={false}
        breakpoints={{
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          450: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
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
// import { useMemo, useState } from "react";
// import { useTranslation } from "react-i18next";
// import GuestRateCard from "../cards/GuestRateCard";

// export default function Rates({ adRates }) {
//   const { t } = useTranslation();
//   const [currentPage, setCurrentPage] = useState(1);
//   const perPage = 5;

//   console.log(adRates);

//   const totalPages = Math.ceil(adRates?.length / perPage);

//   const currentRates = useMemo(() => {
//     const startIndex = (currentPage - 1) * perPage;

//     return adRates?.slice(startIndex, startIndex + perPage);
//   }, [adRates, currentPage]);

//   return (
//     <section className="rates">
//       <h4>{t("forRent.rates")}</h4>

//       <div className="row gap-4">
//         {currentRates.map((rate) => (
//           <div key={rate.id} className="col-12 col-sm-2 col-md-4 col-lg-3 ">
//             <GuestRateCard rate={rate} />
//           </div>
//         ))}
//         <div className="col-12 col-sm-2 col-md-4 col-lg-3 ">asdasdsad</div>
//         <div className="col-12 col-sm-2 col-md-4 col-lg-3 ">asdasdsad</div>
//         <div className="col-12 col-sm-2 col-md-4 col-lg-3 ">asdasdsad</div>
//         <div className="col-12 col-sm-2 col-md-4 col-lg-3 ">asdasdsad</div>
//         <div className="col-12 col-sm-2 col-md-4 col-lg-3 ">asdasdsad</div>
//         <div className="col-12 col-sm-2 col-md-4 col-lg-3 ">asdasdsad</div>
//         <div className="col-12 col-sm-2 col-md-4 col-lg-3 ">asdasdsad</div>
//         <div className="col-12 col-sm-2 col-md-4 col-lg-3 ">asdasdsad</div>
//         <div className="col-12 col-sm-2 col-md-4 col-lg-3 ">asdasdsad</div>
//       </div>

//       {totalPages > 1 && (
//         <div className="flex justify-center mt-4 gap-2">
//           {currentPage > 1 && (
//             <button
//               onClick={() => setCurrentPage(currentPage - 1)}
//               className="px-3 py-1 rounded border bg-gray-100"
//             >
//               {t("previous")}
//             </button>
//           )}

//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-3 py-1 rounded border ${
//                 currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-100"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}

//           {currentPage < totalPages && (
//             <button
//               onClick={() => setCurrentPage(currentPage + 1)}
//               className="px-3 py-1 rounded border bg-gray-100"
//             >
//               {t("next")}
//             </button>
//           )}
//         </div>
//       )}
//     </section>
//   );
// }
