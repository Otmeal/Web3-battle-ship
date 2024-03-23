import Web3 from "web3";
import { Box, Card, Grid } from "@mui/material";
import GameBoard from "../../components/GameBoard/GameBoard";
import { useState } from "react";
import generate2Dbools from "../../util/generate2Dbools";
import muiGlassSX from "../../styles/MuiGlassSX";

export default function Home() {
  const [ships, setShips] = useState<boolean[][]>(generate2Dbools(5, 5));

  const handleClick = (x: number, y: number) => {
    let shipCount = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (ships[i][j]) {
          shipCount++;
        }
      }
    }

    if (ships[x][y]) {
      setShips((prev) => {
        const newShips = [...prev];
        newShips[x][y] = false;
        return newShips;
      });
    } else if (shipCount >= 10) {
      console.log("You have already placed 10 ships");
    } else {
      setShips((prev) => {
        const newShips = [...prev];
        newShips[x][y] = true;
        return newShips;
      });
    }
  };

  return (
    <Box
      sx={{
        fontFamily: "Roboto, sans-serif",
        display: "absolute",
        width: "100%",
        height: "80%",
      }}
    >
      <Grid
        container
        sx={{
          height: "100%",
          padding: "20px",
        }}
        spacing={2}
      >
        <Grid item xs={8} p={0}>
          <Card
            className="glass"
            sx={{
              height: "100%",
              width: "100%",
              ...muiGlassSX,
            }}
          >
            <GameBoard
              ships={ships}
              hits={generate2Dbools(5, 5)}
              selection={{ x_coordinate: -1, y_coordinate: -1 }}
              onClick={handleClick}
            ></GameBoard>
          </Card>
        </Grid>
        <Grid item xs={4} p={0}>
          <Card
            sx={{
              height: "100%",
              width: "100%",
              ...muiGlassSX,
            }}
          >
            <h1 className="text-4xl font-bold mb-4">
              Send Crypto across the world
            </h1>
            <p className="mb-6">
              Explore the crypto world. Buy and sell cryptocurrencies easily on
              Krypto.
            </p>
            <ConnectToMetaMask />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

const ConnectToMetaMask = () => {
  const handleClick = async () => {
    if ((window as any)?.ethereum) {
      // Check if MetaMask is installed
      try {
        const accounts = await (window as any)?.ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new Web3.providers.HttpProvider(
          (window as any)?.ethereum
        );
        const web3 = new Web3(provider);
        console.log("Connected to MetaMask account:", accounts[0]);
        // Use web3 here to interact with the blockchain
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error("Please install MetaMask to use this application.");
    }
  };

  return (
    <button
      className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
      onClick={handleClick}
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Connect Wallet
      </span>
      <div className="ease-in duration-300 opacity-0 group-hover:block group-hover:opacity-100 transition-all"></div>
    </button>
  );
};

const HeroSection = () => {
  return (
    <div className="bg-gray-900 text-white p-8 glass">
      <h1 className="text-4xl font-bold mb-4">Send Crypto across the world</h1>
      <p className="mb-6">
        Explore the crypto world. Buy and sell cryptocurrencies easily on
        Krypto.
      </p>
      <ConnectToMetaMask />
    </div>
  );
};

const TransactionForm = () => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg glass">
      <div className="mb-4">
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-300"
        >
          Address To
        </label>
        <input
          type="text"
          id="address"
          className="mt-1 p-2 block w-full bg-gray-600 border border-gray-600 rounded-md text-white"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-300"
        >
          Amount (ETH)
        </label>
        <input
          type="text"
          id="amount"
          className="mt-1 p-2 block w-full bg-gray-600 border border-gray-600 rounded-md text-white"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-300"
        >
          Enter Message
        </label>
        <textarea
          id="message"
          rows={3}
          className="mt-1 p-2 block w-full bg-gray-600 border border-gray-600 rounded-md text-white"
        ></textarea>
      </div>

      <button className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Send Now
        </span>
        <div className="ease-in duration-300 opacity-0 group-hover:block group-hover:opacity-100 transition-all"></div>
      </button>
    </div>
  );
};

const Background = () => {
  return (
    <Box
      className="background"
      sx={{
        width: "100%",
        height: "100%",
        display: "absolute",
      }}
    ></Box>
  );
};
