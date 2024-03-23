export default function generate2Dbools(
  rows: number,
  cols: number
): boolean[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => false)
  );
}
