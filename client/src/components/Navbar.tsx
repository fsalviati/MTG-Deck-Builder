import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  const navbarRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node) &&
        (!menuButtonRef.current ||
          !menuButtonRef.current.contains(event.target as Node))
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav ref={navbarRef}>
      <div ref={menuButtonRef} className="menu-mobile" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
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
