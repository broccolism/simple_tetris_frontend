enum TetriminoType {
  background = 0,
  block_I = 1,
  block_J = 2,
  block_L = 3,
  block_O = 4,
  block_S = 5,
  block_T = 6,
  block_Z = 7,
}

abstract class Tetrimino {
  getRotatedLeft(curShape: number[][]): number[][] {
    const size = this.getSize(curShape);

    let newShape = this.getSizedBackground(size);
    for (let i = 0; i < size; ++i) {
      for (let j = 0; j < size; ++j) {
        newShape[i][j] = curShape[j][size - 1 - i];
      }
    }

    return newShape;
  }

  getRotatedRight(curShape: number[][]): number[][] {
    const size = this.getSize(curShape);

    let newShape = this.getSizedBackground(size);
    for (let i = 0; i < size; ++i) {
      for (let j = 0; j < size; ++j) {
        newShape[i][j] = curShape[size - 1 - j][i];
      }
    }

    return newShape;
  }

  getSize(curShape: number[][]): number {
    return curShape.length;
  }

  getSizedBackground(size: number): number[][] {
    return new Array(size).fill(0).map(() => new Array(size).fill(0));
  }
}

class Background extends Tetrimino {
  shape = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
}

class TetriminoI extends Tetrimino {
  shape = [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ];
}

class TetriminoJ extends Tetrimino {
  shape = [
    [0, 0, 0],
    [2, 0, 0],
    [2, 2, 2],
  ];
}

class TetriminoL extends Tetrimino {
  shape = [
    [0, 0, 0],
    [0, 0, 3],
    [3, 3, 3],
  ];
}

class TetriminoO extends Tetrimino {
  shape = [
    [4, 4],
    [4, 4],
  ];
}

class TetriminoS extends Tetrimino {
  shape = [
    [5, 0, 0],
    [5, 5, 0],
    [0, 5, 0],
  ];
}

class TetriminoT extends Tetrimino {
  shape = [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0],
  ];
}

class TetriminoZ extends Tetrimino {
  shape = [
    [0, 0, 0],
    [7, 7, 0],
    [0, 7, 7],
  ];
}

export {
  Tetrimino,
  TetriminoType,
  Background,
  TetriminoI,
  TetriminoJ,
  TetriminoL,
  TetriminoO,
  TetriminoS,
  TetriminoT,
  TetriminoZ,
};
