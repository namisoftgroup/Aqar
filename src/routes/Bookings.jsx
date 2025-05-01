import { useTranslation } from "react-i18next";
import { useGetBookings } from "../hooks/bookings/useGetBookings";
import MyBookingCard from "../ui/cards/MyBookingCard";
import DataLoader from "../ui/DataLoader";
import SectionHeader from "../ui/SectionHeader";

export default function Bookings() {
  const { bookings, isLoading } = useGetBookings();
  const { t } = useTranslation();

  if (isLoading) return <DataLoader />;
  return (
    <>
      <SectionHeader link={"حجوزاتي"} />
      <section className="container  my-5">
        <div className="row g-3">
          {bookings?.map((booking) => (
            <div key={booking.id} className="col-md-6 col-lg-4 col-xxl-3">
              <MyBookingCard booking={booking} />
            </div>
          ))}
          {bookings?.length === 0 && (
            <div className="noData">{t("thereIsNoBookingsYet")}</div>
          )}
        </div>
      </section>
    </>
  );
}
