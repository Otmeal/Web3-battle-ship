import { Box, Card, Grid, TextField, Button } from "@mui/material";
import GameBoard from "../../components/GameBoard/GameBoard";
import { useEffect, useState } from "react";
import generate2Dbools from "../../util/generate2Dbools";
import muiGlassSX from "../../styles/MuiGlassSX";
import WalletConnector from "./WalletConnector";
import { boolMetrix2bin, bin2boolMetrix } from "../../util/boolMetrixTools";

export default function Home() {
  const [ships, setShips] = useState<boolean[][]>(generate2Dbools(5, 5));
  const [gameAdderss, setGameAddress] = useState<string>("");

  useEffect(() => {
    const shipsString = localStorage.getItem("ships");
    console.log(shipsString);
    if (shipsString) {
      setShips(bin2boolMetrix(shipsString.replace('"', ""), 5, 5));
    }
    const gameAddress = localStorage.getItem("gameAddress");
    if (gameAddress) {
      setGameAddress(gameAddress.replace('"', ""));
    }
  }, []);

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
    } else {
      setShips((prev) => {
        const newShips = [...prev];
        newShips[x][y] = true;

        localStorage.setItem("ships", JSON.stringify(boolMetrix2bin(newShips)));
        console.log(boolMetrix2bin(newShips));
        return newShips;
      });
    }
  };

  const handleJoin = () => {};

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
              flexDirection: "column",
              ...muiGlassSX,
            }}
          >
            <WalletConnector />
            <TextField
              value={gameAdderss}
              onChange={(e) => {
                setGameAddress(e.target.value);
                localStorage.setItem("gameAddress", gameAdderss);
              }}
              sx={{ width: "80%", marginTop: "10px" }}
              helperText="Enter Game Address"
              variant="filled"
            />
            <Button
              color="primary"
              variant="contained"
              sx={{
                width: "80%",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              Join
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
