import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import HotelGrid from "../components/HotelGrid";
import { Loading, ErrorMessage, Empty } from "../components/StateMessage";
import { getHotels } from "../services/hotelService";
import { useAsync } from "../hooks";

const DESTINATIONS = [
  ["Karachi", "#ff6b35"], ["Lahore", "#e4308a"], ["Dubai", "#2d7ff9"],
  ["Istanbul", "#00b8a9"], ["Paris", "#7b3fe4"], ["Maldives", "#ff9f1c"],
];

export default function Home() {
  const { loading, error, data } = useAsync(() => getHotels(4), []);
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Your next stay is a few taps away</h1>
          <p>Search hotels, pick your dates, and book in under a minute.</p>
          <SearchBar />
        </div>
      </section>

      <section className="container section">
        <h2>Popular destinations</h2>
        <div className="dest-row">
          {DESTINATIONS.map(([name, color]) => (
            <Link key={name} to={`/search?destination=${name}`} className="dest" style={{ background: color }}>
              {name}
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <h2>Featured hotels</h2>
        {loading && <Loading text="Loading hotels..." />}
        {error && <ErrorMessage text="Unable to load hotels. Please try again." />}
        {data && (data.length ? <HotelGrid hotels={data} /> : <Empty text="No hotels yet. Run supabase/schema.sql to add sample hotels." />)}
      </section>
    </>
  );
}
