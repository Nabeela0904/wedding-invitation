const envelopeOverlay = document.getElementById("envelope-overlay");
const envelopeOpenBtn = document.getElementById("envelope-open");
const envelopeStage = document.querySelector(".envelope-stage");
const ENVELOPE_FLAP_OPEN_MS = 320;
const ENVELOPE_REVEAL_START_MS = 2900;
let envelopeOpening = false;

const layers = {
  layer1: document.querySelector(".background-layer-1"),
  layer2: document.querySelector(".background-layer-2"),
  glow: document.querySelector(".background-glow"),
  lanternOverlay: document.querySelector(".lantern-overlay"),
};

let targetMouseX = 0;
let targetMouseY = 0;
let smoothMouseX = 0;
let smoothMouseY = 0;

window.addEventListener("mousemove", (event) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  targetMouseX = (event.clientX - cx) / cx;
  targetMouseY = (event.clientY - cy) / cy;
});

function animateBackground() {
  smoothMouseX += (targetMouseX - smoothMouseX) * 0.06;
  smoothMouseY += (targetMouseY - smoothMouseY) * 0.06;

  if (layers.layer1) {
    layers.layer1.style.transform = `translate3d(${smoothMouseX * 12}px, ${smoothMouseY * 10}px, 0) scale(1.2)`;
  }

  if (layers.layer2) {
    layers.layer2.style.transform = `translate3d(${smoothMouseX * -17}px, ${smoothMouseY * -14}px, 0) scale(1.15)`;
  }

  if (layers.glow) {
    layers.glow.style.transform = `translate3d(${smoothMouseX * 14}px, ${smoothMouseY * 14}px, 0)`;
  }

  if (layers.lanternOverlay) {
    layers.lanternOverlay.style.transform = `translate3d(${smoothMouseX * 8}px, 0px, 0)`;
  }

  requestAnimationFrame(animateBackground);
}

animateBackground();

function invitationPageUrl() {
  if (window.WEDDING_INVITATION_PAGE) {
    return window.WEDDING_INVITATION_PAGE;
  }

  const base = window.WEDDING_DEPLOY_BASE || "/";
  return new URL("invitation.html", window.location.origin + base).href;
}

function goToInvitation() {
  window.location.assign(invitationPageUrl());
}

function startMusicFromUserGesture() {
  const bgMusic = document.getElementById("bg-music");
  const musicState = window.WeddingMusicState;
  if (!bgMusic || (musicState && musicState.wasUserPaused())) return;

  if (window.WEDDING_MUSIC_SRC && !bgMusic.src) {
    bgMusic.src = window.WEDDING_MUSIC_SRC;
    bgMusic.load();
  }

  if (musicState) {
    musicState.applySavedMusicTime(bgMusic);
  }

  bgMusic.volume = 0.35;
  bgMusic.play().catch(() => {});
}

function openEnvelope() {
  if (!envelopeOverlay || envelopeOverlay.classList.contains("is-open") || envelopeOpening) {
    return;
  }

  envelopeOpening = true;
  document.body.classList.add("envelope-animating");

  if (envelopeOpenBtn) {
    envelopeOpenBtn.disabled = true;
  }

  startMusicFromUserGesture();

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    window.setTimeout(goToInvitation, 120);
    return;
  }

  envelopeOverlay.classList.add("is-opening");

  window.setTimeout(() => {
    envelopeOverlay.classList.add("is-open");
  }, ENVELOPE_FLAP_OPEN_MS);

  window.setTimeout(goToInvitation, ENVELOPE_REVEAL_START_MS);
}

if (envelopeOverlay && envelopeOpenBtn) {
  envelopeOpenBtn.addEventListener("click", openEnvelope);
}

if (envelopeStage) {
  envelopeStage.addEventListener("click", openEnvelope);
}
