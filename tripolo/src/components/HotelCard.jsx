import { Link } from "react-router-dom";
import { money } from "../utils/dates";

export default function HotelCard({ hotel, search = "" }) {
  return (
    <article className="card">
      <div className="card-img">
        {hotel.image_url && <img src={hotel.image_url} alt={hotel.name} loading="lazy" onError={(e) => (e.currentTarget.style.display = "none")} />}
        <span className="rating">{Number(hotel.rating).toFixed(1)}</span>
      </div>
      <div className="card-body">
        <h3>{hotel.name}</h3>
        <p className="muted">📍 {hotel.location}</p>
        <p className="desc">{hotel.description}</p>
        <div className="card-foot">
          <div><strong className="price">{money(hotel.price_per_night)}</strong> <span className="muted">/ night</span></div>
          <Link className="btn btn-accent" to={`/hotel/${hotel.id}${search}`}>View details</Link>
        </div>
      </div>
    </article>
  );
}
