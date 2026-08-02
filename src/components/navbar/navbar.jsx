import { useState, useEffect } from "react";
import "./navbar.css";
import logo from "../../assets/ieee_white.png";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

 useEffect(() => {
    const ids = [
        "home",
        "highlights",
        "about",
        "events",
        "team",
        "gallery",
        "contact",
    ];

    const handleScroll = () => {
        const viewportCenter = window.innerHeight / 2;

        let current = ids[0];
        let smallestDistance = Infinity;

        ids.forEach((id) => {
            const section = document.getElementById(id);

            if (!section) return;

            const rect = section.getBoundingClientRect();

            const sectionCenter = rect.top + rect.height / 2;

            const distance = Math.abs(sectionCenter - viewportCenter);

            if (distance < smallestDistance) {
                smallestDistance = distance;
                current = id;
            }
        });

        setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
}, []);
    return (
        <nav className="ieee-navbar">
            <div className="ieee-navbar-container">

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

                    <li>
                        <a
                            href="#home"
                            className={activeSection === "home" ? "active" : ""}
                            onClick={() => setMenuOpen(false)}
                        >
                            HOME
                        </a>
                    </li>

                    <li>
                        <a
                            href="#highlights"
                            className={activeSection === "highlights" ? "active" : ""}
                            onClick={() => setMenuOpen(false)}
                        >
                            HIGHLIGHTS
                        </a>
                    </li>

                    <li>
                        <a
                            href="#about"
                            className={activeSection === "about" ? "active" : ""}
                            onClick={() => setMenuOpen(false)}
                        >
                            ABOUT
                        </a>
                    </li>

                    <li>
                        <a
                            href="#events"
                            className={activeSection === "events" ? "active" : ""}
                            onClick={() => setMenuOpen(false)}
                        >
                            EVENTS
                        </a>
                    </li>

                    <li>
                        <a
                            href="#wie"
                            className={activeSection === "wie" ? "active" : ""}
                            onClick={() => setMenuOpen(false)}
                        >
                            WIE
                        </a>
                    </li>

                    <li>
                        <a
                            href="#team"
                            className={activeSection === "team" ? "active" : ""}
                            onClick={() => setMenuOpen(false)}
                        >
                            TEAM
                        </a>
                    </li>

                    <li>
                        <a
                            href="#gallery"
                            className={activeSection === "gallery" ? "active" : ""}
                            onClick={() => setMenuOpen(false)}
                        >
                            GALLERY
                        </a>
                    </li>

                    <li>
                        <a
                            href="#contact"
                            className={activeSection === "contact" ? "active" : ""}
                            onClick={() => setMenuOpen(false)}
                        >
                            CONTACT US
                        </a>
                    </li>

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;