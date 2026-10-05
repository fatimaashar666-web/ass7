# Hotel Booking Website — Claude Code Instructions

## 1. Project Overview

Build a responsive hotel booking website inspired by modern hotel-booking platforms such as Booking.com, but with a completely original design, layout, branding, and user interface.

The website must allow users to:

1. Search for hotels.
2. Enter a destination/location.
3. Select check-in and check-out dates.
4. Select the number of guests.
5. View available hotels.
6. Open hotel details.
7. Enter booking information.
8. Submit a booking.
9. Store booking information in Supabase.
10. Display a booking confirmation after a successful booking.

The final project should be suitable for deployment through Netlify and stored in GitHub.

---

# 2. Required Technologies

Use the following technologies:

- React
- JavaScript
- HTML
- CSS
- Supabase
- GitHub
- Netlify
- Claude Code

Preferred frontend setup:

- React
- Vite
- Modern CSS

Use Supabase JavaScript client for communication with the Supabase backend.

---

# 3. Important Claude Code Workflow

Claude Code must be used throughout the development process.

Before making major changes:

1. Inspect the existing project structure.
2. Identify the current frontend technology and configuration.
3. Identify existing files and components.
4. Check whether Supabase is already configured.
5. Explain what needs to be changed before implementing major features.

Do not immediately overwrite an existing project.

First inspect the project.

Useful commands include:

```bash
pwd
ls
find . -maxdepth 2 -type f
```

On Windows, PowerShell alternatives may be used when appropriate.

---

# 4. CLAUDE.md Usage

This file is the main project instruction document.

Claude Code must follow the requirements in this file when:

- Creating components
- Modifying pages
- Creating Supabase integration
- Creating database queries
- Implementing booking functionality
- Fixing bugs
- Refactoring code
- Preparing the application for deployment

Do not remove or ignore these requirements unless explicitly instructed by the project owner.

---

# 5. Project Architecture

Prefer a clean component-based React structure.

Suggested structure:

```text
hotel-booking/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── SearchBar.jsx
│   │   ├── DestinationInput.jsx
│   │   ├── DateSelector.jsx
│   │   ├── GuestSelector.jsx
│   │   ├── HotelCard.jsx
│   │   ├── HotelGrid.jsx
│   │   ├── HotelDetails.jsx
│   │   ├── BookingForm.jsx
│   │   └── BookingConfirmation.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── SearchResults.jsx
│   │   ├── HotelDetailsPage.jsx
│   │   ├── BookingPage.jsx
│   │   └── ConfirmationPage.jsx
│   │
│   ├── services/
│   │   ├── supabase.js
│   │   ├── hotelService.js
│   │   └── bookingService.js
│   │
│   ├── hooks/
│   │
│   ├── context/
│   │
│   ├── utils/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .env.example
├── CLAUDE.md
├── package.json
└── README.md
```

The exact structure may be adjusted if the existing project already follows a different organization.

---

# 6. Design Requirements

Create an original hotel-booking interface.

Do NOT copy:

- Booking.com's exact layout
- Booking.com's branding
- Booking.com's logo
- Booking.com's exact colors
- Booking.com's copyrighted assets
- Booking.com's exact UI

The design should only be inspired by the general concept of a hotel booking platform.

Use an original brand name and visual identity.

The interface should feel:

- Modern
- Clean
- Professional
- Responsive
- Easy to navigate
- Suitable for desktop and mobile

---

# 7. Required Pages

## Home Page

The home page should include:

- Navigation bar
- Website logo/name
- Hero section
- Hotel search form
- Destination field
- Check-in date
- Check-out date
- Guest selector
- Search button
- Featured hotels
- Popular destinations
- Footer

---

## Search Results Page

Display hotels matching the search criteria.

Each hotel card should show:

- Hotel image
- Hotel name
- Location
- Rating
- Price per night
- Short description
- View details button

The search filters should be passed through the application state or URL query parameters.

---

## Hotel Details Page

Display:

