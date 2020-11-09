export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );

export const isCollided = (player, stage, { x: moveX, y: moveY }) => {
  const tetriminoSize = player.tetromino.length;
  for (let y = 0; y < tetriminoSize; y++) {
    for (let x = 0; x < tetriminoSize; ++x) {
      if (player.tetromino[y][x] !== 0) {
        const nextY = y + player.pos.y + moveY;
        const nextX = x + player.pos.x + moveX;
        console.log(`y: ${nextY}, x: ${nextX}`);
        if (
          nextY >= STAGE_HEIGHT ||
          nextY < 0 ||
          nextX >= STAGE_WIDTH ||
          nextX < 0 ||
          (stage[nextY][nextX] !== undefined &&
            stage[nextY][nextX][1] !== "clear")
        ) {
          console.log("FALSE");
          return true;
        }
      }
    }
  }
  console.log("F");
  return false;
};
