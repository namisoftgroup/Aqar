import { useState } from "react";
import FilterBox from "../ui/home/FilterBox";
import MapSection from "../ui/PropertiesForRent/MapSection";
import ListingSection from "./../ui/PropertiesForRent/ListingSection";

export default function ForRent() {
  const [viewMap, setViewMap] = useState(false);

  return (
    <>
      {/* {viewMap ? (
        <MapSection
          properties={ads?.data?.map((ad) => ({
            position: { lat: ad?.lat, lng: ad?.lng },
            price: ad.price,
            id: ad.id,
          }))}
          ads={ads}
          setViewMap={setViewMap}
        />
      ) : isLoading ? (
        <DataLoader />
      ) : (
        
      )} */}

      <div className="container">
        <FilterBox />
      </div>

      {viewMap ? (
        <MapSection setViewMap={setViewMap} />
      ) : (
        <ListingSection setViewMap={setViewMap} />
      )}
    </>
  );
}
