/* Shared header and footer for every page.
 *
 * Each page keeps two empty slots and loads this file once:
 *
 *   <header id="site-header"></header>   ...   <footer id="site-footer"></footer>
 *   <script src="nav.js"></script>
 *
 * The whole site map lives in PAGES below. Add or edit a page there and every
 * page's navigation follows -- nothing to copy between files. That is the DRY
 * part: one list, one builder, no pasted markup.
 */
(function () {
  "use strict";

  // Order here is the order in the nav. "#about" is a section of the homepage,
  // not a page of its own.
  const PAGES = [
    { href: "index.html", label: "Home" },
    { href: "quotes.html", label: "Quotes" },
    { href: "projects.html", label: "Ideas" },
    { href: "game.html", label: "Game" },
    { href: "index.html#about", label: "About" },
  ];

  // "D:/my-site/quotes.html" -> "quotes.html"; a folder URL -> index.html.
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const hash = (location.hash || "").toLowerCase();

  // A link is the current page when the file matches and, when it carries an
  // anchor, that anchor matches too -- so Home is not highlighted while you
  // are reading the About section of the homepage.
  function isCurrent(href) {
    const parts = href.toLowerCase().split("#");
    return parts[0] === here && (parts[1] ? "#" + parts[1] === hash : hash === "");
  }

  function link({ href, label }) {
    const current = isCurrent(href);
    return `<a href="${href}"${current ? ' aria-current="page"' : ""}>${label}</a>`;
  }

  const header = document.getElementById("site-header");
  if (header) {
    header.classList.add("nav");
    header.innerHTML =
      '<a class="brand" href="index.html">&#9670; Pu Zichao</a>' +
      '<nav class="nav-links" aria-label="Main">' +
      PAGES.map(link).join("") +
      "</nav>" +
      '<a class="btn-contact" href="index.html#about">Contact</a>';
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.classList.add("footer");
    footer.innerHTML =
      `<span>&copy; ${new Date().getFullYear()} Pu Zichao</span>` +
      '<a href="#top">Back to top &uarr;</a>';
  }
})();