- Hotel name
- Hotel images
- Location
- Rating
- Description
- Amenities
- Price
- Availability information
- Booking button

The selected hotel must be identifiable using its database ID.

---

## Booking Page

The booking page must contain:

- Selected hotel
- Guest name
- Guest email
- Check-in date
- Check-out date
- Number of guests
- Price information
- Booking summary
- Submit booking button

Validate required fields before submitting.

---

## Confirmation Page

After a successful booking:

Display:

- Confirmation message
- Booking ID
- Hotel name
- Guest name
- Check-in date
- Check-out date
- Number of guests
- Booking status
- Total price

Provide an option to return to the home page.

---

# 8. Supabase Integration

Use Supabase as the backend database.

Create a Supabase client in:

```text
src/services/supabase.js
```

Use environment variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Never hard-code Supabase credentials inside React components.

Create:

```text
.env
.env.example
```

The `.env` file must not be committed to GitHub.

Add `.env` to `.gitignore`.

---

# 9. Supabase Database Structure

Create the following tables.

## users

Store user information.

Suggested fields:

```text
id
name
email
created_at
```

If Supabase Authentication is used, prefer Supabase Auth for authentication and associate application user information with the authenticated user's ID.

---

## hotels

Store hotel information.

Suggested fields:

```text
id
name
location
description
image_url
rating
price_per_night
amenities
created_at
```

Suggested types:

```text
id              uuid
name            text
location        text
description     text
image_url       text
rating          numeric
price_per_night numeric
amenities       jsonb
created_at      timestamptz
```

---

## bookings

Store booking information.

Suggested fields:

```text
id
user_id
hotel_id
guest_name
guest_email
check_in
check_out
guests
total_price
status
created_at
```

Suggested types:

```text
id           uuid
user_id      uuid
hotel_id     uuid
guest_name   text
guest_email  text
check_in     date
check_out    date
guests       integer
total_price  numeric
status       text
created_at   timestamptz
```

Relationships:

```text
bookings.user_id → users.id
bookings.hotel_id → hotels.id
```

Default booking status:

```text
pending
```

After successful booking submission:

```text
confirmed
```

---

# 10. Database Security

Use appropriate Supabase Row Level Security (RLS).

Do not expose sensitive database operations to unauthenticated users.

Users should only be able to access booking records they are authorized to access.

Never place the Supabase service-role key in frontend code.

Only the public/anonymous Supabase key intended for frontend use may be exposed through Vite environment variables.

---

# 11. Hotel Search

The search functionality must support:

- Destination
- Check-in date
- Check-out date
- Number of guests

At minimum, destination filtering must work.

Example:

```text
Search destination:
Karachi
```

The application should retrieve hotels whose location matches the selected/search destination.

Do not fake successful searches if Supabase data is available.

---

# 12. Booking Logic

When a user submits a booking:

1. Validate the form.
2. Validate check-in date.
3. Validate check-out date.
4. Ensure check-out is after check-in.
5. Validate number of guests.
6. Retrieve the selected hotel.
7. Calculate the number of nights.
8. Calculate total price.
9. Insert the booking into Supabase.
10. Verify that the insert succeeded.
11. Display the booking confirmation.

Example calculation:

```text
number_of_nights =
check_out - check_in

total_price =
number_of_nights × hotel.price_per_night
```

Do not allow invalid dates.

Do not create a booking if:

```text
check_out <= check_in
```

---

# 13. Booking Status

Use clear booking statuses.

Recommended statuses:

```text
pending
confirmed
cancelled
```

For a successful booking:

```text
status = confirmed
```

Keep the implementation simple unless additional booking states are explicitly requested.

---

# 14. Form Validation

All forms must validate user input.

At minimum:

### Guest name

Required.

### Email

Required and must have a valid email format.

### Check-in

Required.

### Check-out

Required.

Must be after check-in.

### Guests

Required.

Must be at least 1.

Display clear validation messages.

Do not silently fail.

---

