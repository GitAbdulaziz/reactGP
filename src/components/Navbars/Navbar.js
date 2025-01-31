import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../styles/Navbar.css";
import logo from "../../assets/img/LogoW.png";

const Navbar = () => {
  const history = useHistory();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    history.push("/home");
  };

  const handleMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    document.querySelector(".navbar").classList.toggle("nav-mobile-menu");
  };

  const handleResize = () => {
    if (window.innerWidth > 1098 && isMobileMenuOpen) {
      setMobileMenuOpen(false);
      document.querySelector(".navbar").classList.remove("nav-mobile-menu");
    }
  };

  // Listen for window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen]); // Runs when mobile menu state changes

  return (
    <header className="navbar">
      <div className="logo-container">
        <div className="logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          <img src={logo} alt="BusinessMap Logo" className="navbar-logo-img" />
        </div>
        <button className="mobile-menu-toggle" onClick={handleMenuToggle}>
          ☰
        </button>
      </div>

      <nav className={isMobileMenuOpen ? "nav-mobile-menu" : ""}>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/search">Map</Link>
        <Link to="/admin/subscription">Subscription</Link>
        <Link to="/contact">Contact</Link>
        <span></span>

        {isMobileMenuOpen && (
          <div className="navbar-actions-mobile">
            <Link to="/auth/signin" className="nav-action">Sign In</Link>
            <Link to="/auth/signup" className="nav-action">Sign Up</Link>
            <Link to="/search" className="nav-action">Get Started</Link>
          </div>
        )}
      </nav>

      {!isMobileMenuOpen && (
        <div className="navbar-actions">
          <Link to="/auth/signin" className="nav-action">Sign In</Link>
          <Link to="/auth/signup" className="nav-action">Sign Up</Link>
          <Link to="/search" className="nav-action">Get Started</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
