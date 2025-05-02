export default function MapView({ lng, lat }) {
  return (
    <iframe
      src={`https://www.google.com/maps?q=${lat},${lng}&hl=en&z=16&output=embed`}
      width="100%"
      height="400"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}
