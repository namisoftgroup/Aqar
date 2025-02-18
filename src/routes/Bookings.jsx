import { useGetBookings } from "../hooks/bookings/useGetBookings";
import MyBookingCard from "../ui/cards/MyBookingCard";
import DataLoader from "../ui/DataLoader";

export default function Bookings() {
  const { bookings, isLoading } = useGetBookings();

  if (isLoading) return <DataLoader />;
  return (
    <section className="container  my-5">
      <div className="row g-3">
        {bookings.map((booking) => (
          <div key={booking.id} className="col-md-6 col-lg-4 col-xxl-3">
            <MyBookingCard booking={booking} />
          </div>
        ))}
      </div>
    </section>
  );
}
