// Homepage: scroll-triggered brickbrain -> blackbrain -> loopbrain fade.
console.log("Homepage loaded");
const homeWrapper = document.querySelector(".home-hero-wrapper");
const homeBlackbrain = document.getElementById("homeBlackbrainLayer");
const homeLoopbrain = document.getElementById("homeLoopbrainLayer");

function updateHomeFade() {
  if (!homeWrapper || !homeBlackbrain) return;
  const rect = homeWrapper.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const scrolled = -rect.top;
  const maxScroll = homeWrapper.offsetHeight - viewportHeight;
  let progress = scrolled / maxScroll;
  progress = Math.min(Math.max(progress, 0), 1);

  // Blackbrain fades in over the first 60% of scroll
  const blackProgress = Math.min(Math.max(progress / 0.6, 0), 1);
  homeBlackbrain.style.opacity = blackProgress;

  // Loopbrain fades in only after blackbrain is fully visible (last 40%)
  if (homeLoopbrain) {
    const loopProgress = Math.min(Math.max((progress - 0.6) / 0.4, 0), 1);
    homeLoopbrain.style.opacity = loopProgress;
  }
}

window.addEventListener("scroll", updateHomeFade);
window.addEventListener("resize", updateHomeFade);
updateHomeFade();
