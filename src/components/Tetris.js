import React, { useState } from "react";

import { createStage, isCollided } from "../gameHelpers";

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

// Custom Hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, rotatePlayer] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const movePlayerHorizontal = (dir) => {
    if (!isCollided(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const movePlayerVertical = () => {
    // Increase level when player has cleared 10 rows
    if (rows > level + 1) {
      setLevel((prev) => prev + 1);
      // also, increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!isCollided(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y === 0) {
        console.log("GAME OVER");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const hardDropPlayer = () => {
    let dist = 0;
    while (!isCollided(player, stage, { x: 0, y: dist })) {
      dist += 1;
    }

    updatePlayerPos({ x: 0, y: dist - 1, collided: true });
  };

  const downKeyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    movePlayerVertical();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      switch (keyCode) {
        case 32: // space
          hardDropPlayer();
          break;
        case 37: // left
          movePlayerHorizontal(-1);
          break;
        case 38: // up
          rotatePlayer(stage, 1);
          break;
        case 39: // right
          movePlayerHorizontal(1);
          break;
        case 40: // down
          dropPlayer();
          break;
        default:
          break;
      }
    }
  };

  useInterval(() => {
    movePlayerVertical();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={downKeyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver === true ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
