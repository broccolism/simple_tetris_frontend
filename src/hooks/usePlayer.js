import { useState, useCallback } from "react";

import { isCollided, STAGE_WIDTH } from "../gameHelpers";
import { TETROMINOS, randomTetromino } from "../tetrominos";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const posX = clonedPlayer.pos.x;
    let offset = 1;
    while (isCollided(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = posX;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const rotate = (tetromino, dir) => {
    const rotatedTetromino = tetromino.map((_, index) =>
      tetromino.map((col) => col[index])
    );

    if (dir > 0) return rotatedTetromino.map((row) => row.reverse());
    return rotatedTetromino.reverse();
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
