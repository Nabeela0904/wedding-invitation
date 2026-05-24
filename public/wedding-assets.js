(function () {
  function getDeployBase() {
    var meta = document.querySelector('meta[name="wedding-base-path"]');
    if (meta && meta.getAttribute("content")) {
      var value = meta.getAttribute("content").trim();
      return value.endsWith("/") ? value : value + "/";
    }

    var segments = window.location.pathname.split("/").filter(Boolean);
    if (segments.length > 0 && segments[0] === "wedding-invitation") {
      return "/wedding-invitation/";
    }

    return "/";
  }

  function weddingAssetPath(relativePath) {
    var clean = String(relativePath).replace(/^\/+/, "");
    return new URL(clean, window.location.origin + getDeployBase()).href;
  }

  window.WEDDING_MUSIC_SRC = weddingAssetPath("music/gehra-hua-instrumental.mp3");
})();
