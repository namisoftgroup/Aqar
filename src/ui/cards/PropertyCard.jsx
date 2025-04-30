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
                  event.stopPropagation(); // Prevent navigation
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
              <span>
                100 <i className="fa-sharp fa-light fa-bath"></i>
              </span>
              <span>
                5 <i className="fa-thin fa-bed-front"></i>
              </span>
              <span>
                3 <i className="fa-regular fa-couch"></i>
              </span>
              <span>
                3 <i className="fa-sharp fa-light fa-bath"></i>
              </span>
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
