// Team photos
import TEAM from '../components/team/data/teamData';
import logo from '../assets/ieee_logo.jpeg';
import ieeeWhite from '../assets/ieee_white.png';
import bg from '/back.png';

//Gallery images
import gallery1 from '/gallery/optimized/Copy of 20260404_141808.jpg';
import gallery2 from '/gallery/optimized/Copy of Copy of IMG_9502.jpg';
import gallery3 from '/gallery/optimized/Copy of DSC09810.jpg';
import gallery4 from '/gallery/optimized/Copy of DSC09845.jpg';
import gallery5 from '/gallery/optimized/Copy of DSC09960.jpg';
import gallery6 from '/gallery/optimized/Copy of IMG_0164.jpg';
import gallery7 from '/gallery/optimized/Copy of IMG_20250915_172953.jpg';
import gallery8 from '/gallery/optimized/Copy of IMG_20250915_181256_1.jpg';

//Events images
import event1 from '../components/events/posters/ieee_day.jpeg';
import event2 from '../components/events/posters/lumina.PNG';
import event3 from '../components/events/posters/research_forum.jpeg';
import event4 from '../components/events/posters/techblocks.jpg';
import event5 from '../components/events/posters/webinar.PNG';
import event6 from '../components/events/posters/workshop.jpeg';
import event7 from '../components/events/posters/xenith.PNG';

// Highlights images
import attendees from '../components/highlights/attendees.jpg';
import members from '../components/highlights/members.jpg';
import WIE from '../components/highlights/WIE.jpg';
import Xenith from '../components/highlights/Xenith.PNG';

// Footer image
import floor from '../components/footer/assets/ocean-floor.png';

// Landing video
import landingVideo from '../components/landing-page/underwater.mp4';
import logoVideoWebm from '../components/landing-page/logo.webm';

//WIE images
import wieLogo from "../components/WIE/images/wie-logo.png";
import slide1 from "../components/WIE/images/slide1.jpg";
import slide2 from "../components/WIE/images/slide2.jpg";
import slide3 from "../components/WIE/images/slide3.jpg";
import slide4 from "../components/WIE/images/slide4.jpg";
import slide5 from "../components/WIE/images/slide5.jpg";

/**
 * Returns an array of all media files to preload with URL + estimated weight.
 * Weights are used as fallback totals when the server doesn't send
 * Content-Length headers (common in dev mode).
 */
export function getAllMediaSources() {
  const sources = [];

  // ---------- IMAGES ----------
  // Static images (small — average 100-300KB each)
  const staticImages = [attendees, members, WIE, Xenith, logo, floor, ieeeWhite, bg, wieLogo, slide1, slide2, slide3, slide4, slide5, gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8,
    event1, event2, event3, event4, event5, event6, event7];
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