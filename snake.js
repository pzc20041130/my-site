/* Snake, drawn on a canvas.
 *
 * No library and no images: the board, the snake and the food are all drawn
 * here, so the page stays one HTML file, one stylesheet and this script.
 * Arrow keys or WASD steer, Space pauses, and the best score survives a reload
 * in localStorage.
 */
(function () {
  "use strict";

  const canvas = document.getElementById("snake");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const CELL = 20;   // pixels per square
  const COLS = 20;
  const ROWS = 20;
  const STEP = 110;  // milliseconds per move

  const scoreEl = document.querySelector("[data-score]");
  const bestEl = document.querySelector("[data-best]");
  const statusEl = document.querySelector("[data-status]");
  const button = document.querySelector("[data-start]");

  const BEST_KEY = "snake-best";
  let best = Number(localStorage.getItem(BEST_KEY)) || 0;
  bestEl.textContent = String(best);

  const KEYS = {
    ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
    w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0],
  };
  const PAD = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

  let snake;
  let dir;
  let queued;
  let food;
  let score;
  let timer = 0;
  let state = "idle"; // idle | playing | paused | over

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function placeFood() {
    do {
      food = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    } while (snake.some((seg) => seg.x === food.x && seg.y === food.y));
  }

  // roundRect is not everywhere, so fall back to a plain square.
  function box(x, y, size, radius) {
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(x, y, size, size, radius);
    else ctx.rect(x, y, size, size);
    ctx.fill();
  }

  function draw() {
    const board = COLS * CELL;
    ctx.clearRect(0, 0, board, ROWS * CELL);

    ctx.fillStyle = "#edf7f1";
    ctx.fillRect(0, 0, board, ROWS * CELL);

    // Faint grid, so an empty board still reads as squares.
    ctx.strokeStyle = "rgba(47, 125, 94, 0.09)";
    ctx.lineWidth = 1;
    for (let i = 1; i < COLS; i += 1) {
      ctx.beginPath();
      ctx.moveTo(i * CELL + 0.5, 0);
      ctx.lineTo(i * CELL + 0.5, ROWS * CELL);
      ctx.stroke();
    }
    for (let j = 1; j < ROWS; j += 1) {
      ctx.beginPath();
      ctx.moveTo(0, j * CELL + 0.5);
      ctx.lineTo(board, j * CELL + 0.5);
      ctx.stroke();
    }

    ctx.fillStyle = "#b85b2e";
    ctx.beginPath();
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL * 0.3, 0, Math.PI * 2);
    ctx.fill();

    snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? "#2f7d5e" : "#5aa585";
      box(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, 5);
    });
  }

  function reset() {
    snake = [{ x: 9, y: 10 }, { x: 8, y: 10 }, { x: 7, y: 10 }];
    dir = { x: 1, y: 0 };
    queued = dir;
    score = 0;
    scoreEl.textContent = "0";
    placeFood();
  }

  function start() {
    reset();
    state = "playing";
    button.textContent = "Pause";
    setStatus("Go — arrow keys or WASD, Space to pause.");
    clearInterval(timer);
    timer = setInterval(tick, STEP);
    draw();
  }

  function pause() {
    state = "paused";
    clearInterval(timer);
    button.textContent = "Resume";
    setStatus("Paused.");
  }

  function resume() {
    state = "playing";
    button.textContent = "Pause";
    setStatus("Go — arrow keys or WASD, Space to pause.");
    timer = setInterval(tick, STEP);
  }

  function end() {
    state = "over";
    clearInterval(timer);
    button.textContent = "Play again";
    if (score > best) {
      best = score;
      localStorage.setItem(BEST_KEY, String(best));
      bestEl.textContent = String(best);
      setStatus(`Game over — ${score} point${score === 1 ? "" : "s"}, a new best.`);
    } else {
      setStatus(`Game over — ${score} point${score === 1 ? "" : "s"}. Best ${best}.`);
    }
  }

  // A direction is one step; the reverse of the current one is ignored, so the
  // snake cannot run into its own neck.
  function turn(dx, dy) {
    if (dir.x + dx === 0 && dir.y + dy === 0) return;
    queued = { x: dx, y: dy };
  }

  function tick() {
    dir = queued;
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
    const eating = head.x === food.x && head.y === food.y;

    const hitWall = head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS;
    // The tail vacates its square on a normal move, so it is not an obstacle
    // unless the snake is growing this tick.
    const body = eating ? snake : snake.slice(0, -1);
    const hitSelf = body.some((seg) => seg.x === head.x && seg.y === head.y);

    if (hitWall || hitSelf) {
      end();
      return;
    }

    snake.unshift(head);
    if (eating) {
      score += 1;
      scoreEl.textContent = String(score);
      placeFood();
    } else {
      snake.pop();
    }
    draw();
  }

  function steer(dx, dy) {
    if (state === "playing") turn(dx, dy);
    else if (state === "idle" || state === "over") {
      start();
      turn(dx, dy);
    }
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === " ") {
      event.preventDefault();
      if (state === "playing") pause();
      else if (state === "paused") resume();
      else start();
      return;
    }
    const move = KEYS[event.key] || KEYS[event.key.toLowerCase()];
    if (!move) return;
    event.preventDefault();
    steer(move[0], move[1]);
  });

  button.addEventListener("click", () => {
    if (state === "playing") pause();
    else if (state === "paused") resume();
    else start();
  });

  document.querySelectorAll("[data-dir]").forEach((pad) => {
    pad.addEventListener("click", () => {
      const move = PAD[pad.dataset.dir];
      if (move) steer(move[0], move[1]);
    });
  });

  // Leaving the tab pauses the game instead of letting it run into a wall.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && state === "playing") pause();
  });

  reset();
  draw();
})();
