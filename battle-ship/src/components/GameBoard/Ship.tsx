import { Box } from "@mui/material";
interface Props {
  isHit: boolean;
}

export default function Ship({ isHit }: Props) {
  return (
    <Box
      sx={{
        width: "70%",
        height: "70%",
        background: isHit ? "red" : "#bfbfbf",
        borderRadius: "16px",
        caretColor: "transparent",
      }}
    ></Box>
  );
}
