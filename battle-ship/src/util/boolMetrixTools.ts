export function boolMetrix2bin(boolMetrix: boolean[][]): string {
  return boolMetrix
    .map((row) => row.map((cell) => (cell ? "1" : "0")).join(""))
    .join("");
}

export function bin2boolMetrix(
  bin: string,
  row: number,
  col: number
): boolean[][] {
  const boolMetrix: boolean[][] = [];
  for (let i = 0; i < row; i++) {
    boolMetrix.push([]);
    for (let j = 0; j < col; j++) {
      boolMetrix[i].push(bin[i * col + j] === "1");
    }
  }
  return boolMetrix;
}

export function boolMetrix2Coordinates(
  boolMetrix: boolean[][]
): Array<number[]> {
  const coordinates: Array<number[]> = [];
  for (let i = 0; i < boolMetrix.length; i++) {
    for (let j = 0; j < boolMetrix[i].length; j++) {
      if (boolMetrix[i][j]) {
        coordinates.push([i, j]);
      }
    }
  }

  return coordinates;
}

export function coordinates2boolMetrix(
  coordinates: Array<number[]>,
  row: number,
  col: number
): boolean[][] {
  const boolMetrix: boolean[][] = [];
  for (let i = 0; i < row; i++) {
    boolMetrix.push([]);
    for (let j = 0; j < col; j++) {
      boolMetrix[i].push(false);
    }
  }
  for (let i = 0; i < coordinates.length; i++) {
    boolMetrix[coordinates[i][0]][coordinates[i][1]] = true;
  }
  return boolMetrix;
}
