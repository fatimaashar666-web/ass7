# Tripolo – Hotel Booking Website

A responsive, colorful hotel booking site built with **React + Vite** and **Supabase**. Users can search hotels by destination, pick dates and guests, view details, book a stay, and see a confirmation. Bookings are stored in Supabase. The design is original, with a search-first layout in the style of big booking platforms.

## Technologies
React, Vite, JavaScript, CSS, Supabase, GitHub, Netlify, Claude Code

## 1. Set up Supabase

1. Create a free project at https://supabase.com.
2. Open **SQL Editor → New query**, paste all of `supabase/schema.sql`, and click **Run**.
   This creates the `users`, `hotels` and `bookings` tables, turns on Row Level Security, adds two secure functions (`create_booking`, `get_booking`), and inserts 8 sample hotels.
3. Open **Project Settings → API** and copy the **Project URL** and the **anon public** key.
4. Copy `.env.example` to `.env` and fill in your values:
   ```env
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```
   Never use the `service_role` key in this project.
5. Check it worked: **Table Editor → hotels** should list 8 rows.

### How the database works
- `hotels` is publicly readable (RLS policy) and not writable from the browser.
- `bookings.hotel_id → hotels.id`. `bookings.user_id → users.id` is optional, so guests can book without an account.
- `bookings` and `users` have RLS on and **no direct anon policies**, so the browser cannot list anyone's bookings.
- Bookings are created through `create_booking()`. It validates input, calculates `total_price` from the hotel's real nightly price, and inserts the row with status `confirmed`. The browser can't change the price.
- The confirmation page loads a booking with `get_booking(id)`. The booking ID is a random UUID shown only after booking.
- To see bookings, open **Table Editor → bookings** in the Supabase dashboard.

## 2. Run locally
```bash
npm install
npm run dev
```
Open http://localhost:5173.

## 3. Test the main flow
Home → search "Karachi" → open a hotel → Book now → fill the form → Confirm booking → check the confirmation page and the `bookings` table.
Also try: empty name, bad email, check-out before check-in (all should show messages), and a search for "zzz" (shows "No hotels found for this destination.").

## 4. Deploy
**GitHub**
```bash
git init && git add . && git commit -m "Initial Tripolo site"
git branch -M main
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```
`.env` is in `.gitignore`. Check that it isn't committed.

**Netlify**: Add new site → Import from GitHub. Build command `npm run build`, publish directory `dist` (both are set in `netlify.toml`). Under **Site configuration → Environment variables**, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then redeploy.

## Project structure
```
src/components  Navbar, Footer, SearchBar, HotelCard, HotelGrid, StateMessage
src/pages       Home, SearchResults, HotelDetailsPage, BookingPage, ConfirmationPage
src/services    supabase.js, hotelService.js, bookingService.js
src/utils       dates.js        src/hooks.js  useAsync loader hook
supabase/schema.sql             database, RLS, functions, sample data
```

## Claude Code changes (fill in as you work)
1. Created the initial React interface: home page, navigation, search bar, hotel cards.
2. Integrated Supabase: client, service layer, hotels loaded from the database.
3. Built the booking form with validation, the booking insert, and the confirmation page.

Errors found and fixed with Claude Code: _(add them here)_

## Links
- GitHub: _add link_
- Netlify: _add link_

## Known limits
- Availability: dates and guests are carried through the flow, but there is no per-room inventory, so hotels are not blocked when already booked.
- Hotel photos load from Unsplash. If a link breaks, the card shows a gradient instead.
