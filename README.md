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
text lives in one place only.

The game is a separate project with its own repository and its own site —
<https://github.com/pzc20041130/air-trapeze> →
<https://pzc20041130.github.io/air-trapeze/>. `game.html` here is only the
doorway, one screenshot and a link out, so this repository never holds a second
copy of the code that could go stale.

`assets/` holds the site icon — `icon.svg` as the source, plus 512/192/180 PNGs —
and `manifest.webmanifest` makes the site installable, so adding it to a phone's
home screen gives it a real icon instead of a screenshot.

## Deploy

The site is static: no build step, no server. GitHub Pages serves it straight
from `main` at <https://pzc20041130.github.io/my-site/>.

## Run it

Open `index.html` in a browser. In VS Code, right-click it and choose
**Open with Live Server** if you want the page to reload as you edit.

## Style

Everything lives in `style.css`, in the colours 空中飞人 already uses: mint paper,
white panels, one deep green for anything that matters, and red only where the
market falls. Figures and labels are set in a monospace face, the page sits on a
faint graph-paper grid, and the hero is a candlestick chart
(`assets/hero-chart.svg`) instead of a photograph — the same one, drawn once,
never re-rendered.

Numbers on the ideas page and the entries on the home page are drawn with CSS
counters, so reordering a list never means renumbering it by hand.
