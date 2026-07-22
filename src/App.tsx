import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// Layout & Components
import MainLayout from './layouts/MainLayout';
import LoadingScreen from './components/LoadingScreen';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Stalls from './pages/Stalls';
import EventMap from './pages/EventMap';
import Gallery from './pages/Gallery';
import Rules from './pages/Rules';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="register" element={<Register />} />
          <Route path="stalls" element={<Stalls />} />
          <Route path="map" element={<EventMap />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="rules" element={<Rules />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          
          {/* 404 Route */}
          <Route path="*" element={<div className="min-h-[60vh] flex items-center justify-center text-2xl font-semibold">Page Not Found</div>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <AnimatedRoutes />
      )}
    </BrowserRouter>
  );
}

export default App;
