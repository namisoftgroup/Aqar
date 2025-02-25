import { useState } from "react";
import FilterBox from "../ui/home/FilterBox";
import MapSection from "../ui/PropertiesForRent/MapSection";
import ListingSection from "./../ui/PropertiesForRent/ListingSection";

export default function ForRent() {
  const [viewMap, setViewMap] = useState(false);

  return (
    <>
      <div className="container pt-2 pb-2">
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
