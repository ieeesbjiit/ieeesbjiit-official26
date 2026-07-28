import { useState } from "react";
import "./navbar.css";
import logo from "./ieee_white.png"; // change path if logo is elsewhere

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="ieee-navbar">
            <div className="ieee-navbar-container">

                {/* Replace this with logo later */}
                <div className="ieee-logo">
                    <img src={logo} alt="logo" />
                </div>

                <button
                    className={`ieee-navbar-toggle ${menuOpen ? "active" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="ieee-bar"></span>
                    <span className="ieee-bar"></span>
                    <span className="ieee-bar"></span>
                </button>

                <ul className={`ieee-navbar-menu ${menuOpen ? "active" : ""}`}>

                    <li><a href="#home">HOME</a></li>

                    <li><a href="#highlights">HIGHLIGHTS</a></li>

                    <li><a href="#about">ABOUT</a></li>

                    <li><a href="#events">EVENTS</a></li>

                    <li><a href="#wie">WIE</a></li>

                    <li><a href="#team">TEAM</a></li>

                    <li><a href="#gallery">GALLERY</a></li>

                    <li><a href="#contact">CONTACT US</a></li>

                </ul>

            </div>
        </nav>
    );
};

export default Navbar;

