import { useMap } from "react-leaflet";

export default function ZoomControlButtons() {
  const map = useMap();

  const handleZoomIn = () => {
    const zoom = map.getZoom();
    map.setZoom(Math.min(zoom + 1, 21));
  };

  const handleZoomOut = () => {
    const zoom = map.getZoom();
    map.setZoom(Math.max(zoom - 1, 0));
  };

  return (
    <>
      <button className="control-btn" onClick={handleZoomIn}>
        <i className="fa-regular fa-plus"></i>
      </button>
      <button className="control-btn" onClick={handleZoomOut}>
        <i className="fa-regular fa-minus"></i>
      </button>
    </>
  );
}
