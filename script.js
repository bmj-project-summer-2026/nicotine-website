// Parallax zoom + hotspot logic
console.log("Nicotine Effects: The Brain — loaded");

const heroWrapper = document.querySelector(".hero-wrapper");
const nicotineLayer = document.getElementById("nicotineLayer");
const hotspot1 = document.querySelector(".hotspot1");
const partsbrainLayer = document.getElementById("partsbrainLayer");
const hotspot3 = document.querySelector(".hotspot3");
const hotspot4 = document.querySelector(".hotspot4");
const hotspot5 = document.querySelector(".hotspot5");

// --- Scroll zone boundaries (0 = top of hero, 1 = fully scrolled past) ---
// Adjust these numbers to retime any stage without touching the logic below.
const NICOTINE_FADE_END = 0.3;     // 0 -> this: nicotine fades out
const HOTSPOT1_FADE_IN_END = 0.45; // nicotine end -> this: hotspot1 fades in
const HOTSPOT1_FADE_OUT_END = 0.65; // -> this: hotspot1 fades out, partsbrain fades in
const HOTSPOT345_FADE_IN_START = 0.8; // this -> 1: hotspot3/4/5 fade in
// (0.65 - 0.8 is a dead zone: partsbrain fully visible, 3/4/5 not yet)

function mapRange(value, zoneStart, zoneEnd) {
  if (value <= zoneStart) return 0;
  if (value >= zoneEnd) return 1;
  return (value - zoneStart) / (zoneEnd - zoneStart);
}

function updateHeroFade() {
  if (!heroWrapper || !nicotineLayer) return;

  const rect = heroWrapper.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const scrolled = -rect.top;
  const maxScroll = heroWrapper.offsetHeight - viewportHeight;

  let progress = scrolled / maxScroll;
  progress = Math.min(Math.max(progress, 0), 1);

  // Nicotine fades out
  const nicotineProgress = mapRange(progress, 0, NICOTINE_FADE_END);
  nicotineLayer.style.opacity = 1 - nicotineProgress;

  // Hotspot1: hidden -> fades in -> fades back out
  let hotspot1Opacity;
  if (progress <= NICOTINE_FADE_END) {
    hotspot1Opacity = 0;
  } else if (progress <= HOTSPOT1_FADE_IN_END) {
    hotspot1Opacity = mapRange(progress, NICOTINE_FADE_END, HOTSPOT1_FADE_IN_END);
  } else {
    hotspot1Opacity = 1 - mapRange(progress, HOTSPOT1_FADE_IN_END, HOTSPOT1_FADE_OUT_END);
  }

  if (hotspot1) {
    hotspot1.style.opacity = hotspot1Opacity;
    hotspot1.style.pointerEvents = hotspot1Opacity > 0 ? "auto" : "none";
  }

  // Partsbrain fades in as hotspot1 fades out, then stays visible
  const partsbrainProgress = mapRange(progress, HOTSPOT1_FADE_IN_END, HOTSPOT1_FADE_OUT_END);
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

window.addEventListener("scroll", updateHeroFade);
window.addEventListener("resize", updateHeroFade);
updateHeroFade(); // run once on load
