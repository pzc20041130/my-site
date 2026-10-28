# my-site

A small personal site, built while learning HTML, CSS and JavaScript.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home: hero, name, three ways in, About |
| `quotes.html` | Sixteen quotes, one picked at random at the top |
| `projects.html` | Six project ideas, with the tech each one needs |
| `game.html` | Snake: a canvas game, arrow keys or the on-screen pad |

`nav.js` builds the header and footer for every page from one list (`PAGES`),
so adding a page means adding one line there — no markup to copy between files.
`quotes.js` fills the random quote from the list already on the page, so the
text lives in one place only. `snake.js` draws the whole game on a canvas, with
no library and no images.

## Run it

Open `index.html` in a browser. In VS Code, right-click it and choose
**Open with Live Server** if you want the page to reload as you edit.

## Style

Everything lives in `style.css`: the cream nav, mint cards, green rules and the
muted grey for secondary text. Numbers on the ideas page are drawn with CSS
counters, so reordering the list never means renumbering it by hand.
