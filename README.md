# my-site

A small personal site, built while learning HTML, CSS and JavaScript.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home: hero, name, three ways in, About |
| `quotes.html` | Sixteen quotes, one picked at random at the top |
| `projects.html` | Six project ideas, with the tech each one needs |
| `game.html` | One link to 空中飞人 (Air Trapeze), a dark-comedy forex trading game |

`nav.js` builds the header and footer for every page from one list (`PAGES`),
so adding a page means adding one line there — no markup to copy between files.
`quotes.js` fills the random quote from the list already on the page, so the
text lives in one place only. The game itself lives in `air-trapeze/`, copied
unchanged from the standalone project; `game.html` is just the doorway.

`assets/` holds the site icon — `icon.svg` as the source, plus 512/192/180 PNGs —
and `manifest.webmanifest` makes the site installable, so adding it to a phone's
home screen gives it a real icon instead of a screenshot.

## Deploy

The site is static: no build step, no server. GitHub Pages serves it straight
from `main` at <https://pzc20041130.github.io/my-site/>, and the game sits at
`/air-trapeze/`.

## Run it

Open `index.html` in a browser. In VS Code, right-click it and choose
**Open with Live Server** if you want the page to reload as you edit.

## Style

Everything lives in `style.css`: the cream nav, mint cards, green rules and the
muted grey for secondary text. Numbers on the ideas page are drawn with CSS
counters, so reordering the list never means renumbering it by hand.
