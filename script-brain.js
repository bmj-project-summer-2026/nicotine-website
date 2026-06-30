// Brain page: hotspot1 -> partsbrain -> hotspot3/4/5 scroll logic.
// Blackbrain is a static background here (set via CSS), so there's
// no nicotine/blackbrain fade to handle on this page.
console.log("Brain page loaded");

const heroWrapper = document.querySelector(".hero-wrapper");
const hotspot1 = document.querySelector(".hotspot1");
const partsbrainLayer = document.getElementById("partsbrainLayer");
const hotspot3 = document.querySelector(".hotspot3");
const hotspot4 = document.querySelector(".hotspot4");
const hotspot5 = document.querySelector(".hotspot5");

// --- Scroll zone boundaries (0 = top of hero, 1 = fully scrolled past) ---
const HOTSPOT1_FADE_IN_END = 0.15;
const HOTSPOT1_HOLD_END = 0.35;
const HOTSPOT1_FADE_OUT_END = 0.55;
const HOTSPOT345_FADE_IN_START = 0.8;

function mapRange(value, zoneStart, zoneEnd) {
  if (value <= zoneStart) return 0;
  if (value >= zoneEnd) return 1;
  return (value - zoneStart) / (zoneEnd - zoneStart);
}

function updateBrainFade() {
  if (!heroWrapper) return;
  const rect = heroWrapper.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const scrolled = -rect.top;
  const maxScroll = heroWrapper.offsetHeight - viewportHeight;
  let progress = scrolled / maxScroll;
  progress = Math.min(Math.max(progress, 0), 1);

  // Hotspot1: fades in -> holds -> fades out
  let hotspot1Opacity;
  if (progress <= HOTSPOT1_FADE_IN_END) {
    hotspot1Opacity = mapRange(progress, 0, HOTSPOT1_FADE_IN_END);
  } else if (progress <= HOTSPOT1_HOLD_END) {
    hotspot1Opacity = 1;
  } else {
    hotspot1Opacity = 1 - mapRange(progress, HOTSPOT1_HOLD_END, HOTSPOT1_FADE_OUT_END);
  }
  if (hotspot1) {
    hotspot1.style.opacity = hotspot1Opacity;
    hotspot1.style.pointerEvents = hotspot1Opacity > 0 ? "auto" : "none";
  }

  // Partsbrain fades in as hotspot1 fades out, then stays visible
  const partsbrainProgress = mapRange(progress, HOTSPOT1_HOLD_END, HOTSPOT1_FADE_OUT_END);
  if (partsbrainLayer) {
    partsbrainLayer.style.opacity = partsbrainProgress;
  }

  // Hotspot3/4/5 fade in together, only in the final stretch
  const hotspot345Opacity = mapRange(progress, HOTSPOT345_FADE_IN_START, 1);
  [hotspot3, hotspot4, hotspot5].forEach((hotspot) => {
    if (!hotspot) return;
    hotspot.style.opacity = hotspot345Opacity;
    hotspot.style.pointerEvents = hotspot345Opacity > 0 ? "auto" : "none";
  });
}

window.addEventListener("scroll", updateBrainFade);
window.addEventListener("resize", updateBrainFade);
updateBrainFade();
