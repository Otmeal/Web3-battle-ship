import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { getBattleShipGameContract } from "../../util/contractInit";
import { useDispatch } from "react-redux";
import { setIsStarted } from "../../../app/appSlice";

interface Props {
  selection: { x_coordinate: number; y_coordinate: number };
  isTurnOver: boolean;
  isAllReporded: boolean;
  setSelection: ({ x_coordinate, y_coordinate }: any) => void;
}

export default function AttackButton({
  selection,
  isTurnOver,
  isAllReporded,
  setSelection,
}: Props) {
  const isStarted = useSelector((state: any) => state.app.isStarted);
  const gameContract = getBattleShipGameContract();
  const dispatch = useDispatch();

  const handleAttack = async () => {
    await gameContract.takeAShot({
      x: selection.x_coordinate,
      y: selection.y_coordinate,
    });
    dispatch(setIsStarted(false));
    setSelection({ x_coordinate: -1, y_coordinate: -1 });
  };

  return (
    <Button
      color="error"
      variant="contained"
      sx={{ width: "100%", height: "75px" }}
      disabled={
        !isStarted ||
        selection.x_coordinate === -1 ||
        isTurnOver ||
        !isAllReporded
      }
      onClick={handleAttack}
    >
      Attack!!!
    </Button>
  );
}
