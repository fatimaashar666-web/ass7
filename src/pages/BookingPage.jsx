import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Loading, ErrorMessage } from "../components/StateMessage";
import { getHotelById } from "../services/hotelService";
import { createBooking } from "../services/bookingService";
import { useAsync } from "../hooks";
import { todayISO, addDaysISO, nightsBetween, money } from "../utils/dates";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function BookingPage() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const today = todayISO();
  const { loading, error, data: hotel } = useAsync(() => getHotelById(id), [id]);

  const [form, setForm] = useState({
    guestName: "",
    guestEmail: "",
    checkIn: params.get("checkIn") || addDaysISO(today, 1),
    checkOut: params.get("checkOut") || addDaysISO(today, 3),
    guests: Number(params.get("guests")) || 2,
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const nights = nightsBetween(form.checkIn, form.checkOut);
  const total = hotel && nights > 0 ? nights * hotel.price_per_night : 0;

  const validate = () => {
    const e = {};
    if (!form.guestName.trim()) e.guestName = "Enter the guest's full name.";
    if (!form.guestEmail.trim()) e.guestEmail = "Enter an email address.";
    else if (!EMAIL_RE.test(form.guestEmail.trim())) e.guestEmail = "Enter a valid email, like name@example.com.";
    if (!form.checkIn) e.checkIn = "Choose a check-in date.";
    else if (form.checkIn < today) e.checkIn = "Check-in cannot be in the past.";
    if (!form.checkOut) e.checkOut = "Choose a check-out date.";
    else if (form.checkOut <= form.checkIn) e.checkOut = "Check-out must be after check-in.";
    if (!(Number(form.guests) >= 1)) e.guests = "At least 1 guest is required.";
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    setSubmitError("");
    if (Object.keys(found).length) return;
    setSubmitting(true);
    try {
      const booking = await createBooking({
        hotelId: hotel.id,
        guestName: form.guestName.trim(),
        guestEmail: form.guestEmail.trim(),
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: Number(form.guests),
      });
      navigate(`/confirmation/${booking.id}`);
    } catch (err) {
      setSubmitError(err.message || "Booking failed. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading) return <div className="container"><Loading text="Loading hotel..." /></div>;
  if (error) return <div className="container"><ErrorMessage text="Unable to load this hotel. Please try again." /></div>;

  const Err = ({ name }) => (errors[name] ? <small className="form-error">{errors[name]}</small> : null);

  return (
    <div className="container section">
      <h1>Complete your booking</h1>
      <div className="details-grid">
        <form className="panel form" onSubmit={submit} noValidate>
          <label>Full name<input value={form.guestName} onChange={set("guestName")} autoComplete="name" /><Err name="guestName" /></label>
          <label>Email<input type="email" value={form.guestEmail} onChange={set("guestEmail")} autoComplete="email" /><Err name="guestEmail" /></label>
          <div className="row">
            <label>Check-in<input type="date" min={today} value={form.checkIn} onChange={set("checkIn")} /><Err name="checkIn" /></label>
            <label>Check-out<input type="date" min={addDaysISO(form.checkIn || today, 1)} value={form.checkOut} onChange={set("checkOut")} /><Err name="checkOut" /></label>
          </div>
          <label>Guests<input type="number" min="1" max="20" value={form.guests} onChange={set("guests")} /><Err name="guests" /></label>
          {submitError && <p className="form-error" role="alert">{submitError}</p>}
          <button className="btn btn-primary block" disabled={submitting}>{submitting ? "Booking..." : "Confirm booking"}</button>
        </form>

        <aside className="panel">
          <h3>Booking summary</h3>
          <p><strong>{hotel.name}</strong><br /><span className="muted">📍 {hotel.location}</span></p>
          <p>{money(hotel.price_per_night)} × {Math.max(nights, 0)} night{nights === 1 ? "" : "s"}</p>
          <p className="total">Total <strong>{money(total)}</strong></p>
        </aside>
      </div>
    </div>
  );
}
