import { useState, useEffect } from 'react';
import './App.css';

import Preloader from './components/preloader/preloader';
import Navbar from './components/navbar/navbar';
import Landing from './components/landing-page/landing';
import About from './components/about/about';
import Highlights from './components/highlights/highlights';
import Events from './components/events/Events.jsx';
import Gallery from './components/gallery/gallery';
import Team from './components/team/team';
import WIE from './components/WIE/WIE';
import Footer from './components/footer/footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Lock body scroll while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <Navbar />
      <Landing />
      <Highlights />
      <About />
      <Events />
      <WIE />
      <Team />
      <Gallery />
      <Footer />
    </>
  );
}

export default App;