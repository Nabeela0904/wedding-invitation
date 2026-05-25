const layers = {
  layer1: document.querySelector(".background-layer-1"),
  layer2: document.querySelector(".background-layer-2"),
  glow: document.querySelector(".background-glow"),
  lanternOverlay: document.querySelector(".lantern-overlay"),
};

const envelopeOverlay = document.getElementById("envelope-overlay");
const envelopeOpenBtn = document.getElementById("envelope-open");
const envelopeStage = document.querySelector(".envelope-stage");
const ENVELOPE_FLAP_OPEN_MS = 320;
const ENVELOPE_REVEAL_START_MS = 2900;
const ENVELOPE_CONTENT_REVEAL_MS = 3150;
const ENVELOPE_REMOVE_MS = 4700;
let envelopeOpening = false;

function revealInvitationContent() {
  document.body.classList.remove("invite-entrance-locked");
  document.body.classList.add("invite-revealed");

  const hero = document.querySelector(".hero.reveal");
  if (hero) {
    window.setTimeout(() => hero.classList.add("visible"), 80);
  }

  revealItems.forEach((item, index) => {
    if (item.classList.contains("hero")) return;
    window.setTimeout(() => item.classList.add("visible"), 220 + index * 120);
  });
}

function finishEnvelopeEntrance() {
  if (!envelopeOverlay) return;

  envelopeOverlay.classList.add("is-revealing", "is-hidden");
  envelopeOverlay.setAttribute("aria-hidden", "true");

  window.setTimeout(revealInvitationContent, ENVELOPE_CONTENT_REVEAL_MS - ENVELOPE_REVEAL_START_MS);

  window.setTimeout(() => {
    envelopeOverlay.remove();
    document.body.classList.remove("envelope-animating");
    envelopeOpening = false;
  }, ENVELOPE_REMOVE_MS - ENVELOPE_REVEAL_START_MS);
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

  startMusicFromUserGesture(true);

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    envelopeOverlay.classList.add("is-hidden");
    revealInvitationContent();
    window.setTimeout(() => {
      envelopeOverlay.remove();
      document.body.classList.remove("envelope-animating");
      envelopeOpening = false;
    }, 120);
    return;
  }

  envelopeOverlay.classList.add("is-opening");

  window.setTimeout(() => {
    envelopeOverlay.classList.add("is-open");
  }, ENVELOPE_FLAP_OPEN_MS);

  window.setTimeout(finishEnvelopeEntrance, ENVELOPE_REVEAL_START_MS);
}

if (envelopeOverlay && envelopeOpenBtn) {
  envelopeOpenBtn.addEventListener("click", openEnvelope);
}

if (envelopeStage) {
  envelopeStage.addEventListener("click", openEnvelope);
}

const revealItems = document.querySelectorAll(".reveal");
const eventButtons = document.querySelectorAll(".event-button");
let targetMouseX = 0;
let targetMouseY = 0;
let targetScrollY = 0;
let smoothMouseX = 0;
let smoothMouseY = 0;
let smoothScrollY = 0;

window.addEventListener("mousemove", (event) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  targetMouseX = (event.clientX - cx) / cx;
  targetMouseY = (event.clientY - cy) / cy;
});

window.addEventListener("scroll", () => {
  targetScrollY = window.scrollY;
});

