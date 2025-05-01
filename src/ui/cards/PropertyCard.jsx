import { Link } from "react-router";
import { useAddToFavorites } from "../../hooks/favorites/useAddToFavorites";
import { PER_AR, PER_EN } from "../../utils/constants";
import { useSelector } from "react-redux";
import { useDeleteFromFavorites } from "../../hooks/favorites/useDeleteFromFavorites";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Aos from "aos";

export default function PropertyCard({ ad, className, hideFav = false }) {
  const { addToFavorites } = useAddToFavorites();
  const { deleteFromFavorites } = useDeleteFromFavorites();

  const { t } = useTranslation();

  const lang = useSelector((state) => state.language.lang);

  function handleAddToFavorites() {
    addToFavorites(ad.id);
  }

  function handleDeleteFromFavorites() {
    deleteFromFavorites(ad.id);
  }

  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className={`properties ${className}`}>
      <div className="card-link">
        <Link
          to={`/for-rent/${ad.id}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        ></Link>
        <div className="image_card">
          <img src={ad.image} />
        </div>
        <div className="card_info">
          <div className="d-flex gap-3 justify-content-between">
            {" "}
            <h2> {ad.title}</h2>
            {!hideFav && (
              <div
                className="fav-btn"
                style={{ zIndex: 2 }}
                onClick={(event) => {
                  event.stopPropagation();
                  ad.is_favorite
                    ? handleDeleteFromFavorites()
                    : handleAddToFavorites();
                }}
              >
                {ad.is_favorite ? (
                  <i className="fa-solid fa-heart"></i>
                ) : (
                  <i className="fa-light fa-heart"></i>
                )}
              </div>
            )}
          </div>

          <section className="info">
            <p>
              <span>
                {ad.price} {t("sar")} /{" "}
                {lang === "ar" ? PER_AR[ad.per] : PER_EN[ad.per]}
              </span>
            </p>
            <div className="flat-details">
              {ad.filters &&
                ad.filters.length > 0 &&
                ad.filters
                  .filter(
                    (item) => item.value !== "yes" && item.value !== "true"
                  )
                  .map((item) => (
                    <span key={item.id}>
                      <img
                        src={item.filter.icon}
                        className="detail-item__icon"
                        alt=""
                      />
                      {item.value}
                    </span>
                  ))}
            </div>
            <p>
              <span> {ad.address} </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
