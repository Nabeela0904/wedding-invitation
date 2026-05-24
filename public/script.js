const layers = {
  layer1: document.querySelector(".background-layer-1"),
  layer2: document.querySelector(".background-layer-2"),
  glow: document.querySelector(".background-glow"),
  lanternOverlay: document.querySelector(".lantern-overlay"),
};

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

const mainRsvpForm = document.querySelector("#main-rsvp-form");
const mainRsvpSuccess = document.querySelector("#main-rsvp-success");

if (mainRsvpForm && mainRsvpSuccess) {
  mainRsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = mainRsvpForm.querySelector("#main-rsvp-name");
    const attending = mainRsvpForm.querySelector("#main-rsvp-attending");

    if (!name.value.trim() || !attending.value) {
      mainRsvpForm.reportValidity();
      return;
    }

    const guestName = name.value.trim();
    mainRsvpForm.classList.add("is-hidden");
    mainRsvpSuccess.classList.remove("is-hidden");
    mainRsvpSuccess.querySelector(".rsvp-success-title").textContent = `Thank you, ${guestName}!`;
  });
}

const bgMusic = document.querySelector("#bg-music");
const musicToggle = document.querySelector("#music-toggle");
const MUSIC_STORAGE_KEY = "wedding-music-playing";

function setMusicUi(isPlaying) {
  if (!musicToggle) return;
  musicToggle.setAttribute("aria-pressed", isPlaying ? "true" : "false");
  musicToggle.setAttribute("aria-label", isPlaying ? "Pause background music" : "Play background music");
  musicToggle.querySelector(".music-toggle-icon").textContent = isPlaying ? "❚❚" : "♪";
  musicToggle.querySelector(".music-toggle-label").textContent = isPlaying ? "Music on" : "Play music";
}

async function playBackgroundMusic() {
  if (!bgMusic) return false;
  try {
    await bgMusic.play();
    sessionStorage.setItem(MUSIC_STORAGE_KEY, "1");
    setMusicUi(true);
    return true;
  } catch {
    return false;
  }
}

function pauseBackgroundMusic() {
  if (!bgMusic) return;
  bgMusic.pause();
  sessionStorage.setItem(MUSIC_STORAGE_KEY, "0");
  setMusicUi(false);
}

if (bgMusic && musicToggle) {
  bgMusic.volume = 0.35;

  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      void playBackgroundMusic();
      return;
    }
    pauseBackgroundMusic();
  });

  const resumeIfEnabled = () => {
    if (sessionStorage.getItem(MUSIC_STORAGE_KEY) === "1") {
      void playBackgroundMusic();
    }
  };

  resumeIfEnabled();
  document.addEventListener("click", resumeIfEnabled, { once: true });
  document.addEventListener("touchstart", resumeIfEnabled, { once: true });
}

animateBackground();
