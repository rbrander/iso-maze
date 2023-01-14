// isometric.js

const cartesianToIsometric = (x, y) =>
  [x + y, 0.5 * (y - x)];

const isometricToCartesian = (x, y) =>
  [0.5 * x - y, 0.5 * x + y];

const toIso = (x, y, width = 1, height = 1) => {
  const [isoX, isoY] = cartesianToIsometric(x, y);
  return [isoX * width, isoY * height];
};

const fromIso = (x, y, width = 1, height = 1) => {
  const [cartX, cartY] = isometricToCartesian(x / width, y / height);
  return [cartX, cartY];
};
