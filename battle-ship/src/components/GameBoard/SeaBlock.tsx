import Box from "@mui/material/Box";
import Ship from "./Ship";
import AdjustIcon from "@mui/icons-material/Adjust";

interface Props {
  x: number;
  y: number;
  onClick: (x: number, y: number) => void;
  isHit: boolean;
  isShip: boolean;
  isSelected: boolean;
}

export default function SeaBlock({
  x,
  y,
  onClick,
  isHit,
  isShip,
  isSelected,
}: Props) {
  let content = <></>;

  if (isShip) {
    content = <Ship isHit={isHit} />;
  } else if (isHit) {
    content = (
      <Box
        sx={{
          width: "70%",
          height: "70%",
          background: "red",
          borderRadius: "16px",
          caretColor: "transparent",
        }}
      ></Box>
    );
  } else if (isSelected) {
    content = <AdjustIcon sx={{ color: "red", width: "70%", height: "70%" }} />;
  } else if (isHit) {
    content = (
      <AdjustIcon sx={{ color: "#8f8f8f", width: "50%", height: "50%" }} />
    );
  }

  return (
    <Box
      onClick={() => onClick(x, y)}
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        maxWidth: "100px",
        maxHeight: "100px",
        background: "rgba(18, 42, 255, 0.32)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
        justifyContent: "center",
        alignItems: "center",
        caretColor: "transparent",
      }}
    >
      {content}
    </Box>
  );
}
