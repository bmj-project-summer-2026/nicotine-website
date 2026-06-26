// Parallax zoom + hotspot logic will go here in the next step.

console.log("Nicotine Effects: The Brain — loaded");

// --- Fade out the "Nicotine Affects You" layer as the user scrolls ---
const heroWrapper = document.querySelector(".hero-wrapper");
const nicotineLayer = document.getElementById("nicotineLayer");

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

  // Fade the nicotine layer out as progress increases
  nicotineLayer.style.opacity = 1 - progress;
}

window.addEventListener("scroll", updateHeroFade);
window.addEventListener("resize", updateHeroFade);
updateHeroFade(); // run once on load
