import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import HotelGrid from "../components/HotelGrid";
import { Loading, ErrorMessage, Empty } from "../components/StateMessage";
import { getHotelsByDestination } from "../services/hotelService";
import { useAsync } from "../hooks";

export default function SearchResults() {
  const [params] = useSearchParams();
  const destination = params.get("destination") || "";
  const initial = {
    destination,
    checkIn: params.get("checkIn") || undefined,
    checkOut: params.get("checkOut") || undefined,
    guests: Number(params.get("guests")) || undefined,
  };
  const { loading, error, data } = useAsync(() => getHotelsByDestination(destination), [destination]);
  const carry = params.toString() ? `?${params}` : "";

  return (
    <>
      <section className="hero hero-small">
        <div className="container"><SearchBar key={params.toString()} initial={initial} /></div>
      </section>
      <section className="container section">
        <h2>{destination ? `Stays in ${destination}` : "All stays"}</h2>
        {loading && <Loading text="Loading hotels..." />}
        {error && <ErrorMessage text="Unable to load hotels. Please try again." />}
        {data && (data.length
          ? <><p className="muted">{data.length} hotel{data.length > 1 ? "s" : ""} found</p><HotelGrid hotels={data} search={carry} /></>
          : <Empty text="No hotels found for this destination." />)}
      </section>
    </>
  );
}
