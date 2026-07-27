/**
 * Google Analytics 4 — Centralized Analytics Utility
 *
 * Hunar Bazaar 2026 — React SPA
 *
 * Usage:
 *   import { trackEvent, trackPageView } from '../services/analytics';
 *   trackEvent('stall_search');
 *
 * Privacy:
 *   - Does NOT collect email, phone, name, or message content
 *   - Only records page views, button clicks, navigation, and general engagement
 */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/** GA Measurement ID from environment variable */
export const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-EQ6CYGQ2V2';

let initialized = false;

/**
 * Ensures gtag is available and sends the event.
 * Handles race conditions where gtag may not be loaded yet.
 */
function sendToGA(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  } else {
    // Queue for when gtag loads
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(args);
  }
}

/**
 * Initialize Google Analytics.
 * Creates the dataLayer and sets up the initial config.
 * Called once from the AnalyticsTracker component.
 */
export function initGA(): void {
  if (initialized) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];

  // Define gtag function
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };

  // Initial configuration
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We handle page views manually
  });
}

/**
 * Track a page view.
 * Call this whenever the route changes.
 *
 * @param path - The current pathname (e.g., '/stalls')
 */
export function trackPageView(path: string): void {
  sendToGA('config', GA_MEASUREMENT_ID, {
    page_path: path,
  });
}

/**
 * Track a custom user interaction event.
 *
 * @param action - The event action name (e.g., 'stall_search', 'register_click')
 * @param params - Optional additional parameters
 */
export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean>
): void {
  sendToGA('event', action, {
    ...params,
    send_to: GA_MEASUREMENT_ID,
  });
}

// ──────────────────────────────────────────────────
//  Specialized Event Helpers
//  (Centralized — components never call gtag directly)
// ──────────────────────────────────────────────────

/** Track when a user searches in the stall directory */
export function trackStallSearch(): void {
  trackEvent('stall_search');
}

/** Track when a user changes the category filter */
export function trackCategoryFilter(category: string): void {
  trackEvent('filter_category', { category });
}

/** Track when a stall card is expanded to view details */
export function trackStallView(stallName: string): void {
  trackEvent('view_stall', { stall_name: stallName });
}

/** Track "Register" button clicks across the site */
export function trackRegisterClick(source: string): void {
  trackEvent('register_click', { source });
}

/** Track opening of the Google registration form */
export function trackRegistrationFormOpen(): void {
  trackEvent('registration_form_open');
}

/** Track contact form submissions (success/failure) */
export function trackContactSubmit(status: 'success' | 'failure'): void {
  trackEvent('contact_submit', { status });
}

/** Track gallery image being opened in lightbox */
export function trackGalleryImageOpen(): void {
  trackEvent('gallery_image_view');
}

/** Track gallery navigation (next/prev) */
export function trackGalleryNavigation(direction: 'next' | 'prev'): void {
  trackEvent('gallery_navigate', { direction });
}

/** Track map zone interaction */
export function trackMapZone(zone: string): void {
  trackEvent('open_map_zone', { zone });
}

/** Track "Open in Google Maps" click */
export function trackOpenGoogleMaps(): void {
  trackEvent('open_maps_directions');
}

/** Track social media link clicks */
export function trackSocialClick(platform: string): void {
  trackEvent('social_click', { platform });
}

/** Track hero CTA */
export function trackHeroCTA(label: string): void {
  trackEvent('hero_cta_click', { label });
}

/** Track external link clicks */
export function trackExternalLink(url: string): void {
  trackEvent('external_link_click', { url });
}

