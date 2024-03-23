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
        <Grid
          item
          xs={2}
          sx={{
            height: "20%",
            display: "flex",
            width: "100%",
            justifyContent: "center",

            alignItems: "center",
          }}
        >
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
    <Grid
      container
      columns={10}
      p={2}
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        maxWidth: "600px",
      }}
      spacing={2}
    >
      {items}
    </Grid>
  );
}
