(function () {
  function isEventPage() {
    return /\/(haldi|nikah|walima)(?:\.html)?\/?$/i.test(window.location.pathname);
  }

  var bgMusic = document.querySelector("#bg-music");
  var musicToggle = document.querySelector("#music-toggle");
  var musicState = window.WeddingMusicState || null;
  var onEventPage = isEventPage();
  var lastSavedMusicAt = 0;

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

  function ensureMusicSource() {
    var src = getMusicSrc();
    if (!bgMusic.src || bgMusic.src !== src) {
      bgMusic.src = src;
      bgMusic.load();
    }
  }

  function setMusicUi(isPlaying) {
    musicToggle.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    musicToggle.setAttribute("aria-label", isPlaying ? "Pause background music" : "Play background music");
    musicToggle.setAttribute("title", isPlaying ? "Pause wedding music" : "Play wedding music");
    musicToggle.querySelector(".music-toggle-icon").textContent = isPlaying ? "❚❚" : "♪";
    musicToggle.querySelector(".music-toggle-label").textContent = isPlaying ? "Pause music" : "Play music";
  }

  function startMusicFromUserGesture(force) {
    if (!force && musicState && musicState.wasUserPaused()) return;

    ensureMusicSource();
    applySavedMusicTime();
    bgMusic.volume = 0.35;

    var playPromise = bgMusic.play();
    if (!playPromise) return;

    playPromise
      .then(function () {
        if (musicState) musicState.markUserPlaying(bgMusic.currentTime);
        setMusicUi(true);
      })
      .catch(function () {
        setMusicUi(false);
      });
  }

  function pauseBackgroundMusic() {
    bgMusic.pause();
    if (musicState) musicState.markUserPaused(bgMusic.currentTime);
    setMusicUi(false);
  }

  function bootBackgroundMusic() {
    if (onEventPage && musicState) {
      musicState.markMusicForEventPage(musicState.getSavedMusicTime());
    }

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
      startMusicFromUserGesture(true);
    }

    tryAutoPlay();
    bgMusic.addEventListener("loadeddata", tryAutoPlay);
    bgMusic.addEventListener("canplay", tryAutoPlay);
    bgMusic.addEventListener("canplaythrough", tryAutoPlay);
    window.addEventListener("load", tryAutoPlay);
    window.addEventListener("pagehide", persistMusicBeforeLeave);

    if (onEventPage) {
      document.addEventListener("click", tryAutoPlay);
      document.addEventListener("touchstart", tryAutoPlay, { passive: true });
      document.addEventListener("keydown", tryAutoPlay);
    } else {
      document.addEventListener("click", tryAutoPlay, { once: true });
      document.addEventListener("touchstart", tryAutoPlay, { once: true, passive: true });
      document.addEventListener("keydown", tryAutoPlay, { once: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootBackgroundMusic);
  } else {
    bootBackgroundMusic();
  }
})();
