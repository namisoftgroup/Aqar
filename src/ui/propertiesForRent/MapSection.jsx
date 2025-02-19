import {
  GoogleMap,
  InfoWindow,
  Marker,
  OverlayView,
  useLoadScript,
} from "@react-google-maps/api";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import PropertyCard from "./../cards/PropertyCard";

export default function MapSection({ properties }) {
  const { t } = useTranslation();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const defaultPosition = { lat: 21.285407, lng: 39.237551 };

  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(8);
  const [userLocation, setUserLocation] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 1, 21));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 1, 0));

  const handleDetectLocation = useCallback(() => {
    if (!isLoaded) {
      alert("Google Maps API is not loaded yet.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const position = { lat: coords.latitude, lng: coords.longitude };
        setUserLocation(position);
        setZoom(12);
        if (map) {
          map.panTo(position);
        }
      },
      () => alert("Unable to retrieve your location.")
    );
  }, [isLoaded, map]);

  return (
    <section className="map_section_view">
      <div className="map">
        {isLoaded ? (
          <>
            <GoogleMap
              onLoad={setMap}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                zoomControl: false,
                fullscreenControl: false,
                gestureHandling: "greedy",
              }}
              zoom={zoom}
              center={userLocation || defaultPosition}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: "#4285F4",
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: "white",
                    strokeOpacity: 1,
                  }}
                />
              )}

              {properties?.map((property, index) => (
                <OverlayView
                  key={index}
                  position={property.position}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div
                    className="custom-marker"
                    onClick={() => setActiveMarker(index)}
                    style={{
                      position: "absolute",
                      transform: "translate(-50%, -100%)",
                    }}
                  >
                    <div className="marker-price">
                      {property.price} {t("sar")}
                    </div>
                  </div>
                </OverlayView>
              ))}

              {activeMarker !== null && (
                <InfoWindow
                  position={properties[activeMarker].position}
                  onCloseClick={() => setActiveMarker(null)}
                >
                  <PropertyCard />
                </InfoWindow>
              )}
            </GoogleMap>

            <div className="map-controls">
              <button className="control-btn" onClick={handleDetectLocation}>
                <i className="fa-solid fa-location-arrow"></i>
              </button>
              <button className="control-btn" onClick={handleZoomIn}>
                <i className="fa-regular fa-plus"></i>
              </button>
              <button className="control-btn" onClick={handleZoomOut}>
                <i className="fa-regular fa-minus"></i>
              </button>
            </div>
          </>
        ) : (
          <div className="map_loader">
            <i className="fa-regular fa-spinner fa-spin"></i>
          </div>
        )}
      </div>
    </section>
  );
}
