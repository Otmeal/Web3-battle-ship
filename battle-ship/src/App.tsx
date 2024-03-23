// React code (App.jsx)
import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router.ts";
import { Box } from "@mui/material";
import "./styles/App.scss";
import Navbar from "./components/Navbar/Navbar.tsx";
const crypto = require('crypto-browserify');

// Import the functions from interact.ts
import {
  loadCurrentMessage,
  joinGame,
  takeAShot,
  reportHits,
  isTurnOver,
  hasReportedShots,
  endTurn,
  isGameStarted,
  getWinner,
} from "./util/interact";

function App() {
  // Example of using one of the functions (loadCurrentMessage) inside a useEffect hook
  useEffect(() => {
    const fetchData = async () => {
      try {
        const message = await loadCurrentMessage();
        console.log("Current message:", message);
      } catch (error) {
        console.error("Error fetching current message:", error);
      }
    };

    fetchData();
  }, []);

  // Example of using one of the functions (joinGame) inside a click handler
  const handleJoinGame = async () => {
    try {
      const playerShips = [
        "ac870e37ba298de67cb232a5572f710a",
        "f84338280f2e6c1c117bae69720288a0",
        "f9e3dfdd8655b1c02ebad0c6ef675103",
        "970dcc51145532d1d64803e691acd877",
        "41988ed960fdefb0887bac1a750f66e1",
        "68f11e8b4c4bbb9ff654ce380ab23b82",
        "e6fe47af90bf6713f9fb659bef2bf767",
        "c6bf0b434559298dae0dfdb71f90f700",
        "a3bb778305046f6b04b17dbeb3768c91",
        "7835905c5c44c99cd0080987c7b4665b"
      ]; // Pass appropriate data here
      const result = await joinGame(playerShips);
      console.log("Join game result:", result);
    } catch (error) {
      console.error("Error joining game:", error);
    }
  };

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
      <Navbar />
      <RouterProvider router={router}></RouterProvider>
      <button onClick={handleJoinGame}>Join Game</button>{" "}
      {/* Example usage of joinGame function */}
    </Box>
  );
}

export default App;

// Solidity contract and utility functions (BattleShipGame.sol and interact.ts)
// Place your existing Solidity contract and utility functions here
