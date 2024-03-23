import Box from "@mui/material/Box";

interface Props {
  x: number;
  y: number;
  onClick: (x: number, y: number) => void;
  isHit: boolean;
  isShip: boolean;
  isSelected: boolean;
}

export default function SeaBlock({ x, y, onClick, isHit, isShip }: Props) {
  return <Box onClick={() => onClick(x, y)}></Box>;
}
