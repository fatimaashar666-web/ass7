import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Loading, ErrorMessage } from "../components/StateMessage";
import { getHotelById } from "../services/hotelService";
import { useAsync } from "../hooks";
import { money, nightsBetween, formatDate } from "../utils/dates";

export default function HotelDetailsPage() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { loading, error, data: hotel } = useAsync(() => getHotelById(id), [id]);
  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");
  const nights = nightsBetween(checkIn, checkOut);
  const amenities = Array.isArray(hotel?.amenities) ? hotel.amenities : [];

  if (loading) return <div className="container"><Loading text="Loading hotel..." /></div>;
  if (error) return <div className="container"><ErrorMessage text="Unable to load this hotel. Please try again." /></div>;

  return (
    <div className="container section details">
      <button type="button" className="back" onClick={() => navigate(-1)}>← Back to results</button>
      <div className="details-grid">
        <div>
          <div className="details-img">{hotel.image_url && <img src={hotel.image_url} alt={hotel.name} onError={(e) => (e.currentTarget.style.display = "none")} />}</div>
          <h1>{hotel.name} <span className="rating inline">{Number(hotel.rating).toFixed(1)}</span></h1>
          <p className="muted">📍 {hotel.location}</p>
          <p>{hotel.description}</p>
          <h3>Amenities</h3>
          <ul className="chips">{amenities.map((a) => <li key={a}>{a}</li>)}</ul>
        </div>
        <aside className="panel">
          <p><strong className="price big">{money(hotel.price_per_night)}</strong> <span className="muted">/ night</span></p>
          {nights > 0 ? (
            <>
              <p className="avail">✔ Available for your dates</p>
              <p className="muted">{formatDate(checkIn)} → {formatDate(checkOut)} ({nights} night{nights > 1 ? "s" : ""})</p>
              <p>Estimated total: <strong>{money(nights * hotel.price_per_night)}</strong></p>
            </>
          ) : <p className="muted">Pick your dates on the booking page.</p>}
          <Link className="btn btn-primary block" to={`/book/${hotel.id}${params.toString() ? `?${params}` : ""}`}>Book now</Link>
        </aside>
      </div>
    </div>
  );
}
