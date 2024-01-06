import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="container">
      <Link to="/">
        <h1>Workout Pal</h1>
      </Link>
      <nav>
        <div>
          <button onClick={handleClick}>Logout</button>
        </div>
        <div>
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
