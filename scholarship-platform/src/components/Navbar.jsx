import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Scholarship Platform</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login" className="login-btn">Login</Link>
      </div>
    </nav>
  );
}