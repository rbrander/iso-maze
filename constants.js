// constants.js

const BACKGROUND_COLOR = 'black';

// isometric
const TILE_SIZE = 250; // pixels
const HALF_TILE_SIZE = TILE_SIZE / 2;
const TILE_WIDTH = TILE_SIZE;
const TILE_HEIGHT = TILE_WIDTH / 2;
const HALF_TILE_WIDTH = TILE_WIDTH / 2;
const HALF_TILE_HEIGHT = TILE_HEIGHT / 2;

const MINI_MAP_WIDTH = 100; // pixels
const MINI_MAP_HEIGHT = 100;
const MINI_MAP_MARGIN = 20; // pixel from edge
const MINI_MAP_WALL_COLOR = '#1122aa';
const MINI_MAP_FLOOR_COLOR = '#666666';
const MINI_MAP_PLAYER_COLOR = 'black';

const FOG_RADIUS = 2; // cells in radius from player

const KEYS = new Set();
const KEY_W = 87;
const KEY_S = 83;
const KEY_A = 65;
const KEY_D = 68;

// Tile sheet constants
const TILE_SHEET_IMAGE = new Image(); // src and onload are set in app init
const TILE_TALL_TOWER1 = {
  x: 158,
  y: 62,
  width: 34,
  height: 58
};
const TILE_TALL_TOWER2 = {
  x: 202,
  y: 62,
  width: 34,
  height: 58
};
const TILE_SHORT1 = {
  x: 1,
  y: 1,
  width: 34,
  height: 21
};

const MAZE = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
