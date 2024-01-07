import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="container">
      <Link to="/">
        <h1>Workout Pal</h1>
      </Link>
      <nav>
        {user && (
          <div>
            <span>{user.email}</span>
            <button onClick={handleClick}>Log Out</button>
          </div>
        )}
        {!user && (
          <div>
            <Link className="butn" to="/login">
              Log In
            </Link>
            <Link className="butn" to="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
