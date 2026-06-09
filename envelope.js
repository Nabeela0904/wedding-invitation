const envelopeOverlay = document.getElementById("envelope-overlay");
const envelopeOpenBtn = document.getElementById("envelope-open");
const envelopeStage = document.querySelector(".envelope-stage");
const ENVELOPE_FLAP_OPEN_MS = 320;
const ENVELOPE_CARD_EMERGE_MS = 2200;
const ENVELOPE_REVEAL_START_MS = 3000;
const REVEAL_FADE_MS = 1600;
let envelopeOpening = false;
let invitationRevealStarted = false;

const envelopeLayers = {
  layer1: document.querySelector(".background-layer-1"),
  layer2: document.querySelector(".background-layer-2"),
  glow: document.querySelector(".background-glow"),
  lanternOverlay: document.querySelector(".lantern-overlay"),
};

let envelopeTargetMouseX = 0;
let envelopeTargetMouseY = 0;
let envelopeSmoothMouseX = 0;
let envelopeSmoothMouseY = 0;

window.addEventListener("mousemove", (event) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  envelopeTargetMouseX = (event.clientX - cx) / cx;
  envelopeTargetMouseY = (event.clientY - cy) / cy;
});

function animateEnvelopeBackground() {
  envelopeSmoothMouseX += (envelopeTargetMouseX - envelopeSmoothMouseX) * 0.06;
  envelopeSmoothMouseY += (envelopeTargetMouseY - envelopeSmoothMouseY) * 0.06;

  if (envelopeLayers.layer1) {
    envelopeLayers.layer1.style.transform = `translate3d(${envelopeSmoothMouseX * 12}px, ${envelopeSmoothMouseY * 10}px, 0) scale(1.2)`;
  }

  if (envelopeLayers.layer2) {
    envelopeLayers.layer2.style.transform = `translate3d(${envelopeSmoothMouseX * -17}px, ${envelopeSmoothMouseY * -14}px, 0) scale(1.15)`;
  }

  if (envelopeLayers.glow) {
    envelopeLayers.glow.style.transform = `translate3d(${envelopeSmoothMouseX * 14}px, ${envelopeSmoothMouseY * 14}px, 0)`;
  }

  if (envelopeLayers.lanternOverlay) {
    envelopeLayers.lanternOverlay.style.transform = `translate3d(${envelopeSmoothMouseX * 8}px, 0px, 0)`;
  }

  requestAnimationFrame(animateEnvelopeBackground);
}

animateEnvelopeBackground();

function invitationPageUrl() {
  if (window.WEDDING_INVITATION_PAGE) {
    return window.WEDDING_INVITATION_PAGE;
  }

  const base = window.WEDDING_DEPLOY_BASE || "/";
  return new URL("invitation.html", window.location.origin + base).href;
}

function invitationHistoryPath() {
  const base = window.WEDDING_DEPLOY_BASE || "/";
  return new URL("invitation.html", window.location.origin + base).pathname;
}

function prefetchInvitationHtml() {
  if (window.__invitationHtmlPrefetch) return;
  window.__invitationHtmlPrefetch = fetch(invitationPageUrl(), { credentials: "same-origin" }).catch(() => null);
}

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-dynamic-src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.dataset.dynamicSrc = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

async function ensureInvitationContent() {
  if (document.querySelector("main.invite-wrapper")) return;

  const prefetch = window.__invitationHtmlPrefetch;
  const response = prefetch
    ? await prefetch
    : await fetch(invitationPageUrl(), { credentials: "same-origin" });

  if (!response || !response.ok) {
    throw new Error("Invitation HTML fetch failed");
  }

  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  const main = doc.querySelector("main.invite-wrapper");

  if (!main) {
    throw new Error("Invitation main content missing");
  }

  const anchor = document.getElementById("bg-music") || document.getElementById("envelope-overlay");
  if (anchor && anchor.parentNode) {
    anchor.parentNode.insertBefore(main, anchor);
  } else {
    document.body.appendChild(main);
  }
}

