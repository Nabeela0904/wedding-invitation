(function () {
  function isEventPage() {
    return /\/(haldi|nikah|walima)(?:\.html)?\/?$/i.test(window.location.pathname);
  }

  var GESTURE_WINDOW_MS = 4000;
  var bgMusic = document.querySelector("#bg-music");
  var musicToggle = document.querySelector("#music-toggle");
  var musicState = window.WeddingMusicState || null;
  var onEventPage = isEventPage();
  var lastSavedMusicAt = 0;
  var lastUserGestureAt = 0;
  var pendingPlayFromGesture = false;
  var shouldUnmuteOnGesture = false;

  if (!bgMusic || !musicToggle) return;

  function applySavedMusicTime() {
    if (musicState) {
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
    if (!musicState || musicState.wasUserPaused()) return;

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

  function musicSrcMatches(src) {
    if (!bgMusic.src) return false;

    try {
      return new URL(bgMusic.src).href === new URL(src, window.location.origin).href;
    } catch (error) {
      return bgMusic.src.indexOf("whatsapp-audio.mp3") !== -1;
    }
  }

  function ensureMusicSource() {
    var src = getMusicSrc();
    if (!musicSrcMatches(src)) {
      bgMusic.src = src;
      bgMusic.load();
    }
  }

  function hasRecentUserGesture() {
    return Date.now() - lastUserGestureAt < GESTURE_WINDOW_MS;
  }

  function markUserGesture(event) {
    if (event && event.target && event.target.closest && event.target.closest("#music-toggle")) {
      return;
    }

    lastUserGestureAt = Date.now();
    pendingPlayFromGesture = true;

    if (shouldUnmuteOnGesture) {
      bgMusic.muted = false;
      shouldUnmuteOnGesture = false;
      bgMusic.volume = 0.35;
    }

    tryStartPlayback(true);
  }

  function setMusicUi(isPlaying) {
    musicToggle.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    musicToggle.setAttribute("aria-label", isPlaying ? "Pause background music" : "Play background music");
    musicToggle.setAttribute("title", isPlaying ? "Pause wedding music" : "Play wedding music");
    musicToggle.querySelector(".music-toggle-icon").textContent = isPlaying ? "❚❚" : "♪";
    musicToggle.querySelector(".music-toggle-label").textContent = isPlaying ? "Pause music" : "Play music";
  }

  function tryStartPlayback(force) {
    if (!force && musicState && musicState.wasUserPaused()) {
      pendingPlayFromGesture = false;
      return;
    }

    if (!bgMusic.paused && !bgMusic.ended) {
      pendingPlayFromGesture = false;
      setMusicUi(true);
      return;
    }

    var canAttempt = force || pendingPlayFromGesture || hasRecentUserGesture();
    if (!canAttempt) return;

    ensureMusicSource();
    applySavedMusicTime();
    bgMusic.volume = 0.35;

    var playPromise = bgMusic.play();
    if (!playPromise) return;

    playPromise
      .then(function () {
        bgMusic.muted = false;
        shouldUnmuteOnGesture = false;
        pendingPlayFromGesture = false;
        if (musicState) musicState.markUserPlaying(bgMusic.currentTime);
        setMusicUi(true);
      })
      .catch(function () {
        if (!hasRecentUserGesture() && !pendingPlayFromGesture) {
          setMusicUi(false);
        }
      });
  }

  function startMusicFromUserGesture(force) {
    markUserGesture();
    tryStartPlayback(force !== false);
  }

  function tryMutedAutoplay() {
    if (musicState && musicState.wasUserPaused()) return;

    ensureMusicSource();
    applySavedMusicTime();
    bgMusic.volume = 0.35;
    bgMusic.muted = true;
    shouldUnmuteOnGesture = true;

    var playPromise = bgMusic.play();
    if (!playPromise) return;

    playPromise
      .then(function () {
        if (musicState) musicState.markUserPlaying(bgMusic.currentTime);
        setMusicUi(true);
      })
      .catch(function () {
        bgMusic.muted = false;
        shouldUnmuteOnGesture = false;
        setMusicUi(false);
      });
  }

  function pauseBackgroundMusic() {
    bgMusic.pause();
    bgMusic.muted = false;
    shouldUnmuteOnGesture = false;
    pendingPlayFromGesture = false;
    if (musicState) musicState.markUserPaused(bgMusic.currentTime);
    setMusicUi(false);
  }

  function persistMusicForEventNavigation() {
    if (!musicState || musicState.wasUserPaused()) return;

    var currentTime = bgMusic ? bgMusic.currentTime : musicState.getSavedMusicTime();
    var isPlaying = !!(bgMusic && !bgMusic.paused && !bgMusic.ended);
    musicState.persistMusicForEventNavigation(currentTime, isPlaying);
  }

  function resumeContinuedMusic() {
    bgMusic.muted = false;
    shouldUnmuteOnGesture = false;
    ensureMusicSource();
    applySavedMusicTime();
    tryStartPlayback(true);
  }

  function bootBackgroundMusic() {
    ensureMusicSource();
    bgMusic.volume = 0.35;

    bgMusic.addEventListener("error", function () {
      setMusicUi(false);
    });

    bgMusic.addEventListener("loadedmetadata", applySavedMusicTime);

    bgMusic.addEventListener("play", function () {
      if (musicState) musicState.markUserPlaying(bgMusic.currentTime);
      setMusicUi(true);
    });

    bgMusic.addEventListener("pause", function () {
      if (bgMusic.ended) return;
      if (musicState && musicState.wasUserPaused()) {
        setMusicUi(false);
      }
    });

    bgMusic.addEventListener("timeupdate", function () {
      if (bgMusic.paused || (musicState && musicState.wasUserPaused())) return;
      var now = Date.now();
      if (now - lastSavedMusicAt < 750) return;
      lastSavedMusicAt = now;
      persistMusicState(true, bgMusic.currentTime);
    });

    musicToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      if (bgMusic.paused) {
        startMusicFromUserGesture(true);
        return;
      }
      pauseBackgroundMusic();
    });

    function tryAutoPlay() {
      if (musicState && musicState.wasUserPaused()) return;
      if (!bgMusic.paused) return;

      var shouldResume =
        musicState && musicState.shouldResumeMusic && musicState.shouldResumeMusic();
      tryStartPlayback(shouldResume || pendingPlayFromGesture || hasRecentUserGesture());
    }

    if (musicState && musicState.shouldResumeMusic && musicState.shouldResumeMusic()) {
      resumeContinuedMusic();
    } else {
      tryMutedAutoplay();
    }

    bgMusic.addEventListener("loadeddata", tryAutoPlay);
    bgMusic.addEventListener("canplay", tryAutoPlay);
    bgMusic.addEventListener("canplaythrough", tryAutoPlay);
    window.addEventListener("load", tryAutoPlay);
    window.addEventListener("pagehide", persistMusicBeforeLeave);

    document.addEventListener("pointerdown", markUserGesture, { passive: true, capture: true });
    document.addEventListener("touchstart", markUserGesture, { passive: true, capture: true });
    document.addEventListener("keydown", markUserGesture, { capture: true });

    var envelopeOverlay = document.getElementById("envelope-overlay");
    if (envelopeOverlay) {
      envelopeOverlay.addEventListener("pointerdown", markUserGesture, { passive: true });
      envelopeOverlay.addEventListener("click", markUserGesture);
    }

    document.querySelectorAll('a.event-button[data-event="haldi"], a.event-button[data-event="nikah"], a.event-button[data-event="valima"]').forEach(function (link) {
      link.addEventListener("pointerdown", persistMusicForEventNavigation, { capture: true });
      link.addEventListener("click", persistMusicForEventNavigation, { capture: true });
    });

    document.querySelectorAll('a.main-invitation-link, a[href="/"], a[href="/index.html"], a[href="index.html"], a[href*="index.html?view=invitation"]').forEach(function (link) {
      link.addEventListener("pointerdown", persistMusicForEventNavigation, { capture: true });
      link.addEventListener("click", function () {
        persistMusicForEventNavigation();
        persistMusicBeforeLeave();
      }, { capture: true });
    });
  }

  window.WeddingMusic = {
    startFromUserGesture: startMusicFromUserGesture,
    markUserGesture: markUserGesture,
    tryStartPlayback: tryStartPlayback,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootBackgroundMusic);
  } else {
    bootBackgroundMusic();
  }
})();
