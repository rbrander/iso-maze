// app.js

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// state
let playerX = 1, playerY = 1; // position within the maze

const update = (tick) => {
  // key handling
  processKeysDown();
};

const draw = (ctx, tick) => {
  clearBackground(ctx);
  drawIsometricView(ctx, playerX, playerY);
  drawMiniMap(ctx, playerX, playerY);
};

const loop = (tick) => {
  update(tick);
  draw(ctx, tick);
  requestAnimationFrame(loop);
};

const onTileSheetLoad = (e) => {
  console.log('tile sheet loaded');
};

const onResize = (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// init
;(function(){
  console.log('Isometric Maze');
  ctx.translate(0.5, 0.5);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('resize', onResize);
  onResize();
  TILE_SHEET_IMAGE.onload = onTileSheetLoad;
  TILE_SHEET_IMAGE.src = './dungeon_tiles_alpha.png';
  requestAnimationFrame(loop);
})();