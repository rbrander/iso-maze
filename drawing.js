// drawing.js

const drawIsometricPlayer = (ctx) => {
  // always draw the player at the center
  // of the screen.  The player doesn't move, the map moves.
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, 10, 0, Math.PI * 2);
  ctx.fill();
};

const drawIsometricFloorTile = (ctx, x, y, playerX, playerY, color = '#ccc') => {
  const [isoX, isoY] = toIso(x, y, HALF_TILE_SIZE, HALF_TILE_SIZE);
  const [isoPlayerX, isoPlayerY] = toIso(playerX, playerY, HALF_TILE_SIZE, HALF_TILE_SIZE);
  const topPoint = [0, -MID_TILE_HEIGHT];
  const rightPoint = [+MID_TILE_WIDTH, 0];
  const bottomPoint = [0, +MID_TILE_HEIGHT];
  const leftPoint = [-MID_TILE_WIDTH, 0];

  const halfCanvasWidth = ctx.canvas.width / 2;
  const halfCanvasHeight = ctx.canvas.height / 2;
  const xOffset = isoX - isoPlayerX + halfCanvasWidth;
  const yOffset = isoY - isoPlayerY + halfCanvasHeight;
  ctx.translate(xOffset, yOffset);

  ctx.beginPath();
  ctx.moveTo(...topPoint);
  ctx.lineTo(...rightPoint);
  ctx.lineTo(...bottomPoint);
  ctx.lineTo(...leftPoint);
  ctx.lineTo(...topPoint);
  ctx.lineTo(...rightPoint);
  ctx.fillStyle = color;
  ctx.fill();

  ctx.translate(-xOffset, -yOffset);
};

const drawIsometricWall = (ctx, x, y) => {
  // draw a cube sprite

}

const drawIsometricView = (ctx, playerX, playerY) => {
  /*
  TODO
  - draw an isometric cube sprite for walls
  - move the map, not the player
  - player is centered
  - draw sprite for player
  - animate player
  - draw floor tile
  */
  for (let y = 0; y < MAZE.length; y++) {
    for (let x = 0; x < MAZE[y].length; x++) {
      const isWall =  (MAZE[y][x] === 1);
      if (isWall) {
        // drawIsometricWall(ctx, x, y);
        drawIsometricFloorTile(ctx, x, y, playerX, playerY, '#333');
      } else {
        drawIsometricFloorTile(ctx, x, y, playerX, playerY);
      }
      if (playerX === x && playerY === y) {
        drawIsometricPlayer(ctx);
      }
    }
  }
};

// place a map in the upper right
const drawMiniMap = (ctx, playerX, playerY) => {
  // mapOffsetX and mapOffsetY are top left corner of minimap
  const mapOffsetX = ctx.canvas.width - MINI_MAP_WIDTH - MINI_MAP_MARGIN;
  const mapOffsetY = MINI_MAP_MARGIN;

  // clear the map background
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(mapOffsetX, mapOffsetY, MINI_MAP_WIDTH, MINI_MAP_HEIGHT);

  // draw the maze inside the minimap
  const cellSize = Math.floor(MINI_MAP_WIDTH / MAZE.length);
  const halfCell = Math.floor(cellSize / 2);
  for (let y = 0; y < MAZE.length; y++) {
    for (let x = 0; x < MAZE[y].length; x++) {
      const isWall =  (MAZE[y][x] === 1);
      ctx.fillStyle = isWall ? MINI_MAP_WALL_COLOR : MINI_MAP_FLOOR_COLOR;
      const cellX = mapOffsetX + x * cellSize;
      const cellY = mapOffsetY + y * cellSize
      ctx.fillRect(cellX, cellY, cellSize, cellSize);

      // draw a black dot where the player is
      if (playerX === x && playerY === y) {
        ctx.fillStyle = MINI_MAP_PLAYER_COLOR;
        ctx.beginPath();
        ctx.arc(cellX + halfCell, cellY + halfCell, halfCell / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
};

const clearBackground = (ctx) => {
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
