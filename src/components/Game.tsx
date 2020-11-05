import * as React from "react";
import * as coms from "./components";

class Game extends React.Component<{}, GameState> {
  constructor(props: any) {
    super(props);
    this.state = {
      board: new coms.Board(props),
      nextBlocks: [],
      curBlock: new coms.Background(),
      score: 0,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <coms.Board></coms.Board>
        </div>
      </div>
    );
  }
}

type GameState = {
  board: coms.Board;
  nextBlocks: coms.Tetrimino[];
  curBlock: coms.Tetrimino;
  // room: Room;
  score: number;
};

export { Game };
