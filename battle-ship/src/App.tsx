import { RouterProvider } from "react-router-dom";
import router from "./routes/Router.ts";
import { Box } from "@mui/material";
import "./styles/App.scss";
import Navbar from "./components/Navbar/Navbar.tsx";
import { Provider } from "react-redux";
import { store } from "../app/store.ts";

function App() {
  return (
    <Box
      className="background"
      sx={{
        fontFamily: "Roboto, sans-serif",
        display: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <Provider store={store}>
        <Navbar />
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </Box>
  );
}

export default App;
