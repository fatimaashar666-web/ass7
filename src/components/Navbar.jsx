import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">Trip<span>olo</span></Link>
        <nav className="nav-links">
          <Link to="/search">All stays</Link>
          <Link to="/search?destination=Karachi">Karachi</Link>
          <Link to="/search?destination=Dubai">Dubai</Link>
        </nav>
      </div>
    </header>
  );
}