# 15. Loading and Error States

All Supabase requests must handle:

- Loading
- Success
- Empty results
- Error

Example:

```text
Loading hotels...
```

If no hotels are found:

```text
No hotels found for this destination.
```

If Supabase fails:

```text
Unable to load hotels. Please try again.
```

Booking errors should also be displayed clearly.

Never leave the user wondering whether an operation succeeded.

---

# 16. Responsive Design

The website must work on:

- Desktop
- Tablet
- Mobile

Pay particular attention to:

- Navigation
- Search form
- Hotel cards
- Hotel images
- Booking form
- Confirmation page

Avoid horizontal scrolling on mobile.

---

# 17. Reusable Components

Avoid putting the entire application into one React component.

Create reusable components for:

- Navigation
- Search
- Hotel cards
- Hotel lists
- Booking forms
- Buttons
- Loading states
- Error states

Components should have clear responsibilities.

---

# 18. Code Quality

Follow these rules:

- Use meaningful variable names.
- Use reusable functions.
- Avoid unnecessary duplication.
- Keep components reasonably small.
- Keep Supabase queries out of presentation components when practical.
- Put database-related operations in service files.
- Handle errors explicitly.
- Do not use hard-coded booking information.
- Do not use fake success messages for database operations.
- Do not commit secrets.
- Keep code readable.

---

# 19. Supabase Service Layer

Prefer database operations in service files.

For example:

```text
src/services/hotelService.js
```

can contain:

```javascript
getHotels()
getHotelsByDestination(destination)
getHotelById(id)
```

And:

```text
src/services/bookingService.js
```

can contain:

```javascript
createBooking()
getBookingById()
```

This keeps React components focused on UI and user interaction.

---

# 20. Error Handling

Every Supabase request must check for errors.

Example pattern:

```javascript
const { data, error } = await supabase
  .from("hotels")
  .select("*");

if (error) {
  throw error;
}

return data;
```

Do not ignore Supabase errors.

---

# 21. Meaningful Claude Code Changes

The project must demonstrate at least 3 meaningful changes made using Claude Code.

Document these changes in the README.

Suggested changes:

### Change 1 — Initial Website

Use Claude Code to create:

- Home page
- Navigation
- Search section
- Hotel cards

### Change 2 — Supabase Integration

Use Claude Code to:

- Configure Supabase
- Create service layer
- Retrieve hotels from Supabase
- Connect hotel listings to database data

### Change 3 — Booking System

Use Claude Code to:

- Create booking form
- Validate booking information
- Insert booking into Supabase
- Create confirmation page

Additional meaningful changes may include:

- Responsive mobile design
- Error handling
- Search improvements
- Authentication
- UI improvements
- Bug fixes

---

# 22. Claude Code Error-Fixing Requirement

Claude Code must also be used to identify and fix errors.

When an error occurs:

1. Reproduce the error.
2. Read the relevant error message.
3. Inspect the relevant source code.
4. Identify the root cause.
5. Make the smallest appropriate fix.
6. Run the application again.
7. Verify that the error is fixed.

Do not hide errors by removing functionality.

Document important fixes in the README.

---

# 23. Testing

Before considering the project complete, test:

### Home page

- Page loads successfully.
- Navigation works.
- Search form works.

### Search

- Destination can be entered.
- Dates can be selected.
- Guest count can be selected.
- Search returns appropriate hotels.

### Hotel details

- Correct hotel is displayed.
- Hotel information loads from Supabase.

### Booking

- Required fields are validated.
- Invalid dates are rejected.
- Guest count is validated.
- Booking can be submitted.
- Booking is inserted into Supabase.

### Confirmation

- Confirmation appears after successful booking.
- Booking information is displayed correctly.

### Responsive UI

Test:

- Desktop
- Tablet
- Mobile

---

# 24. GitHub Requirements

The project must be stored in GitHub.

Before committing:

Check:

```text
.env
```

is ignored.

Never commit:

```text
.env
```

or Supabase service-role credentials.

