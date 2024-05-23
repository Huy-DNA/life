import { Universe, Cell } from "./wasm/life.mjs";

const CELL_SIZE = 5;
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

const height = 64;
const width = 64;

const canvas = document.getElementById("life-canvas");
canvas.height = height;
canvas.width = width;

const ctx = canvas.getContext("2d");

const universe = Universe.new();

const renderLoop = () => {
  renderGrid();
  renderCells();
  requestAnimationFrame(renderLoop);
  universe.tick();
};

const renderGrid = () => {
  ctx.beginPath();

  ctx.strokeStyle = GRID_COLOR;

  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1), 0);
    ctx.lineTo(i * (CELL_SIZE + 1), (CELL_SIZE + 1) * height);
  }

  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0, j * (CELL_SIZE + 1));
    ctx.lineTo((CELL_SIZE + 1) * width, j * (CELL_SIZE + 1));
  }

  ctx.stroke();
};

const renderCells = () => {
  ctx.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      ctx.fillStyle = universe.get_status(row, col) === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE,
      );
    }
  }

  ctx.stroke();
};