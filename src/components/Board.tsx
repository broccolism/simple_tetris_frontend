import * as React from "react";
import * as coms from "./components";
import "../css/Tetrimino.css";

const ROW = 20;
const COLUMN = 10;
const DEFAULT_ORIGIN_X = 4;
const DEFAULT_ORIGIN_Y = 0;

interface BoardState {
  cells: number[][];
  curBlockShape: coms.Tetrimino;
  curBlockOriginX: number;
  curBlockOriginY: number;
}

interface BoardInterface {
  initBoard(): BoardState;
  render(): void;
  renderBoard(): void;
  getNewBlock(): coms.Tetrimino;
  setCurBlock(x: number, y: number): void;
  moveDownCurBlock(): void;
}

class Board extends React.Component<{}, BoardState> implements BoardInterface {
  constructor(props: any) {
    super(props);
    this.state = this.initBoard();
  }

  initBoard(): BoardState {
    // console.log("init");
    const arr = new Array(ROW).fill(0).map(() => new Array(COLUMN).fill(0));

    // let line: String;
    // for (let i = 0; i < ROW; ++i) {
    //   line = "";
    //   for (let j = 0; j < COLUMN; ++j) {
    //     line += arr[i][j].toString() + " ";
    //   }
    //   console.log(line);
    // }
    return {
      cells: new Array(ROW).fill(0).map(() => new Array(COLUMN).fill(0)),
      curBlockShape: new coms.Background(),
      curBlockOriginX: DEFAULT_ORIGIN_X,
      curBlockOriginY: DEFAULT_ORIGIN_Y,
    };
  }

  render() {
    return this.renderBoard();
  }

  renderBoard() {
    let key = 1000;
    return this.state.cells.map((row) => {
      return this.renderRow(row, key++);
    });
  }

  renderRow(row: number[], rowKey: number) {
    let key = 0;
    return (
      <div key={rowKey}>
        {row.map((cell) => {
          return this.renderCell(cell, key++);
        })}
      </div>
    );
  }

  renderCell(/*row: number, col: number*/ type: number, key: number) {
    // const type = this.state.cells[row][col];
    switch (type) {
      case coms.TetriminoType.background:
        return <div className="background" key={key}></div>;
      case coms.TetriminoType.block_I:
        return <div className="block I"></div>;
      case coms.TetriminoType.block_J:
        return <div className="block J"></div>;
      case coms.TetriminoType.block_L:
        return <div className="block L"></div>;
      case coms.TetriminoType.block_O:
        return <div className="block O"></div>;
      case coms.TetriminoType.block_S:
        return <div className="block S"></div>;
      case coms.TetriminoType.block_T:
        return <div className="block T"></div>;
      case coms.TetriminoType.block_Z:
        return <div className="block Z"></div>;
    }
  }

  getNewBlock(): coms.Tetrimino {
    throw new Error("Method not implemented.");
  }
  setCurBlock(x: number, y: number): void {
    throw new Error("Method not implemented.");
  }
  moveDownCurBlock(): void {
    throw new Error("Method not implemented.");
  }
}

export { Board };
