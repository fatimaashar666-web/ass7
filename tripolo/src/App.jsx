import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import HotelDetailsPage from "./pages/HotelDetailsPage";
import BookingPage from "./pages/BookingPage";
import ConfirmationPage from "./pages/ConfirmationPage";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/hotel/:id" element={<HotelDetailsPage />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/confirmation/:id" element={<ConfirmationPage />} />
          <Route path="*" element={<div className="container state">Page not found. <Link to="/">Go home</Link></div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
