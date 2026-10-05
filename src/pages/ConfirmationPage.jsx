import { Link, useParams } from "react-router-dom";
import { Loading, ErrorMessage } from "../components/StateMessage";
import { getBookingById } from "../services/bookingService";
import { getHotelById } from "../services/hotelService";
import { useAsync } from "../hooks";
import { formatDate, money } from "../utils/dates";

export default function ConfirmationPage() {
  const { id } = useParams();
  const { loading, error, data } = useAsync(async () => {
    const booking = await getBookingById(id);
    const hotel = await getHotelById(booking.hotel_id);
    return { booking, hotel };
  }, [id]);

  if (loading) return <div className="container"><Loading text="Loading your booking..." /></div>;
  if (error) return <div className="container"><ErrorMessage text="We couldn't find this booking. Check the link and try again." /></div>;

  const { booking: b, hotel } = data;
  const rows = [
    ["Booking ID", b.id], ["Hotel", hotel.name], ["Guest", b.guest_name],
    ["Check-in", formatDate(b.check_in)], ["Check-out", formatDate(b.check_out)],
    ["Guests", b.guests], ["Status", b.status], ["Total price", money(b.total_price)],
  ];
  return (
    <div className="container section confirm">
      <div className="panel">
        <div className="tick">✓</div>
        <h1>Your booking is confirmed</h1>
        <p className="muted">Save your booking ID. You'll need it if you contact the hotel.</p>
        <dl>{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd className={k === "Status" ? "status" : ""}>{v}</dd></div>)}</dl>
        <Link className="btn btn-primary" to="/">Back to home</Link>
      </div>
    </div>
  );
}
