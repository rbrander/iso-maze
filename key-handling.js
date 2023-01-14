// key-handling.js

const processKeysDown = () => {
  const isKeyDown = (key) => KEYS.has(key);
  if (isKeyDown(KEY_W)) {
    // move the player if there is no wall
    // NOTE: intentionally not checking bounds as we know the maze is walled in
    if (MAZE[playerY - 1][playerX] === 0) {
      playerY--;
    }
    KEYS.delete(KEY_W);
  }
  if (isKeyDown(KEY_S)) {
    // move the player if there is no wall
    // NOTE: intentionally not checking bounds as we know the maze is walled in
    if (MAZE[playerY + 1][playerX] === 0) {
      playerY++;
    }
    KEYS.delete(KEY_S);
  }
  if (isKeyDown(KEY_A)) {
    // move the player if there is no wall
    // NOTE: intentionally not checking bounds as we know the maze is walled in
    if (MAZE[playerY][playerX - 1] === 0) {
      playerX--;
    }
    KEYS.delete(KEY_A);
  }
  if (isKeyDown(KEY_D)) {
    // move the player if there is no wall
    // NOTE: intentionally not checking bounds as we know the maze is walled in
    if (MAZE[playerY][playerX + 1] === 0) {
      playerX++;
    }
    KEYS.delete(KEY_D);
  }
}

const onKeyDown = (e) => {
  KEYS.add(e.which);
};

const onKeyUp = (e) => {
  KEYS.delete(e.which);
};
