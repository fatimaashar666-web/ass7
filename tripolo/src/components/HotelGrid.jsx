import HotelCard from "./HotelCard";

export default function HotelGrid({ hotels, search }) {
  return <div className="grid">{hotels.map((h) => <HotelCard key={h.id} hotel={h} search={search} />)}</div>;
}
