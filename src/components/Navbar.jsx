import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>Lost & Found</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/report">Report Item</Link>
      </div>
    </nav>
  );
}
