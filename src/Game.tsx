import React from "react";
import "./App.css";

const ROW = 10;
const COLUMN = 20;

const TETRIMINO_COLORS = ["#32a852"];

function Game() {
  return <Board></Board>;
}

class Board extends React.Component<{}, BoardState> {
  constructor(props: BoardState) {
    super(props);
    this.state = {
      cellValues: new Array(ROW)
        .fill(0)
        .map((row) => new Array(COLUMN).fill(0)),
    };
  }

  render() {
    return <ul>{this.renderCells()}</ul>;
  }

  renderRows(): any[] {
    let rows: any[] = [];
    for (let i = 0; i < ROW; ++i) {
      let row: any[] = [];
      for (let j = 0; j < COLUMN; ++j) {
        const cell = Cell(this.state.cellValues[i][j], `${i}-${j}`);
        row.push(cell);
      }
      rows.push(row);
    }

    return rows;
  }

  renderCells(): any[] {
    let cells: any[] = [];
    for (let i = 0; i < ROW; ++i) {
      for (let j = 0; j < COLUMN; ++j) {
        const cell = Cell(this.state.cellValues[i][j], `${i}-${j}`);
        cells.push(cell);
      }
    }
    return cells;
  }
}

function Cell(value: number, id: string) {
  switch (value) {
    case 0:
      return <div className="cell" key={id}></div>;
  }
}

type BoardState = {
  cellValues: number[][];
};

export default Game;
