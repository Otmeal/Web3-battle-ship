import contractABI from "../contract-abi.json";
import { createAlchemyWeb3, AlchemyWeb3 } from "@alch/alchemy-web3";
import dotenv from 'dotenv';

dotenv.config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const web3: AlchemyWeb3 = createAlchemyWeb3(alchemyKey);

const ADDRESS: string = "0x69C2150d53f4f9cb7AEa33745adcB075C01c13cA";

const loadCurrentMessage = async (): Promise<any> => {
    const message = await battleShipContract.methods.message().call();
    return message;
};

const contractAddress: string = "0x7fE72D0CFa35BD50Df101EdF7c8f2E3F1AF09f33";

const battleShipContract: any = new web3.eth.Contract(
    contractABI,
    contractAddress
);

const joinGame = async (_playerShips: any[]): Promise<any> => {
    return await battleShipContract.methods.joinGame(_playerShips).send({ from: ADDRESS });
};

const takeAShot = async (_coord: any): Promise<any> => {
    return await battleShipContract.methods.takeAShot(_coord).send({ from: ADDRESS });
};

const reportHits = async (_shotSignatures: any[]): Promise<any> => {
    return await battleShipContract.methods.reportHits(_shotSignatures).send({ from: ADDRESS });
};

const isTurnOver = async (): Promise<boolean> => {
    return await battleShipContract.methods.isTurnOver().call();
};

const hasReportedShots = async (): Promise<boolean> => {
    return await battleShipContract.methods.hasReportedShots().call();
};

const endTurn = async (): Promise<boolean> => {
    return await battleShipContract.methods.endTurn().send({ from: ADDRESS });
};

const isGameStarted = async (): Promise<boolean> => {
    return await battleShipContract.methods.isGameStarted().call();
};

const getWinner = async (): Promise<string> => {
    return await battleShipContract.methods.getWinner().call();
};

battleShipContract.events.PlayerJoinedGame()
    .on("data", function (event: any) {
        console.log("Player joined game:", event.returnValues.player, "Player index:", event.returnValues.playerIndex);
    })
    .on("error", console.error);

battleShipContract.events.PlayerLost()
    .on("data", function (event: any) {
        console.log("Player lost:", event.returnValues.player);
    })
    .on("error", console.error);

export { loadCurrentMessage, joinGame, takeAShot, reportHits, isTurnOver, hasReportedShots, endTurn, isGameStarted, getWinner };
