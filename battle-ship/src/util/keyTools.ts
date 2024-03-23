import { ethers } from "ethers";

export function generateKey(): string {
  const wallet = ethers.Wallet.createRandom();
  return wallet.privateKey;
}

export function hashKey(key: string) {
  console.log(key);
  return ethers.utils.keccak256(key);
}