function animateBackground() {
  // Interpolate values for smoother motion, especially on touchpads.
  smoothMouseX += (targetMouseX - smoothMouseX) * 0.06;
  smoothMouseY += (targetMouseY - smoothMouseY) * 0.06;
  smoothScrollY += (targetScrollY - smoothScrollY) * 0.08;

  const s1 = smoothScrollY * 0.1;
  const s2 = smoothScrollY * 0.17;

  if (layers.layer1) {
    layers.layer1.style.transform = `translate3d(${smoothMouseX * 12}px, ${smoothMouseY * 10 + s1}px, 0) scale(1.2)`;
  }

  if (layers.layer2) {
    layers.layer2.style.transform = `translate3d(${smoothMouseX * -17}px, ${smoothMouseY * -14 + s2}px, 0) scale(1.15)`;
  }

  if (layers.glow) {
    layers.glow.style.transform = `translate3d(${smoothMouseX * 14}px, ${smoothMouseY * 14 + smoothScrollY * 0.07}px, 0)`;
  }

  if (layers.lanternOverlay) {
    layers.lanternOverlay.style.transform = `translate3d(${smoothMouseX * 8}px, ${smoothScrollY * 0.06}px, 0)`;
  }

  requestAnimationFrame(animateBackground);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealItems.forEach((item) => observer.observe(item));

eventButtons.forEach((button) => {
  button.addEventListener("click", () => {
    eventButtons.forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");
  });
});

const RSVP_CONFIG = window.WEDDING_RSVP_CONFIG || {};
const RSVP_EMAIL = RSVP_CONFIG.fallbackEmail || "meeranisare8@gmail.com";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const mainRsvpForm = document.querySelector("#main-rsvp-form");
const mainRsvpSuccess = document.querySelector("#main-rsvp-success");
const mainRsvpError = document.querySelector("#main-rsvp-error");
const mainRsvpSubmit = document.querySelector("#main-rsvp-submit");

function showRsvpSuccess(guestName, options = {}) {
  if (!mainRsvpForm || !mainRsvpSuccess) return;
  mainRsvpForm.classList.add("is-hidden");
  mainRsvpSuccess.classList.remove("is-hidden");
  mainRsvpSuccess.querySelector(".rsvp-success-title").textContent = guestName
    ? `Thank you, ${guestName}!`
    : "Thank you!";

  const textEl = mainRsvpSuccess.querySelector(".rsvp-success-text");
  if (textEl) {
    textEl.textContent = options.viaMailto
      ? "Your email app should open with your RSVP details — please tap Send to complete your response."
      : "Your RSVP has been received. We cannot wait to celebrate with you.";
  }
}

function setRsvpError(message) {
  if (!mainRsvpError) return;
  mainRsvpError.textContent = message;
  mainRsvpError.classList.remove("is-hidden");
}

function clearRsvpError() {
  if (!mainRsvpError) return;
  mainRsvpError.textContent = "";
  mainRsvpError.classList.add("is-hidden");
}

function getRsvpPayload() {
  const name = mainRsvpForm.querySelector("#main-rsvp-name");
  const attending = mainRsvpForm.querySelector("#main-rsvp-attending");
  const attendingLabel =
    mainRsvpForm.querySelector(".rsvp-select-value")?.textContent?.trim() || attending.value;
  const ceremonies = [...mainRsvpForm.querySelectorAll('input[name="events"]:checked')]
    .map((input) => input.nextElementSibling?.textContent?.trim() || input.value)
    .join(", ");

  return {
    name: name.value.trim(),
    attendingValue: attending.value,
    attendingLabel,
    ceremonies: ceremonies || "None selected",
  };
}

async function submitRsvpViaWeb3Forms(accessKey, payload) {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: "Wedding RSVP — Main Invitation",
      from_name: "Wedding Invitation RSVP",
      name: payload.name,
      attending: payload.attendingLabel,
      ceremonies: payload.ceremonies,
      botcheck: "",
    }),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.success) {
    throw new Error(data?.message || "Web3Forms request failed");
  }
}

function openRsvpMailto(payload) {
  const subject = encodeURIComponent("Wedding RSVP — Main Invitation");
  const body = encodeURIComponent(
    [
      "Wedding RSVP",
      "",
      `Name: ${payload.name}`,
      `Attending: ${payload.attendingLabel}`,
      `Ceremonies: ${payload.ceremonies}`,
    ].join("\n")
  );

  window.location.href = `mailto:${RSVP_EMAIL}?subject=${subject}&body=${body}`;
}

async function submitRsvp(payload) {
  const accessKey = RSVP_CONFIG.web3formsAccessKey?.trim();

  if (accessKey) {
    try {
      await submitRsvpViaWeb3Forms(accessKey, payload);
      showRsvpSuccess(payload.name);
      return;
    } catch (error) {
      console.warn("Web3Forms RSVP failed, using email fallback:", error);
    }
  }

  openRsvpMailto(payload);
  showRsvpSuccess(payload.name, { viaMailto: true });
}

