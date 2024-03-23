import { Box, Card, Grid, TextField, Button } from "@mui/material";
import GameBoard from "../../components/GameBoard/GameBoard";
import { useEffect, useState } from "react";
import generate2Dbools from "../../util/generate2Dbools";
import muiGlassSX from "../../styles/MuiGlassSX";
import WalletConnector from "./WalletConnector";
import {
  boolMetrix2bin,
  bin2boolMetrix,
  boolMetrix2Coordinates,
} from "../../util/boolMetrixTools";
import { useNavigate } from "react-router-dom";
import { generateKey, hashKey } from "../../util/keyTools";
import { sign } from "../../util/sign";
import {
  createBattleShipGameContract,
  getBattleShipGameContract,
  initBattleShipGameContract,
  initBattleShipGameFactoryContract,
} from "../../util/contractInit";
import { useSelector } from "react-redux";

export default function Home() {
  const [ships, setShips] = useState<boolean[][]>(generate2Dbools(5, 5));
  const [gameAdderss, setGameAddress] = useState<string>("");
  const [enemyAddress, setEnemyAddress] = useState<string>("");
  const userAddress = useSelector((state: any) => state.app.userAddress);
  const navigate = useNavigate();

  useEffect(() => {
    const shipsString = localStorage.getItem("ships");
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
        return newShips;
      });
    }
  };

  const joinGame = async (address: string) => {
    const key = generateKey();
    const hashedKey = hashKey(key);
    const shipCoordinates = boolMetrix2Coordinates(ships);
    let signedShips: string[] = [];
    for (let i = 0; i < shipCoordinates.length; i++) {
      console.log(
        shipCoordinates[i][0].toString() + shipCoordinates[i][0].toString()
      );
      signedShips.push(
        sign(
          shipCoordinates[i][0].toString() + shipCoordinates[i][0].toString(),
          key
        )
      );
    }
    localStorage.setItem("key", key);
    console.log(key, hashedKey);

    const contract = await createBattleShipGameContract(address);

    await contract.joinGame(signedShips, hashedKey);

    navigate(`/game`);
  };

  const handleJoin = () => {
    joinGame(gameAdderss);
  };

  const handleCreate = async () => {
    await initBattleShipGameFactoryContract();
    const contract = await initBattleShipGameContract([
      userAddress,
      enemyAddress,
    ]);
    joinGame(contract.address);
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
              flexDirection: "column",
              ...muiGlassSX,
            }}
          >
            <WalletConnector />

            <TextField
              value={enemyAddress}
              onChange={(e) => {
                setEnemyAddress(e.target.value);
              }}
              variant="filled"
              sx={{ width: "80%", marginTop: "10px" }}
              helperText="Enter Enemy Address"
            ></TextField>
            <Button
              variant="contained"
              sx={{
                width: "80%",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              onClick={handleCreate}
            >
              Create
            </Button>

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
              onClick={handleJoin}
            >
              Join
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
