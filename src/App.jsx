import "./App.css";

import Preloader from "./components/preloader/preloader";
import Navbar from "./components/navbar/navbar";
import Landing from "./components/landing-page/landing";
import About from "./components/about/about";
import Highlights from "./components/highlights/highlights";
import Events from "./components/events/events";
import Gallery from "./components/gallery/gallery";
import Team from "./components/team/team";
//import WIE from "./components/WIE/WIE";
import Footer from "./components/footer/footer";

function App() {
    return (
        <>
            {/* preload logic badmei daldena. appended it here for now */}
            {/* <Preloader /> */}

            <Navbar />

            <Landing />
            <Highlights />
            <About />
            <Events />
            {/*<WIE />*/}
            <Team />
            <Gallery />

            <Footer />
        </>
    );
}

export default App;