function continueMusicFromEnvelopeOpen() {
  const bgMusic = document.getElementById("bg-music");
  const musicState = window.WeddingMusicState;
  if (!bgMusic || (musicState && musicState.wasUserPaused())) return;

  if (!bgMusic.paused && !bgMusic.ended) {
    bgMusic.muted = false;
    bgMusic.volume = 0.35;
    if (musicState) musicState.markUserPlaying(bgMusic.currentTime);
    return;
  }

  if (window.WEDDING_MUSIC_SRC && !bgMusic.src) {
    bgMusic.src = window.WEDDING_MUSIC_SRC;
    bgMusic.load();
  }

  if (musicState) {
    musicState.applySavedMusicTime(bgMusic);
  }

  if (window.WeddingMusic && window.WeddingMusic.startFromUserGesture) {
    window.WeddingMusic.startFromUserGesture(true);
    return;
  }

  bgMusic.volume = 0.35;
  bgMusic.muted = false;
  bgMusic.play().catch(() => {});
}

async function revealInvitationSmoothly() {
  if (invitationRevealStarted) return;
  invitationRevealStarted = true;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  try {
    await ensureInvitationContent();

    if (prefersReducedMotion) {
      document.body.classList.remove("envelope-page", "invite-entrance-locked", "envelope-animating");
      document.body.classList.add("invite-revealed");
      if (envelopeOverlay) envelopeOverlay.remove();
    } else {
      const bloom = document.getElementById("invite-reveal-bloom");
      if (bloom) {
        bloom.classList.remove("is-active");
        void bloom.offsetWidth;
        bloom.classList.add("is-active");
      }

      document.body.classList.add("invite-reveal-active");
      document.body.classList.remove("envelope-page", "invite-entrance-locked", "envelope-animating");
      document.body.classList.add("invite-revealed");

      if (envelopeOverlay) {
        envelopeOverlay.classList.add("is-revealing");
        window.setTimeout(() => {
          envelopeOverlay.classList.add("is-hidden");
          window.setTimeout(() => {
            envelopeOverlay.remove();
            document.body.classList.remove("invite-reveal-active");
          }, REVEAL_FADE_MS);
        }, 120);
      } else {
        window.setTimeout(() => {
          document.body.classList.remove("invite-reveal-active");
        }, REVEAL_FADE_MS);
      }
    }

    history.replaceState({ invitationRevealed: true }, "", invitationHistoryPath());

    if (window.patchWeddingSiteLinks) {
      window.patchWeddingSiteLinks();
    }

    await loadScriptOnce("rsvp-config.js");
    await loadScriptOnce("script.js");

    if (window.initInvitationPage) {
      window.initInvitationPage({ revealAll: true });
    } else if (window.revealInvitationSections) {
      window.revealInvitationSections();
    }
  } catch (error) {
    console.warn("Smooth invitation reveal failed, falling back to navigation:", error);
    window.location.assign(invitationPageUrl());
  }
}

function goToInvitation() {
  revealInvitationSmoothly();
}

function openEnvelope() {
  if (!envelopeOverlay || envelopeOverlay.classList.contains("is-open") || envelopeOpening) {
    return;
  }

  envelopeOpening = true;
  prefetchInvitationHtml();
  ensureInvitationContent().catch(() => {});
  document.body.classList.add("envelope-animating");

  if (envelopeOpenBtn) {
    envelopeOpenBtn.disabled = true;
  }

  continueMusicFromEnvelopeOpen();

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    window.setTimeout(goToInvitation, 120);
    return;
  }

  envelopeOverlay.classList.add("is-opening");

  window.setTimeout(() => {
    envelopeOverlay.classList.add("is-open");
  }, ENVELOPE_FLAP_OPEN_MS);

  window.setTimeout(() => {
    envelopeOverlay.classList.add("is-card-emerging");
  }, ENVELOPE_CARD_EMERGE_MS);

  window.setTimeout(goToInvitation, ENVELOPE_REVEAL_START_MS);
}

if (document.body.classList.contains("envelope-page")) {
  prefetchInvitationHtml();
}

if (envelopeOverlay && envelopeOpenBtn) {
  envelopeOpenBtn.addEventListener("click", openEnvelope);
}

if (envelopeStage) {
  envelopeStage.addEventListener("click", openEnvelope);
}
