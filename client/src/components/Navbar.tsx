import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  return (
    <nav>
      <Link to="/" className="title">
        Home
      </Link>
      <div className="menu-mobile" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        {isAuthenticated && (
          <>
            <li>
              <NavLink to="/deck-builder">Deck Builder</NavLink>
            </li>
            <li>
              <NavLink to="/my-decks">My Decks</NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="about">About</NavLink>
        </li>
        <li>
          {isAuthenticated ? (
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Log Out
            </button>
          ) : (
            <button className="auth-button" onClick={() => loginWithRedirect()}>
              Log In
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
