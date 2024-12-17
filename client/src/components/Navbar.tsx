import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  return (
    <nav>
      <div className="menu-mobile" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="nav-links">
        <ul className={menuOpen ? "open" : ""}>
          <div className="nav-menu-items">
            {isAuthenticated && (
              <>
                <li>
                  <NavLink to="/" className="navItems">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/deck-builder" className="navItems">
                    Deck Builder
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-decks" className="navItems">
                    My Decks
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="about" className="navItems">
                About this Project
              </NavLink>
            </li>
          </div>
          <div className="nav-auth-button">
            {isAuthenticated ? (
              <li>
                <button
                  className="auth-button"
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <button
                  className="auth-button"
                  onClick={() => loginWithRedirect()}
                >
                  Login
                </button>
              </li>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
