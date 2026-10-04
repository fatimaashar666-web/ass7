import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { todayISO, addDaysISO } from "../utils/dates";

export default function SearchBar({ initial = {} }) {
  const navigate = useNavigate();
  const today = todayISO();
  const [destination, setDestination] = useState(initial.destination || "");
  const [checkIn, setCheckIn] = useState(initial.checkIn || addDaysISO(today, 1));
  const [checkOut, setCheckOut] = useState(initial.checkOut || addDaysISO(today, 3));
  const [guests, setGuests] = useState(initial.guests || 2);
  const [error, setError] = useState("");

  const onCheckIn = (value) => {
    setCheckIn(value);
    if (value >= checkOut) setCheckOut(addDaysISO(value, 1));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return setError("Choose check-in and check-out dates.");
    if (checkOut <= checkIn) return setError("Check-out must be after check-in.");
    setError("");
    const params = new URLSearchParams({ destination: destination.trim(), checkIn, checkOut, guests });
    navigate(`/search?${params}`);
  };

  return (
    <form className="searchbar" onSubmit={submit} noValidate>
      <label className="field grow">
        <span>Where to?</span>
        <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="City or hotel, e.g. Karachi" />
      </label>
      <label className="field">
        <span>Check-in</span>
        <input type="date" min={today} value={checkIn} onChange={(e) => onCheckIn(e.target.value)} />
      </label>
      <label className="field">
        <span>Check-out</span>
        <input type="date" min={addDaysISO(checkIn || today, 1)} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
      </label>
      <label className="field">
        <span>Guests</span>
        <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n} guest{n > 1 ? "s" : ""}</option>)}
        </select>
      </label>
      <button className="btn btn-primary" type="submit">Search</button>
      {error && <p className="form-error full" role="alert">{error}</p>}
    </form>
  );
}
