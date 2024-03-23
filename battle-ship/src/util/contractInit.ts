import { BattleShipGameFactoryAbi, BattleShipGameAbi } from "./abi";
import { ethers } from "ethers";
// import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";

export const provider = new ethers.providers.Web3Provider(
  (window as any).ethereum
);

let factoryContract: ethers.Contract;
let gameContract: ethers.Contract;

export async function connectWallet() {
  await provider.send("eth_requestAccounts", []);
  return provider.listAccounts();
}

export async function initBattleShipGameFactoryContract() {
  const address = "0x5be371B58Ebf06B7D3c08137fe4A4053EAe96581";
  factoryContract = new ethers.Contract(
    address,
    BattleShipGameFactoryAbi,
    provider.getSigner()
  );
  return factoryContract;
}

export async function initBattleShipGameContract(_playersAddress: string[]) {
  const gameAddress = await factoryContract.createBattleShipGame(
    _playersAddress
  );
  gameContract = new ethers.Contract(
    gameAddress,
    BattleShipGameAbi,
    provider.getSigner()
  );
  return gameContract;
}

export function setBattleShipGameContract(address: string) {
  gameContract = new ethers.Contract(
    address,
    BattleShipGameAbi,
    provider.getSigner()
  );
  return gameContract;
}

export function getFactoryContract() {
  return factoryContract;
}

export function getBattleShipGameContract() {
  return gameContract;
}
