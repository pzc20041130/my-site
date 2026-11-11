/* Click a screenshot to see it full size.
 *
 * The thumbnails on the design page are cropped to a card, so this opens the
 * original in a dark overlay: click anywhere to close, or press Escape.
 */
(function () {
  "use strict";

  const shots = document.querySelectorAll("[data-zoom]");
  if (!shots.length) return;

  const overlay = document.createElement("div");
  overlay.className = "zoom";
  overlay.hidden = true;
  overlay.innerHTML =
    '<button class="zoom-close" type="button" aria-label="Close">&times;</button>' +
    '<img alt="">';
  document.body.appendChild(overlay);

  const big = overlay.querySelector("img");

  function open(src, alt) {
    big.src = src;
    big.alt = alt || "";
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.hidden = true;
    big.removeAttribute("src");
    document.body.style.overflow = "";
  }

  shots.forEach((shot) => {
    shot.addEventListener("click", () => open(shot.src, shot.alt));
    shot.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(shot.src, shot.alt);
      }
    });
  });

  overlay.addEventListener("click", (event) => {
    if (event.target !== big) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) close();
  });
})();
