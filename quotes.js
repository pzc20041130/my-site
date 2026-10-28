/* Random quote in the hero of the quotes page.
 *
 * The quotes are already in the page as <article class="quote">, so this file
 * reads them from there -- there is no second copy of the text to keep in
 * sync. The hero starts hidden and only appears once a quote has been picked,
 * so a browser with JavaScript off still gets the full list underneath.
 */
(function () {
  "use strict";

  const hero = document.getElementById("quote-hero");
  const quotes = document.querySelectorAll(".quote");
  if (!hero || !quotes.length) return;

  const body = hero.querySelector("[data-hero-text]");
  const meta = hero.querySelector("[data-hero-meta]");
  const button = hero.querySelector("button");

  let last = -1;

  function pick() {
    let index = Math.floor(Math.random() * quotes.length);
    // The same quote twice in a row would look like nothing happened.
    if (quotes.length > 1 && index === last) index = (index + 1) % quotes.length;
    last = index;
    return quotes[index];
  }

  // Copy the quote's own nodes, so a two-line quote keeps both lines, the
  // Chinese one keeps its lang attribute, and the comma before the source
  // (a text node, not an element) survives.
  function fill(target, source) {
    target.replaceChildren(...Array.from(source.childNodes, (node) => node.cloneNode(true)));
  }

  function show() {
    const quote = pick();
    fill(body, quote.querySelector("blockquote"));
    fill(meta, quote.querySelector("footer"));
    hero.hidden = false;
  }

  button.addEventListener("click", show);
  show();
})();
