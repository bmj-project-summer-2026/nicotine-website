// Parallax zoom + hotspot logic will go here in the next step.

console.log("Nicotine Effects: The Brain — loaded");

// --- Fade out the "Nicotine Affects You" layer as the user scrolls ---
const heroWrapper = document.querySelector(".hero-wrapper");
const nicotineLayer = document.getElementById("nicotineLayer");
const hotspot1 = document.querySelector(".hotspot1");
const partsbrainLayer = document.getElementById("partsbrainLayer");

function mapRange(value, zoneStart, zoneEnd) {
  if (value <= zoneStart) return 0;
  if (value >= zoneEnd) return 1;
  return (value - zoneStart) / (zoneEnd - zoneStart);
}

function updateHeroFade() {
  if (!heroWrapper || !nicotineLayer) return;

  const rect = heroWrapper.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // How far we've scrolled into the wrapper (0 = just reached it)
  const scrolled = -rect.top;

  // Total scrollable distance while the hero stays pinned
  const maxScroll = heroWrapper.offsetHeight - viewportHeight;

  // Progress from 0 (top, fully visible) to 1 (fully scrolled past)
  let progress = scrolled / maxScroll;
  progress = Math.min(Math.max(progress, 0), 1);

  const nicotineProgress = mapRange(progress, 0, 0.4);
  nicotineLayer.style.opacity = 1 - nicotineProgress;

  let hotspotOpacity;
  if (progress <= 0.4) {
    hotspotOpacity = 0;
  } else if (progress <= 0.6) {
    hotspotOpacity = mapRange(progress, 0.4, 0.6); // 0 -> 1
  } else {
    hotspotOpacity = 1 - mapRange(progress, 0.6, 1); // 1 -> 0
  }
 
  const stage2Progress = mapRange(progress, 0.6, 1);
 
  if (hotspot1) {
    hotspot1.style.opacity = hotspotOpacity;
    // Only clickable/hoverable while actually visible.
    hotspot1.style.pointerEvents = hotspotOpacity > 0 ? "auto" : "none";
  }
 
  if (partsbrainLayer) {
    partsbrainLayer.style.opacity = stage2Progress;
  }
}
 
window.addEventListener("scroll", updateHeroFade);
window.addEventListener("resize", updateHeroFade);
updateHeroFade(); // run once on load
 
