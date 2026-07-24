import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, lazy, Suspense } from 'react';

// Layout & Components
import MainLayout from './layouts/MainLayout';
import LoadingScreen from './components/LoadingScreen';

// Lazy-loaded Pages for better code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Register = lazy(() => import('./pages/Register'));
const Stalls = lazy(() => import('./pages/Stalls'));
const EventMap = lazy(() => import('./pages/EventMap'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Rules = lazy(() => import('./pages/Rules'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));

// Fallback loading component for lazy-loaded routes
const PageLoadingFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-500 text-sm font-medium">Loading...</p>
    </div>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoadingFallback />}>
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
      </Suspense>
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
