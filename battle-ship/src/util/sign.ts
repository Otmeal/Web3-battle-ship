import { ethers } from "ethers";

function sign(data: string, key: string): string {
  const dataBytes: Uint8Array = ethers.utils.toUtf8Bytes(data);
  const keyBytes: Uint8Array = ethers.utils.toUtf8Bytes(key);

  const paddedData: Uint8Array = padDataAndKey(dataBytes, keyBytes);
  const hash: string = ethers.utils.hashMessage(paddedData);

  return hash;
}


// Function to pad (match) the length 
function padDataAndKey(dataBytes: Uint8Array, keyBytes: Uint8Array): Uint8Array {
  const paddingLength: number = Math.max(dataBytes.length, keyBytes.length) - Math.min(dataBytes.length, keyBytes.length);

  if (dataBytes.length < keyBytes.length) {
      dataBytes = ethers.utils.concat([dataBytes, new Uint8Array(paddingLength)]);
  } 
  else if (dataBytes.length > keyBytes.length) {
      keyBytes = ethers.utils.concat([keyBytes, new Uint8Array(paddingLength)]);
  }

  return ethers.utils.concat([dataBytes, keyBytes]);
}

// Testing with an example
/*

const data: string = "[1 , 1]";
const key: string = "0xF6f69dbC5Ef706d8eF78CfdbBe62AF57B5eeE18b";

const hash: string = sign(data, key);
console.log(hash);
*/


