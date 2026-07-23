import { useState } from "react";
import "./navbar.css";
//import logo from "./ieeelogo.png"; // change path if logo is elsewhere

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="ieee-navbar">
            <div className="ieee-navbar-container">

                {/* Replace this with logo later */}
                <div className="ieee-logo">
                    IEEE SB JIIT
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

