import { Grid } from "@mui/material";
import SeaBlock from "./SeaBlock";

interface Selection {
  x_coordinate: number;
  y_coordinate: number;
}

interface Props {
  ships: boolean[][];
  hits: boolean[][];
  selection: Selection;
  onClick: (x: number, y: number) => void;
}
export default function GameBoard({ ships, hits, selection, onClick }: Props) {
  let items = [];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const isSelected =
        selection.x_coordinate === i && selection.y_coordinate === j;
      items.push(
        <Grid item xs={2}>
          <SeaBlock
            x={i}
            y={j}
            isHit={hits[i][j]}
            isShip={ships[i][j]}
            isSelected={isSelected}
            onClick={onClick}
          />
        </Grid>
      );
    }
  }
  return (
    <Grid container xs={10}>
      {items}
    </Grid>
  );
}
