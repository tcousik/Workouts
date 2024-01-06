import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="container">
      <Link to="/">
        <h1>Workout Pal</h1>
      </Link>
      <nav>
        <div>
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
