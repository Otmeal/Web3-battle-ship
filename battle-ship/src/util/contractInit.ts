import { abi } from "./abi";
import { ethers } from "ethers";
// import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";

const provider = new ethers.providers.Web3Provider((window as any).ethereum);
let contract: ethers.Contract;

export async function connectWallet() {
  await provider.send("eth_requestAccounts", []);
  return provider.listAccounts();
}

export async function initContract(address: string) {
  contract = new ethers.Contract(address, abi, provider);
  return contract;
}

export async function getContract() {
  return contract;
}
