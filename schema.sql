-- Tripolo schema. Run the whole file in Supabase > SQL Editor.
create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.hotels (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  description text,
  image_url text,
  rating numeric(2,1) check (rating between 0 and 10),
  price_per_night numeric not null check (price_per_night > 0),
  amenities jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id),          -- null for guest bookings
  hotel_id uuid not null references public.hotels(id),
  guest_name text not null,
  guest_email text not null,
  check_in date not null,
  check_out date not null,
  guests integer not null check (guests >= 1),
  total_price numeric not null,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled')),
  created_at timestamptz not null default now(),
  check (check_out > check_in)
);

-- Row Level Security
alter table public.users enable row level security;
alter table public.hotels enable row level security;
alter table public.bookings enable row level security;

-- Anyone can read hotels. Nobody can write them from the browser.
drop policy if exists "Public can read hotels" on public.hotels;
create policy "Public can read hotels" on public.hotels for select using (true);

-- users and bookings: NO direct policies for anon, so the browser cannot
-- read or write those tables directly. Access goes through the two
-- functions below, which run with controlled logic.

create or replace function public.create_booking(
  p_hotel_id uuid, p_guest_name text, p_guest_email text,
  p_check_in date, p_check_out date, p_guests integer
) returns public.bookings
language plpgsql security definer set search_path = public as $$
declare
  v_price numeric;
  v_row public.bookings;
begin
  if coalesce(trim(p_guest_name), '') = '' then raise exception 'Guest name is required'; end if;
  if p_guest_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' then raise exception 'A valid email is required'; end if;
  if p_check_in < current_date then raise exception 'Check-in cannot be in the past'; end if;
  if p_check_out <= p_check_in then raise exception 'Check-out must be after check-in'; end if;
  if p_guests < 1 then raise exception 'At least 1 guest is required'; end if;

  select price_per_night into v_price from hotels where id = p_hotel_id;
  if v_price is null then raise exception 'Hotel not found'; end if;

  insert into bookings (hotel_id, guest_name, guest_email, check_in, check_out, guests, total_price, status)
  values (p_hotel_id, trim(p_guest_name), lower(trim(p_guest_email)), p_check_in, p_check_out, p_guests,
          v_price * (p_check_out - p_check_in), 'confirmed')
  returning * into v_row;
  return v_row;
end $$;

-- A booking is looked up by its unguessable UUID (shown only on the confirmation page).
create or replace function public.get_booking(p_id uuid)
returns setof public.bookings
language sql security definer set search_path = public as $$
  select * from bookings where id = p_id;
$$;

revoke all on function public.create_booking(uuid,text,text,date,date,integer) from public;
revoke all on function public.get_booking(uuid) from public;
grant execute on function public.create_booking(uuid,text,text,date,date,integer) to anon, authenticated;
grant execute on function public.get_booking(uuid) to anon, authenticated;

-- Sample hotels
insert into public.hotels (name, location, description, image_url, rating, price_per_night, amenities) values
('Harbor View Grand','Karachi','Sea-facing rooms minutes from Clifton Beach, with a rooftop pool and all-day dining.','https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900',8.7,95,'["Free WiFi","Pool","Breakfast","Parking","Air conditioning"]'),
('Saddar Heritage Inn','Karachi','A restored colonial building in the heart of the old city, close to markets and museums.','https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900',8.1,58,'["Free WiFi","Breakfast","Airport shuttle","Air conditioning"]'),
('Lahore Garden Palace','Lahore','Courtyard suites and a spa, a short walk from the Walled City and Badshahi Mosque.','https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900',9.0,120,'["Free WiFi","Spa","Pool","Restaurant","Parking"]'),
('Skyline Marina Hotel','Dubai','Glass tower rooms with marina views, a gym and an infinity pool on the 40th floor.','https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900',9.2,210,'["Free WiFi","Infinity pool","Gym","Breakfast","Airport shuttle"]'),
('Bosphorus Pearl','Istanbul','Boutique stay on the water with Turkish breakfast served on a terrace over the strait.','https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900',8.8,150,'["Free WiFi","Breakfast","Terrace","Spa"]'),
('Maison Lumière','Paris','Small design hotel near the Seine, with quiet rooms and a bakery next door.','https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=900',8.5,185,'["Free WiFi","Breakfast","Bar","Pet friendly"]'),
('Coral Lagoon Resort','Maldives','Overwater villas, private reef snorkeling and sunset dinners on the sand.','https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900',9.5,420,'["Private beach","Pool","All meals","Snorkeling","Spa"]'),
('Margalla Hills Lodge','Islamabad','Mountain-view rooms with hiking trails starting at the door.','https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900',8.4,88,'["Free WiFi","Breakfast","Parking","Hiking trails"]');
