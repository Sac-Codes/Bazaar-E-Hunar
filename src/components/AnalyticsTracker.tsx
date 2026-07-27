/**
 * AnalyticsTracker
 *
 * Automatically tracks page views on every route change.
 * Must be placed inside <BrowserRouter>.
 *
 * Also initializes Google Analytics once on mount.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView } from '../services/analytics';

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA once
    initGA();
  }, []);

  useEffect(() => {
    // Track page view on every route change
    trackPageView(location.pathname);
  }, [location.pathname]);

  // This component renders nothing
  return null;
};

export default AnalyticsTracker;

