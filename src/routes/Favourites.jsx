import PropertyCard from "../ui/cards/PropertyCard";

export default function Favourites() {
  return (
    <section className="container my-5">
      <div className="row g-3">
        {Array(16)
          .fill()
          .map((_, index) => (
            <div key={index} className="col-md-6 col-lg-4 col-xxl-3">
              <PropertyCard />
            </div>
          ))}
      </div>
      <div className="pagination"></div>
    </section>
  );
}
