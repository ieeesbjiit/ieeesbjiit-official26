// Team photos
import TEAM from '../components/team/data/teamData';
import logo from '../assets/ieee_white.png';

// Highlights images
import attendees from '../components/highlights/attendees.jpg';
import members from '../components/highlights/members.jpg';
import WIE from '../components/highlights/WIE.jpg';
import Xenith from '../components/highlights/Xenith.PNG';

// Footer image
import floor from '../components/footer/assets/ocean-floor.png';

// Landing video (uncomment when you have it)
import landingVideo from '../components/landing-page/underwater.mp4';
import logoVideoWebm from '../components/landing-page/logo.webm';

/**
 * Returns an array of all media files to preload with URL + estimated weight.
 * Weights are used as fallback totals when the server doesn't send
 * Content-Length headers (common in dev mode).
 */
export function getAllMediaSources() {
  const sources = [];

  // ---------- IMAGES ----------
  // Static images (small — average 100-300KB each)
  const staticImages = [attendees, members, WIE, Xenith, logo, floor];
  staticImages.forEach((url) => {
    sources.push({ url, weight: 4000000 }); // ~4MB estimate
  });

  // Team images (small photos + cutout PNGs)
  TEAM.forEach((member) => {
    if (member.img) sources.push({ url: member.img, weight: 250000 }); // ~250KB
    if (member.cutout) sources.push({ url: member.cutout, weight: 250000 }); // ~250KB
  });

  // ---------- VIDEOS ----------
  // Videos are much bigger — assign heavier weights so they dominate progress
  sources.push({ url: landingVideo, weight: 12000000 });   // ~12MB
  sources.push({ url: logoVideoWebm, weight: 4000000 }); // ~4MB

  // Deduplicate by URL
  const seen = new Set();
  return sources.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

/**
 * Legacy function — returns just the URLs (backwards compatible).
 * Kept in case any old code uses it.
 */
export function getAllImageSources() {
  return getAllMediaSources().map((item) => item.url);
}