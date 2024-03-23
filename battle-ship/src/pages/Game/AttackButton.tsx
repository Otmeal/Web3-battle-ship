import { Button } from "@mui/material";

interface Props {
  selection: { x_coordinate: number; y_coordinate: number };
}

export default function AttackButton({ selection }: Props) {
  return (
    <Button
      color="error"
      variant="contained"
      sx={{ width: "100%", height: "75px" }}
    >
      Attack!!!
    </Button>
  );
}
