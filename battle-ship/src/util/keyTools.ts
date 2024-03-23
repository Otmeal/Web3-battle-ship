import { ethers } from "ethers";

export function generateKey(): string {
  return ethers.utils.randomBytes(32).toString();
}

export function hashKey(key: string) {
  return ethers.utils.keccak256(key);
}