if (mainRsvpForm && mainRsvpSuccess) {
  if (new URLSearchParams(window.location.search).get("rsvp") === "success") {
    showRsvpSuccess();
  }

  document.querySelectorAll("[data-rsvp-select]").forEach((selectRoot) => {
    const hiddenInput = selectRoot.querySelector('input[type="hidden"]');
    const trigger = selectRoot.querySelector(".rsvp-select-trigger");
    const valueEl = selectRoot.querySelector(".rsvp-select-value");
    const menu = selectRoot.querySelector(".rsvp-select-menu");
    const options = selectRoot.querySelectorAll(".rsvp-select-option");

    if (!hiddenInput || !trigger || !valueEl || !menu) {
      return;
    }

    function closeMenu() {
      menu.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    }

    function openMenu() {
      menu.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
    }

    function selectOption(option) {
      const value = option.dataset.value || "";
      const label = option.textContent?.trim() || "";

      hiddenInput.value = value;
      valueEl.textContent = label;
      valueEl.classList.remove("is-placeholder");

      options.forEach((item) => item.classList.toggle("is-selected", item === option));
      closeMenu();
    }

    trigger.addEventListener("click", () => {
      if (menu.hidden) {
        openMenu();
        return;
      }
      closeMenu();
    });

    options.forEach((option) => {
      option.addEventListener("click", () => selectOption(option));
    });

    document.addEventListener("click", (event) => {
      if (!selectRoot.contains(event.target)) {
        closeMenu();
      }
    });
  });

  mainRsvpForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = mainRsvpForm.querySelector("#main-rsvp-name");
    const attending = mainRsvpForm.querySelector("#main-rsvp-attending");
    const honey = mainRsvpForm.querySelector('input[name="_honey"]');

    if (honey && honey.value.trim()) {
      return;
    }

    if (!name.value.trim() || !attending.value) {
      if (!attending.value) {
        attending.reportValidity();
      } else {
        mainRsvpForm.reportValidity();
      }
      return;
    }

    const payload = getRsvpPayload();
    clearRsvpError();

    if (mainRsvpSubmit) {
      mainRsvpSubmit.disabled = true;
      mainRsvpSubmit.textContent = "Sending…";
    }

    try {
      await submitRsvp(payload);
    } catch {
      setRsvpError(
        `We could not send your RSVP right now. Please email ${RSVP_EMAIL} directly with your name and attending status.`
      );
    } finally {
      if (mainRsvpSubmit) {
        mainRsvpSubmit.disabled = false;
        mainRsvpSubmit.textContent = "Submit RSVP";
      }
    }
  });
}

const bgMusic = document.querySelector("#bg-music");
const musicToggle = document.querySelector("#music-toggle");
const musicState = window.WeddingMusicState || null;
const MUSIC_STORAGE_KEY = musicState?.MUSIC_PLAYING_KEY || "wedding-music-playing";
let lastSavedMusicAt = 0;

function shouldAutoPlayMusic() {
  if (musicState) return musicState.shouldAutoPlayMusic();
  return sessionStorage.getItem(MUSIC_STORAGE_KEY) !== "0";
}

function applySavedMusicTime() {
  if (musicState && bgMusic) {
    musicState.applySavedMusicTime(bgMusic);
  }
}

function persistMusicState(playing, currentTime, userPaused) {
  if (!musicState) return;

  var payload = {};
  if (typeof playing === "boolean") payload.playing = playing;
  if (typeof currentTime === "number") payload.currentTime = currentTime;
  if (typeof userPaused === "boolean") payload.userPaused = userPaused;
  musicState.saveMusicState(payload);
}

function persistMusicBeforeLeave() {
  if (!bgMusic || !musicState) return;
  if (musicState.wasUserPaused()) return;

  musicState.saveMusicState({
    playing: !bgMusic.paused && !bgMusic.ended && bgMusic.currentTime > 0,
    currentTime: bgMusic.currentTime,
  });
}

function getMusicSrc() {
  if (window.WEDDING_MUSIC_SRC) {
    return window.WEDDING_MUSIC_SRC;
  }

  var meta = document.querySelector('meta[name="wedding-base-path"]');
  var base = "/";
  if (meta && meta.getAttribute("content")) {
    var value = meta.getAttribute("content").trim();
    base = value.endsWith("/") ? value : value + "/";
  } else {
    var segments = window.location.pathname.split("/").filter(Boolean);
    if (segments.length > 0 && segments[0] === "wedding-invitation") {
      base = "/wedding-invitation/";
    }
  }

  return new URL("music/whatsapp-audio.mp3", window.location.origin + base).href;
}

function ensureMusicSource() {
  if (!bgMusic) return;
  const src = getMusicSrc();
  if (!bgMusic.src || bgMusic.src !== src) {
    bgMusic.src = src;
    bgMusic.load();
  }
}