The repository should include:

```text
CLAUDE.md
README.md
package.json
src/
public/
.env.example
```

---

# 25. Netlify Deployment

The project should be deployable through Netlify.

For a Vite React application:

Build command:

```bash
npm run build
```

Publish directory:

```text
dist
```

Configure the required Supabase environment variables in Netlify.

Do not hard-code environment variables into source code.

---

# 26. README Requirements

The README must explain:

## Project

Brief description of the hotel booking website.

## Technologies

List:

- React
- Vite
- JavaScript
- CSS
- Supabase
- GitHub
- Netlify
- Claude Code

## Features

Explain:

- Hotel search
- Hotel listings
- Hotel details
- Booking
- Supabase storage
- Booking confirmation

## Supabase

Explain:

- Database tables
- Relationships
- How bookings are stored
- How hotel information is retrieved

## Claude Code

Explain at least 3 meaningful changes made using Claude Code.

Example:

```text
1. Created the initial React hotel booking interface.
2. Integrated Supabase and connected hotel listings to the database.
3. Implemented the booking form and booking confirmation workflow.
```

Also document important errors that Claude Code helped identify and fix.

## Deployment

Include:

- GitHub repository link
- Netlify website link

---

# 27. Required Submission Evidence

The final project should provide:

1. GitHub repository link.
2. Netlify live website link.
3. Supabase database screenshots.
4. CLAUDE.md file.
5. 3–5 screenshots showing Claude Code usage.
6. Short explanation of how Claude Code helped build the project.
7. Short explanation of how Supabase is used.

---

# 28. Claude Code Development Rules

When working on this project:

### First

Inspect the project.

### Second

Read this `CLAUDE.md`.

### Third

Explain the relevant implementation approach.

### Fourth

Implement the requested feature.

### Fifth

Run/build/test the application.

### Sixth

Fix any errors discovered.

### Seventh

Verify the feature manually.

### Eighth

Update documentation when appropriate.

Do not claim that a feature works without testing it.

---

# 29. Important Restrictions

Do not:

- Copy Booking.com's website.
- Copy Booking.com's source code.
- Copy Booking.com's exact visual design.
- Use Booking.com's logo or branding.
- Expose Supabase service-role credentials.
- Commit `.env`.
- Fake successful database operations.
- Store booking data only in frontend state.
- Ignore database errors.
- Remove functionality just to make errors disappear.

---

# 30. Definition of Done

The project is complete only when all of the following work:

- [ ] React website runs locally.
- [ ] Home page works.
- [ ] Hotel search works.
- [ ] Destination search works.
- [ ] Check-in selection works.
- [ ] Check-out selection works.
- [ ] Guest selection works.
- [ ] Hotels are loaded from Supabase.
- [ ] Hotel details work.
- [ ] Booking form works.
- [ ] Booking validation works.
- [ ] Booking is stored in Supabase.
- [ ] Booking status is stored.
- [ ] Booking confirmation works.
- [ ] Supabase database is configured.
- [ ] Supabase RLS/security is configured appropriately.
- [ ] Responsive design works.
- [ ] Errors are handled.
- [ ] Loading states are handled.
- [ ] `.env` is excluded from Git.
- [ ] `.env.example` exists.
- [ ] GitHub repository is updated.
- [ ] Netlify deployment works.
- [ ] README is complete.
- [ ] At least 3 meaningful Claude Code changes are documented.
- [ ] Claude Code was used to identify and fix errors.
- [ ] Required screenshots/evidence are collected.

---

# 31. Final Claude Code Instruction

Before declaring the project complete, review the entire application against this `CLAUDE.md` file.

Identify any missing requirements.

Fix missing functionality.

Run the application and verify the main user flow:

```text
Home
  ↓
Search
  ↓
Hotel Results
  ↓
Hotel Details
  ↓
Booking Form
  ↓
Supabase
  ↓
Booking Confirmation
```

The final result must be a working hotel booking application, not just a static UI.