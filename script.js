// Parallax zoom + hotspot logic will go here in the next step.

console.log("Nicotine Effects: The Brain — loaded");

// --- Fade out the "Nicotine Affects You" layer as the user scrolls ---
const heroWrapper = document.querySelector(".hero-wrapper");
const nicotineLayer = document.getElementById("nicotineLayer");
const hotspot = document.querySelector(".hotspot1");

// --- FADE NICOTINE ON SCROLL ---

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

window.addEventListerner("scroll",updateHeroFade);

// --- HOTSPOT REVEAL ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && hotspot) {
      hotspot.classList.add("show");
    }
  });
}, {
  threshold: 0.5
});

if (heroWrapper) {
  observer.observe(heroWrapper);

  window.addEventListener("scroll", updateHeroFade);
  window.addEventListener("resize", updateHeroFade);

  updateHeroFade(); // run once on load
}
