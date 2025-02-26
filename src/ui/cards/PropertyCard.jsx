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
      <Link className="card-link" to={`/for-rent/${ad.id}`}>
        <div className="image_card">
          <img src={ad.image} />
        </div>
        <div className="card_info">
          <h2> {ad.title}</h2>
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
      </Link>
      {!hideFav && (
        <div className="fav-btn">
          {ad.is_favorite ? (
            <i
              onClick={handleDeleteFromFavorites}
              className="fa-solid fa-heart"
            ></i>
          ) : (
            <i onClick={handleAddToFavorites} className="fa-light fa-heart"></i>
          )}
        </div>
      )}
    </div>
  );
}