function setMusicUi(isPlaying) {
  if (!musicToggle) return;
  musicToggle.setAttribute("aria-pressed", isPlaying ? "true" : "false");
  musicToggle.setAttribute("aria-label", isPlaying ? "Pause background music" : "Play background music");
  musicToggle.setAttribute("title", isPlaying ? "Pause wedding music" : "Play wedding music");
  musicToggle.querySelector(".music-toggle-icon").textContent = isPlaying ? "❚❚" : "♪";
  musicToggle.querySelector(".music-toggle-label").textContent = isPlaying ? "Pause music" : "Play music";
}

async function playBackgroundMusic(force = false) {
  if (!bgMusic) return false;
  if (!force && !shouldAutoPlayMusic()) return false;

  ensureMusicSource();
  applySavedMusicTime();
  bgMusic.volume = 0.35;

  try {
    await bgMusic.play();
    if (musicState) musicState.markUserPlaying(bgMusic.currentTime);
    setMusicUi(true);
    return true;
  } catch {
    setMusicUi(false);
    return false;
  }
}

function startMusicFromUserGesture(force = false) {
  if (!bgMusic) return;
  if (!force && !shouldAutoPlayMusic()) return;

  ensureMusicSource();
  applySavedMusicTime();
  bgMusic.volume = 0.35;

  const playPromise = bgMusic.play();
  if (!playPromise) return;

  playPromise
    .then(() => {
      if (musicState) musicState.markUserPlaying(bgMusic.currentTime);
      setMusicUi(true);
    })
    .catch(() => {
      setMusicUi(false);
    });
}

function pauseBackgroundMusic() {
  if (!bgMusic) return;
  bgMusic.pause();
  if (musicState) musicState.markUserPaused(bgMusic.currentTime);
  setMusicUi(false);
}

function bootBackgroundMusic() {
  if (!bgMusic || !musicToggle) return;

  ensureMusicSource();
  bgMusic.volume = 0.35;

  bgMusic.addEventListener("error", () => {
    setMusicUi(false);
  });

  bgMusic.addEventListener("loadedmetadata", applySavedMusicTime);

  bgMusic.addEventListener("play", () => {
    if (musicState) musicState.markUserPlaying(bgMusic.currentTime);
    setMusicUi(true);
  });

  bgMusic.addEventListener("pause", () => {
    if (bgMusic.ended) return;
    if (musicState && musicState.wasUserPaused()) {
      setMusicUi(false);
    }
  });

  bgMusic.addEventListener("timeupdate", () => {
    if (bgMusic.paused || (musicState && musicState.wasUserPaused())) return;
    const now = Date.now();
    if (now - lastSavedMusicAt < 750) return;
    lastSavedMusicAt = now;
    persistMusicState(true, bgMusic.currentTime);
  });

  musicToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    if (bgMusic.paused) {
      startMusicFromUserGesture(true);
      return;
    }
    pauseBackgroundMusic();
  });

  const tryAutoPlay = () => {
    if (musicState && musicState.wasUserPaused()) return;
    if (!bgMusic || !bgMusic.paused) return;
    startMusicFromUserGesture(true);
  };

  tryAutoPlay();
  bgMusic.addEventListener("loadeddata", tryAutoPlay);
  bgMusic.addEventListener("canplay", tryAutoPlay);
  bgMusic.addEventListener("canplaythrough", tryAutoPlay);
  window.addEventListener("load", tryAutoPlay);
  window.addEventListener("pagehide", persistMusicBeforeLeave);

  document.querySelectorAll('a.event-button[href="/haldi"], a.event-button[href="/nikah"], a.event-button[href="/walima"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (musicState) {
        musicState.markMusicForEventPage(bgMusic ? bgMusic.currentTime : musicState.getSavedMusicTime());
      }
    });
  });

  document.querySelectorAll('a[href="/"], a[href="/index.html"], a[href="index.html"]').forEach((link) => {
    link.addEventListener("click", persistMusicBeforeLeave);
  });

  if (envelopeOverlay) {
    envelopeOverlay.addEventListener("pointerdown", tryAutoPlay, { passive: true });
    envelopeOverlay.addEventListener("click", tryAutoPlay);
  }

  document.addEventListener("click", tryAutoPlay, { once: true });
  document.addEventListener("touchstart", tryAutoPlay, { once: true, passive: true });
  document.addEventListener("keydown", tryAutoPlay, { once: true });
}

if (bgMusic && musicToggle) {
  bootBackgroundMusic();
}

animateBackground();
