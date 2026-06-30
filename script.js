// Homepage: scroll-triggered brickbrain -> blackbrain fade only.
console.log("Homepage loaded");

const homeWrapper = document.querySelector(".home-hero-wrapper");
const homeBlackbrain = document.getElementById("homeBlackbrainLayer");

function updateHomeFade() {
  if (!homeWrapper || !homeBlackbrain) return;

  const rect = homeWrapper.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const scrolled = -rect.top;
  const maxScroll = homeWrapper.offsetHeight - viewportHeight;

  let progress = scrolled / maxScroll;
  progress = Math.min(Math.max(progress, 0), 1);

  homeBlackbrain.style.opacity = progress;
}

window.addEventListener("scroll", updateHomeFade);
window.addEventListener("resize", updateHomeFade);
updateHomeFade();
