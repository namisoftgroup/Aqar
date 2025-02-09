import MyBookingCard from "../ui/cards/MyBookingCard";

export default function Bookings() {
  return (
    <section className="container  my-5">
      <div className="row g-3">
        {Array(8)
          .fill()
          .map((_, index) => (
            <div key={index} className="col-md-6 col-lg-4 col-xxl-3">
              <MyBookingCard />
            </div>
          ))}
      </div>
    </section>
  );
}
