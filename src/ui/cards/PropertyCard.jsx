import { Link } from "react-router";

export default function PropertyCard({ ad }) {
  return (
    <Link to={`${ad.id}`}>
      <div className="properties">
        <div className="image_card">
          <img src={ad.image} />
          <button>
            {ad.isFavorite ? (
              <i className="fa-solid fa-heart"></i>
            ) : (
              <i className="fa-light fa-heart"></i>
            )}
          </button>
        </div>
        <div className="card_info">
          <h2> {ad.title}</h2>
          <section className="info">
            <p>
              <span>
                {" "}
                {ad.price} ريال / {ad.per}
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
    </Link>
  );
}
