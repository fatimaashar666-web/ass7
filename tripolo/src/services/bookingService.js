import { getClient } from "./supabase";

// The database function validates input, calculates the total price and inserts the row.
export async function createBooking({ hotelId, guestName, guestEmail, checkIn, checkOut, guests }) {
  const { data, error } = await getClient().rpc("create_booking", {
    p_hotel_id: hotelId,
    p_guest_name: guestName,
    p_guest_email: guestEmail,
    p_check_in: checkIn,
    p_check_out: checkOut,
    p_guests: guests,
  });
  if (error) throw error;
  return data;
}

export async function getBookingById(id) {
  const { data, error } = await getClient().rpc("get_booking", { p_id: id });
  if (error) throw error;
  if (!data || data.length === 0) throw new Error("Booking not found");
  return data[0];
}
