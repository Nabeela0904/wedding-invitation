const envelopeOverlay = document.getElementById("envelope-overlay");
const envelopeOpenBtn = document.getElementById("envelope-open");
const envelopeStage = document.querySelector(".envelope-stage");
const ENVELOPE_FLAP_OPEN_MS = 320;
const ENVELOPE_REVEAL_START_MS = 2900;
let envelopeOpening = false;

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
