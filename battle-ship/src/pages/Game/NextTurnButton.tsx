import { Button } from "@mui/material";
import { getBattleShipGameContract } from "../../util/contractInit";

interface Props {
  isAllReporded: boolean;
  isTurnOver: boolean;
}

export default function ReloadButton({ isAllReporded, isTurnOver }: Props) {
  const gameContract = getBattleShipGameContract();
  const handleNextTurn = async () => {
    await gameContract.endTurn();
  };

  return (
    <Button
      color="primary"
      variant="contained"
      sx={{ width: "100%", height: "75px" }}
      disabled={!isAllReporded || !isTurnOver}
      onClick={handleNextTurn}
    >
      Next Turn
    </Button>
  );
}
