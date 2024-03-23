import Box from "@mui/material/Box";
import Ship from "./Ship";

interface Props {
  x: number;
  y: number;
  onClick: (x: number, y: number) => void;
  isHit: boolean;
  isShip: boolean;
  isSelected: boolean;
}

export default function SeaBlock({ x, y, onClick, isHit, isShip }: Props) {
  return (
    <Box
      onClick={() => onClick(x, y)}
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        maxWidth: "100px",
        maxHeight: "100px",
        background: "rgba(60, 103, 255, 0.32)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
        justifyContent: "center",
        alignItems: "center",
        caretColor: "transparent",
      }}
    >
      {isShip && <Ship isHit={isHit} />}
    </Box>
  );
}
