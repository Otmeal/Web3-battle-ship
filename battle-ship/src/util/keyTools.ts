import { ethers } from "ethers";

export function generateKey() {
  return ethers.utils.randomBytes(32);
}

export function hashKey(key: string) {
  return ethers.utils.keccak256(key);
}
