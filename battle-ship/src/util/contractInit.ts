import { BattleShipGameFactoryAbi, BattleShipGameAbi } from "./abi";
import { ethers } from "ethers";
// import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";

const provider = new ethers.providers.Web3Provider((window as any).ethereum);
let factoryContract: ethers.Contract;
let gameContract: ethers.Contract;

export async function connectWallet() {
  await provider.send("eth_requestAccounts", []);
  return provider.listAccounts();
}

export async function initBattleShipGameFactoryContract() {
  const address = '0x5be371B58Ebf06B7D3c08137fe4A4053EAe96581';
  factoryContract = new ethers.Contract(address, BattleShipGameFactoryAbi, provider);
  return factoryContract;
}

export async function initBattleShipGameContract(_playersAddress: string[]) {
  gameContract = await factoryContract.createBattleShipGame(_playersAddress);
  return gameContract;
}

export async function getFactoryContract() {
  return factoryContract;
}

export async function getBattleShipGameContract() {
  return gameContract;
}