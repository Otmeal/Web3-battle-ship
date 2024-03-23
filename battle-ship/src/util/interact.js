const contractABI = require("../contract-abi.json");
const contractAddress = "0x7fE72D0CFa35BD50Df101EdF7c8f2E3F1AF09f33";

require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);


export const loadCurrentMessage = async () => {
    const message = await battleShipContract.methods.message().call();
    return message;
};

// Create an instance of the contract
export const battleShipContract = new web3.eth.Contract(
    contractABI,
    contractAddress
);

const YOUR_ADDRESS = "0x69C2150d53f4f9cb7AEa33745adcB075C01c13cA"
// Function to join the game
export const joinGame = async (_playerShips) => {
    return await battleShipContract.methods.joinGame(_playerShips).send({ from: YOUR_ADDRESS });
};

// Function to take a shot
export const takeAShot = async (_coord) => {
    return await battleShipContract.methods.takeAShot(_coord).send({ from: YOUR_ADDRESS });
};

// Function to report hits
export const reportHits = async (_shotSignatures) => {
    return await battleShipContract.methods.reportHits(_shotSignatures).send({ from: YOUR_ADDRESS });
};

// Function to check if the turn is over
export const isTurnOver = async () => {
    return await battleShipContract.methods.isTurnOver().call();
};

// Function to check if shots have been reported
export const hasReportedShots = async () => {
    return await battleShipContract.methods.hasReportedShots().call();
};

// Function to end the turn
export const endTurn = async () => {
    return await battleShipContract.methods.endTurn().send({ from: YOUR_ADDRESS });
};

// Function to check if the game has started
export const isGameStarted = async () => {
    return await battleShipContract.methods.isGameStarted().call();
};

// Function to get the winner
export const getWinner = async () => {
    return await battleShipContract.methods.getWinner().call();
};

// Event listener for player joining game
battleShipContract.events.PlayerJoinedGame()
    .on("data", function (event) {
        console.log("Player joined game:", event.returnValues.player, "Player index:", event.returnValues.playerIndex);
    })
    .on("error", console.error);

// Event listener for player lost
battleShipContract.events.PlayerLost()
    .on("data", function (event) {
        console.log("Player lost:", event.returnValues.player);
    })
    .on("error", console.error);
