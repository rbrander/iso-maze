// drawing.js

// draws a section of the tile sprite sheet
// onto a given canvas at coordinates (x,y)
// The source object is the source x, y, width, height
const drawSprite = (ctx, x, y, source) => {
  // if the image isn't loaded, don't attempt to draw it
  if (!TILE_SHEET_IMAGE.complete) {
    return;
  }

  const aspectRatio = source.width/source.height;
  const aspectHeight = TILE_WIDTH / aspectRatio;
  const destination = {
    x: x - HALF_TILE_WIDTH,
    // the Y is based on the center of the iso tile at the bottom of the sprite
    // which is the height minus half the tile height
    y: y - (aspectHeight - HALF_TILE_HEIGHT),
    width: TILE_WIDTH,
    height: aspectHeight
  };
  ctx.drawImage(
    TILE_SHEET_IMAGE,
    source.x, source.y, source.width, source.height,
    destination.x, destination.y, destination.width, destination.height
  );
}

const drawIsometricPlayer = (ctx) => {
  // always draw the player at the center
  // of the screen.  The player doesn't move, the map moves.
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, 10, 0, Math.PI * 2);
  ctx.fill();
};

const drawIsometricFloorTile = (ctx, x, y, playerX, playerY, isWall) => {
  const [isoX, isoY] = toIso(x, y, HALF_TILE_SIZE, HALF_TILE_SIZE);
  const [isoPlayerX, isoPlayerY] = toIso(playerX, playerY, HALF_TILE_SIZE, HALF_TILE_SIZE);

  const halfCanvasWidth = ctx.canvas.width / 2;
  const halfCanvasHeight = ctx.canvas.height / 2;
  const xOffset = isoX - isoPlayerX + halfCanvasWidth;
  const yOffset = isoY - isoPlayerY + halfCanvasHeight;



  const numTiles = FOG_RADIUS + 2;
  const isYNearPlayer = Math.abs(y - playerY) < numTiles;
  const isXNearPlayer = Math.abs(x - playerX) < numTiles;
  const isNearPlayer = isXNearPlayer && isYNearPlayer;

  if (!isNearPlayer) {
    return;
  }

  const xDiff = (playerX - x);
  const yDiff = (y - playerY);
  const isInFront = xDiff + yDiff > 0 && Math.abs(xDiff) <= FOG_RADIUS + 1

  const shouldFade = isNearPlayer


  ctx.save();
  ctx.translate(xOffset, yOffset);

  /*
  // draw a diamond around 0,0
  const topPoint = [0, -HALF_TILE_HEIGHT];
  const rightPoint = [+HALF_TILE_WIDTH, 0];
  const bottomPoint = [0, +HALF_TILE_HEIGHT];
  const leftPoint = [-HALF_TILE_WIDTH, 0];
  ctx.beginPath();
  ctx.moveTo(...topPoint);
  ctx.lineTo(...rightPoint);
  ctx.lineTo(...bottomPoint);
  ctx.lineTo(...leftPoint);
  ctx.lineTo(...topPoint);
  ctx.lineTo(...rightPoint);
  ctx.fillStyle = isWall ? `#cccccc${isInFront ? 'cc' : 'ff'}` : '#666';
  ctx.fill();
  */

  /*
  // coordinate label
  ctx.font = `${TILE_SIZE / 6}px Arial`;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText(`(${x},${y})`, 0, 0);
  */

  ctx.globalAlpha = 1.0;
  if (isWall) {
    ctx.globalAlpha = isInFront ? 0.3 : 1.0;
    drawSprite(ctx, 0, 0, TILE_TALL_TOWER2);
  } else {
    drawSprite(ctx, 0, TILE_SIZE / 10, TILE_SHORT1);
  }

  ctx.translate(-xOffset, -yOffset);
  ctx.restore();
};

const drawIsometricWall = (ctx, x, y) => {
  // draw a cube sprite
  const [isoX, isoY] = toIso(x, y, HALF_TILE_SIZE, HALF_TILE_SIZE);
  // drawSprite
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
    for (let x = MAZE[y].length - 1; x >= 0; x--) {
      const isWall =  (MAZE[y][x] === 1);
      drawIsometricFloorTile(ctx, x, y, playerX, playerY, isWall);
      /*
      if (isWall) {
        // drawIsometricWall(ctx, x, y);
        drawIsometricFloorTile(ctx, x, y, playerX, playerY, '#333');
      } else {
        drawIsometricFloorTile(ctx, x, y, playerX, playerY);
      }
      */
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
