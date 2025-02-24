import { useGetFavorites } from "../hooks/favorites/useGetFavorites";
import PropertyCard from "../ui/cards/PropertyCard";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";

export default function Favourites() {
  const { favorites, isLoading } = useGetFavorites();

  if (isLoading) return <DataLoader />;
  if (favorites.length === 0) {
    return <EmptyData text="No favorites found" />;
  }
  return (
    <section className="container my-5">
      <div className="row g-3">
        {favorites.map((favourite) => (
          <div key={favourite.id} className="col-md-6 col-lg-4">
            <PropertyCard ad={favourite} className="bg_gray" />
          </div>
        ))}
      </div>
      <div className="pagination"></div>
    </section>
  );
}
