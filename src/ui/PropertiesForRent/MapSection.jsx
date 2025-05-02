import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import PropertyCard from "./../cards/PropertyCard";
import { useGetAds } from "../../hooks/ads/useGetAds";
import ZoomControlButtons from "./ZoomControlsButtons";

// Fix leaflet's default marker icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Component to detect and center on user location
function DetectLocation({ setUserLocation, setShouldDetectLocation }) {
  const map = useMap();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const position = [coords.latitude, coords.longitude];
        setUserLocation(position);
        map.setView(position, 12);
        setShouldDetectLocation(false); // Reset trigger
      },
      () => {
        alert("Unable to retrieve your location.");
        setShouldDetectLocation(false); // Reset even on failure
      }
    );
  }, [map, setUserLocation, setShouldDetectLocation]);

  return null;
}

export default function MapSection({ setViewMap }) {
  const { t } = useTranslation();
  const defaultPosition = [21.285407, 39.237551];
  const { ads } = useGetAds();

  const [zoom, setZoom] = useState(10);
  const [userLocation, setUserLocation] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [shouldDetectLocation, setShouldDetectLocation] = useState(false);

  const properties = useMemo(() => {
    return (
      ads?.data?.map((ad) => ({
        position: [ad?.lat, ad?.lng],
        price: ad?.price,
        id: ad?.id,
        ad: ad,
      })) || []
    );
  }, [ads?.data]);

  const handleMarkerClick = (id) => {
    if (activeMarker === id) {
      // Trigger state change to force popup rerender
      setActiveMarker(null);
      setTimeout(() => setActiveMarker(id), 10);
    } else {
      setActiveMarker(id);
    }
  };

  return (
    <section className="map_section_view">
      <div className="map">
        <MapContainer
          center={properties.length ? properties[0].position : defaultPosition}
          zoom={zoom}
          zoomControl={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {shouldDetectLocation && (
            <DetectLocation
              setUserLocation={setUserLocation}
              setShouldDetectLocation={setShouldDetectLocation}
            />
          )}

          {userLocation && <Marker position={userLocation} />}

          {properties.map((property) => (
            <Marker
              key={property.id}
              position={property.position}
              eventHandlers={{
                click: () => handleMarkerClick(property.id),
              }}
              icon={
                new L.DivIcon({
                  className: "custom-marker",
                  html: `<div class="marker-price">${property.price} ${t(
                    "sar"
                  )}</div>`,
                  iconAnchor: [15, 30],
                })
              }
            />
          ))}

          {activeMarker && (
            <Popup
              position={
                properties.find((p) => p.id === activeMarker)?.position || []
              }
              onClose={() => setActiveMarker(null)}
            >
              <PropertyCard
                ad={ads?.data?.find((ad) => ad?.id === activeMarker)}
                hideFav={true}
              />
            </Popup>
          )}
          <div className="map-controls">
            <button
              className="control-btn"
              onClick={() => setShouldDetectLocation(true)}
            >
              <i className="fa-solid fa-location-arrow"></i>
            </button>
            <ZoomControlButtons />
          </div>
        </MapContainer>
      </div>

      <button className="view_map" onClick={() => setViewMap(false)}>
        <div className="icon">
          <img src="/icons/listing.svg" alt="map" />
        </div>
        {t("forRent.viewListing")}
      </button>
    </section>
  );
}

// import {
//   GoogleMap,
//   InfoWindow,
//   Marker,
//   OverlayView,
//   OverlayViewF,
//   useLoadScript,
// } from "@react-google-maps/api";
// import { useCallback, useMemo, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useGetAds } from "../../hooks/ads/useGetAds";
// import PropertyCard from "./../cards/PropertyCard";

// export default function MapSection({ setViewMap }) {
//   const { t } = useTranslation();

//   const { isLoaded } = useLoadScript({
//     // googleMapsApiKey: "AIzaSyCE46OXa1TZgWdjl5gGvV-Vap-ONwdQN1s",
//   });

//   const defaultPosition = { lat: 21.285407, lng: 39.237551 };
//   const { ads, isLoading } = useGetAds();

//   const [map, setMap] = useState(null);
//   const [zoom, setZoom] = useState(4);
//   const [userLocation, setUserLocation] = useState(null);
//   const [activeMarker, setActiveMarker] = useState(null);

//   const properties = useMemo(() => {
//     return (
//       ads?.data?.map((ad) => ({
//         position: { lat: ad?.lat, lng: ad?.lng },
//         price: ad?.price,
//         id: ad?.id,
//       })) || []
//     );
//   }, [ads?.data]);

//   const handleZoomIn = () => setZoom((prev) => Math.min(prev + 1, 21));
//   const handleZoomOut = () => setZoom((prev) => Math.max(prev - 1, 0));

//   const handleDetectLocation = useCallback(() => {
//     if (!isLoaded) {
//       alert("Google Maps API is not loaded yet.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       ({ coords }) => {
//         const position = { lat: coords.latitude, lng: coords.longitude };
//         setUserLocation(position);
//         setZoom(12);
//         if (map) {
//           map.panTo(position);
//         }
//       },
//       () => alert("Unable to retrieve your location.")
//     );
//   }, [isLoaded, map]);

//   return (
//     <section className="map_section_view">
//       <div className="map">
//         {isLoaded ? (
//           <>
//             <GoogleMap
//               onLoad={setMap}
//               options={{
//                 streetViewControl: false,
//                 mapTypeControl: false,
//                 zoomControl: false,
//                 fullscreenControl: false,
//                 gestureHandling: "greedy",
//               }}
//               zoom={zoom}
//               center={
//                 properties.length ? properties[0].position : defaultPosition
//               }
//               // center={userLocation || defaultPosition}
//               mapContainerStyle={{ width: "100%", height: "100%" }}
//             >
//               {userLocation && (
//                 <Marker
//                   position={userLocation}
//                   icon={{
//                     path: window.google.maps.SymbolPath.CIRCLE,
//                     scale: 10,
//                     fillColor: "#4285F4",
//                     fillOpacity: 1,
//                     strokeWeight: 2,
//                     strokeColor: "white",
//                     strokeOpacity: 1,
//                   }}
//                 />
//               )}

//               {properties?.map((property) => (
//                 <OverlayViewF
//                   key={property?.id}
//                   position={property?.position}
//                   mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
//                 >
//                   <div
//                     className="custom-marker"
//                     onClick={() => setActiveMarker(property?.id)}
//                     style={{
//                       position: "absolute",
//                       transform: "translate(-50%, -100%)",
//                     }}
//                   >
//                     <div className="marker-price">
//                       {property.price} {t("sar")}
//                     </div>
//                   </div>
//                 </OverlayViewF>
//               ))}

//               {activeMarker !== null && (
//                 <InfoWindow
//                   position={
//                     properties?.filter((ad) => ad?.id === activeMarker)[0]
//                       ?.position
//                   }
//                   onCloseClick={() => setActiveMarker(null)}
//                 >
//                   <PropertyCard
//                     ad={ads?.data?.filter((ad) => ad?.id === activeMarker)[0]}
//                     hideFav={true}
//                   />
//                 </InfoWindow>
//               )}
//             </GoogleMap>

//             <div className="map-controls">
//               <button className="control-btn" onClick={handleDetectLocation}>
//                 <i className="fa-solid fa-location-arrow"></i>
//               </button>
//               <button className="control-btn" onClick={handleZoomIn}>
//                 <i className="fa-regular fa-plus"></i>
//               </button>
//               <button className="control-btn" onClick={handleZoomOut}>
//                 <i className="fa-regular fa-minus"></i>
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="map_loader">
//             <i className="fa-regular fa-spinner fa-spin"></i>
//           </div>
//         )}
//       </div>

//       <button className="view_map" onClick={() => setViewMap(false)}>
//         <div className="icon">
//           <img src="/icons/listing.svg" alt="map" />
//         </div>
//         {t("forRent.viewListing")}
//       </button>
//     </section>
//   );
// }

// // import {
// //   GoogleMap,
// //   useLoadScript,
// //   Marker,
// //   InfoWindow,
// //   OverlayViewF,
// //   OverlayView,
// // } from "@react-google-maps/api";
// // import { useState, useCallback, useEffect, useMemo } from "react";
// // import { useTranslation } from "react-i18next";
// // import PropertyCard from "./../cards/PropertyCard";
// // import { useGetAds } from "../../hooks/ads/useGetAds";

// // export default function MapSection({ setViewMap }) {
// //   const { t } = useTranslation();

// //   const { isLoaded } = useLoadScript({
// //     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Secure API Key
// //   });

// //   const defaultPosition = { lat: 21.285407, lng: 39.237551 };
// //   const { ads } = useGetAds();

// //   const [map, setMap] = useState(null);
// //   const [zoom, setZoom] = useState(4);
// //   const [userLocation, setUserLocation] = useState(null);
// //   const [activeMarker, setActiveMarker] = useState(null);
// //   const [selectedAd, setSelectedAd] = useState(null);

// //   // Memoized property data for performance
// //   const properties = useMemo(() => {
// //     return (
// //       ads?.data?.map((ad) => ({
// //         position: { lat: ad?.lat, lng: ad?.lng },
// //         price: ad?.price,
// //         id: ad?.id,
// //       })) || []
// //     );
// //   }, [ads?.data]);

// //   const handleZoomIn = () => setZoom((prev) => Math.min(prev + 1, 21));
// //   const handleZoomOut = () => setZoom((prev) => Math.max(prev - 1, 0));

// //   const handleDetectLocation = useCallback(() => {
// //     if (!isLoaded) {
// //       alert(t("error.mapsNotLoaded"));
// //       return;
// //     }

// //     navigator.geolocation.getCurrentPosition(
// //       ({ coords }) => {
// //         const position = { lat: coords.latitude, lng: coords.longitude };
// //         setUserLocation(position);
// //         setZoom(12);
// //         map?.panTo(position);
// //       },
// //       (error) => {
// //         console.error("Location error:", error.message);
// //         alert(t("error.unableToRetrieveLocation"));
// //       }
// //     );
// //   }, [isLoaded, map, t]);

// //   const handleMarkerClick = (ad) => {
// //     setActiveMarker(ad.id);
// //     setSelectedAd(ad);
// //   };

// //   return (
// //     <section className="map_section_view">
// //       <div className="map">
// //         {isLoaded ? (
// //           <>
// //             <GoogleMap
// //               onLoad={setMap}
// //               options={{
// //                 mapTypeId: "terrain",
// //                 streetViewControl: false,
// //                 mapTypeControl: false,
// //                 zoomControl: false,
// //                 fullscreenControl: false,
// //                 gestureHandling: "greedy",
// //               }}
// //               zoom={zoom}
// //               center={
// //                 properties.length
// //                   ? properties[0].position
// //                   : { lat: 21.285407, lng: 39.237551 }
// //               }
// //               // center={userLocation || defaultPosition}
// //               mapContainerStyle={{ width: "100%", height: "100%" }}
// //             >
// //               {userLocation && (
// //                 <Marker
// //                   position={userLocation}
// //                   icon={{
// //                     path: window?.google?.maps?.SymbolPath?.CIRCLE || "",
// //                     scale: 10,
// //                     fillColor: "#4285F4",
// //                     fillOpacity: 1,
// //                     strokeWeight: 2,
// //                     strokeColor: "white",
// //                     strokeOpacity: 1,
// //                   }}
// //                 />
// //               )}

// //               {properties.map((property) => (
// //                 <OverlayViewF
// //                   key={property.id}
// //                   position={property.position}
// //                   mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
// //                 >
// //                   <div
// //                     className="custom-marker"
// //                     onClick={() => handleMarkerClick(property)}
// //                     style={{
// //                       position: "absolute",
// //                       transform: "translate(-50%, -100%)",
// //                       cursor: "pointer",
// //                     }}
// //                   >
// //                     <div className="marker-price">
// //                       {property.price} {t("sar")}
// //                     </div>
// //                   </div>
// //                 </OverlayViewF>
// //               ))}

// //               {activeMarker && selectedAd && (
// //                 <InfoWindow
// //                   position={selectedAd.position}
// //                   onCloseClick={() => {
// //                     setActiveMarker(null);
// //                     setSelectedAd(null);
// //                   }}
// //                 >
// //                   <PropertyCard ad={selectedAd} hideFav={true} />
// //                 </InfoWindow>
// //               )}
// //             </GoogleMap>

// //             <div className="map-controls">
// //               <button className="control-btn" onClick={handleDetectLocation}>
// //                 <i className="fa-solid fa-location-arrow"></i>
// //               </button>
// //               <button className="control-btn" onClick={handleZoomIn}>
// //                 <i className="fa-regular fa-plus"></i>
// //               </button>
// //               <button className="control-btn" onClick={handleZoomOut}>
// //                 <i className="fa-regular fa-minus"></i>
// //               </button>
// //             </div>
// //           </>
// //         ) : (
// //           <div className="map_loader">
// //             <i className="fa-regular fa-spinner fa-spin"></i>
// //           </div>
// //         )}
// //       </div>

// //       <button className="view_map" onClick={() => setViewMap(false)}>
// //         <div className="icon">
// //           <img src="/icons/listing.svg" alt="map" />
// //         </div>
// //         {t("forRent.viewListing")}
// //       </button>
// //     </section>
// //   );
// // }
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import PropertyCard from "./../cards/PropertyCard";
// import { useGetAds } from "../../hooks/ads/useGetAds";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// function DetectLocation({ setUserLocation }) {
//   const map = useMap();

//   const handleDetect = () => {
//     navigator.geolocation.getCurrentPosition(
//       ({ coords }) => {
//         const position = [coords.latitude, coords.longitude];
//         setUserLocation(position);
//         map.setView(position, 12);
//       },
//       () => alert("Unable to retrieve location")
//     );
//   };

//   useEffect(() => {
//     handleDetect();
//   }, []);

//   return null;
// }

// export default function MapSection({ setViewMap }) {
//   const { t } = useTranslation();
//   const defaultPosition = [21.285407, 39.237551];
//   const { ads } = useGetAds();

//   const [zoom, setZoom] = useState(10);
//   const [userLocation, setUserLocation] = useState(null);
//   const [activeMarker, setActiveMarker] = useState(null);

//   const properties = useMemo(() => {
//     return (
//       ads?.data?.map((ad) => ({
//         position: [ad?.lat, ad?.lng],
//         price: ad?.price,
//         id: ad?.id,
//         ad: ad,
//       })) || []
//     );
//   }, [ads?.data]);

//   const handleZoomIn = () => setZoom((z) => Math.min(z + 1, 21));
//   const handleZoomOut = () => setZoom((z) => Math.max(z - 1, 0));

//   return (
//     <section className="map_section_view">
//       <div className="map">
//         <MapContainer
//           center={properties.length ? properties[0].position : defaultPosition}
//           zoom={zoom}
//           style={{ height: "100%", width: "100%" }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution="&copy; OpenStreetMap contributors"
//           />

//           {userLocation && <Marker position={userLocation} />}

//           {properties.map((property) => (
//             <Marker
//               key={property.id}
//               position={property.position}
//               eventHandlers={{
//                 click: () => {
//                   setActiveMarker(property.id);
//                 },
//               }}
//               icon={
//                 new L.DivIcon({
//                   className: "custom-marker",
//                   html: `<div class="marker-price">${property.price} ${t(
//                     "sar"
//                   )}</div>`,
//                   iconAnchor: [15, 30],
//                 })
//               }
//             />
//           ))}

//           {activeMarker && (
//             <Popup
//               position={
//                 properties.find((p) => p.id === activeMarker)?.position || []
//               }
//               onClose={() => setActiveMarker(null)}
//             >
//               <PropertyCard
//                 ad={ads?.data?.find((ad) => ad?.id === activeMarker)}
//                 hideFav={true}

//               />
//             </Popup>
//           )}
//         </MapContainer>

//         <div className="map-controls">
//           <button className="control-btn" onClick={() => setUserLocation(true)}>
//             <i className="fa-solid fa-location-arrow"></i>
//           </button>
//           <button className="control-btn" onClick={handleZoomIn}>
//             <i className="fa-regular fa-plus"></i>
//           </button>
//           <button className="control-btn" onClick={handleZoomOut}>
//             <i className="fa-regular fa-minus"></i>
//           </button>
//         </div>
//       </div>

//       <button className="view_map" onClick={() => setViewMap(false)}>
//         <div className="icon">
//           <img src="/icons/listing.svg" alt="map" />
//         </div>
//         {t("forRent.viewListing")}
//       </button>
//     </section>
//   );
// }
