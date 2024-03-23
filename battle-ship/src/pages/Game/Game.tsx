import { Box, Card, Grid } from "@mui/material";
import muiGlassSX from "../../styles/MuiGlassSX";
import GameBoard from "../../components/GameBoard/GameBoard";
import generate2Dbools from "../../util/generate2Dbools";
import { useState } from "react";
import AttackButton from "./AttackButton";
import { bin2boolMetrix } from "../../util/boolMetrixTools";

export default function Game() {
  const [selection, setSelection] = useState({
    x_coordinate: -1,
    y_coordinate: -1,
  });
  const [hits, setHits] = useState(generate2Dbools(5, 5));
  const [ships, setShips] = useState(generate2Dbools(5, 5));

  const selfShips = bin2boolMetrix(
    (localStorage.getItem("ships") as string).replace('"', ""),
    5,
    5
  );

  const handleAttackClick = (x: number, y: number) => {
    if (selection.x_coordinate === x && selection.y_coordinate === y) {
      setSelection({ x_coordinate: -1, y_coordinate: -1 });
    } else if (hits[x][y] || ships[x][y]) {
      return;
    } else {
      setSelection({ x_coordinate: x, y_coordinate: y });
    }
  };
  return (
    <Box
      sx={{
        fontFamily: "Roboto, sans-serif",
        display: "absolute",
        width: "100%",
        height: "85%",
      }}
    >
      <Grid
        container
        sx={{
          height: "100%",
          padding: "20px",
        }}
        spacing={2}
      >
        <Grid item xs={5} p={0}>
          <Card
            sx={{
              height: "100%",
              width: "100%",
              ...muiGlassSX,
            }}
          >
            <GameBoard
              ships={selfShips}
              hits={generate2Dbools(5, 5)}
              selection={{ x_coordinate: -1, y_coordinate: -1 }}
              onClick={(_x, _y) => {}}
            ></GameBoard>
          </Card>
        </Grid>
        <Grid item xs={2} p={0}>
          <Card
            sx={{
              height: "100%",
              width: "100%",
              ...muiGlassSX,
            }}
          >
            <Box p={"40px"} width={"100%"}>
              <AttackButton selection={selection}></AttackButton>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={5} p={0}>
          <Card
            sx={{
              height: "100%",
              width: "100%",
              ...muiGlassSX,
            }}
          >
            <GameBoard
              ships={generate2Dbools(5, 5)}
              hits={generate2Dbools(5, 5)}
              selection={selection}
              onClick={handleAttackClick}
            ></GameBoard>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
