import { Box, Card, Grid } from "@mui/material";
import GameBoard from "../../components/GameBoard/GameBoard";
import { useState } from "react";
import generate2Dbools from "../../util/generate2Dbools";
import muiGlassSX from "../../styles/MuiGlassSX";
import WalletConnector from "./WalletConnector";

export default function Home() {
  const [ships, setShips] = useState<boolean[][]>(generate2Dbools(5, 5));

  const handleClick = (x: number, y: number) => {
    let shipCount = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (ships[i][j]) {
          shipCount++;
        }
      }
    }

    if (ships[x][y]) {
      setShips((prev) => {
        const newShips = [...prev];
        newShips[x][y] = false;
        return newShips;
      });
    } else if (shipCount >= 10) {
      console.log("You have already placed 10 ships");
    } else {
      setShips((prev) => {
        const newShips = [...prev];
        newShips[x][y] = true;
        return newShips;
      });
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
        <Grid item xs={8} p={0}>
          <Card
            className="glass"
            sx={{
              height: "100%",
              width: "100%",
              ...muiGlassSX,
            }}
          >
            <GameBoard
              ships={ships}
              hits={generate2Dbools(5, 5)}
              selection={{ x_coordinate: -1, y_coordinate: -1 }}
              onClick={handleClick}
            ></GameBoard>
          </Card>
        </Grid>
        <Grid item xs={4} p={0}>
          <Card
            sx={{
              height: "100%",
              width: "100%",
              ...muiGlassSX,
            }}
          >
            <WalletConnector />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
