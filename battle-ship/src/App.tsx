import { RouterProvider } from "react-router-dom";
import router from "./routes/Router.ts";
import { AppBar, Box } from "@mui/material";
import "./styles/App.scss";

function App() {
  return (
    <Box
      sx={{
        fontFamily: "Roboto, sans-serif",
        display: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </Box>
  );
}

export default App;
