import { Box, Card, Grid } from "@mui/material";
import muiGlassSX from "../../styles/MuiGlassSX";
import GameBoard from "../../components/GameBoard/GameBoard";
import generate2Dbools from "../../util/generate2Dbools";
import { useEffect, useState } from "react";
import AttackButton from "./AttackButton";
import { bin2boolMetrix } from "../../util/boolMetrixTools";
import { getBattleShipGameContract } from "../../util/contractInit";
import { useDispatch, useSelector } from "react-redux";
import { setIsStarted } from "../../../app/appSlice";

export default function Game() {
  const [selection, setSelection] = useState({
    x_coordinate: -1,
    y_coordinate: -1,
  });
  const [hits, setHits] = useState(generate2Dbools(5, 5));
  const [ships, setShips] = useState(generate2Dbools(5, 5));
  const [isTurnOver, setIsTurnOver] = useState(false);
  const [isAllReporded, setIsAllReporded] = useState(true);
  const userAddress = useSelector((state: any) => state.app.userAddress);
  const enemyAddress = localStorage.getItem("enemy")?.replace('"', "");
  const gameContract = getBattleShipGameContract();

  const dispatch = useDispatch();

  const selfShips = bin2boolMetrix(
    (localStorage.getItem("ships") as string).replace('"', ""),
    5,
    5
  );
  gameContract.on("PlayerJoinedGame", (player: string, index: number) => {
    dispatch(setIsStarted(true));
  });
  useEffect(() => {
    // 在組件掛載後設置定時器
    const intervalId = setInterval(async () => {
      const isOver = await gameContract.isTurnOver();
      if (isOver && isAllReporded) {
        setIsTurnOver(true);
        await handleTurnOvered();
        setIsAllReporded(false);
      }
    }, 3000); // 1000毫秒 = 1秒

    // 返回一個清理函式，React會在組件卸載時調用它
    // 這確保了當組件不再需要時，定時器被清除，避免記憶體洩漏
    return () => clearInterval(intervalId);
  }, []);

  const handleTurnOvered = async () => {
    const userCoordinate = gameContract.playerShots(userAddress);
    const enemyCoordinate = gameContract.playerShots(enemyAddress);

    let newHits = hits;
    newHits[userCoordinate.x][userCoordinate.y] = true;
    newHits[enemyCoordinate.x][enemyCoordinate.y] = true;
    setHits(newHits);
  };
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const isReported = await gameContract.hasRepordShot();
      if (isReported && isTurnOver) {
        await handleAllReporded();
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleAllReporded = async () => {
    setIsAllReporded(true);
  };

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
              <AttackButton
                selection={selection}
                setSelection={setSelection}
                isTurnOver={isTurnOver}
                isAllReporded={isAllReporded}
              ></AttackButton>
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
