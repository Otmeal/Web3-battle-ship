import ethers from "ethers";
// 假設你已經有了一個web3實例，如果沒有，你可以這樣初始化（這裡假設本地節點運行在HTTP://127.0.0.1:8545）
// const web3 = new Web3('HTTP://127.0.0.1:8545');

// 但在這個範例中，我們不需要與以太坊節點交互，所以可以直接這樣實例化Web3

export function sign(data: string, key: string) {
  // 確保輸入是符合要求的bytes32類型
  if (data.length !== 32) {
    const padding = "0".repeat(32 - data.length);
    data = data + padding;
  }
  if (key.length !== 32) {
    throw new Error("Key must be 32 bytes long");
  }

  data = stringToHex(data);
  key = stringToHex(key);

  // 使用web3.utils.soliditySha3來模擬Solidity的abi.encodePacked行為
  // 直接將data和key作為參數傳入
  const hashed = ethers.utils.solidityKeccak256(
    ["bytes32", "bytes32"],
    [data, key]
  );

  return hashed;
}
function stringToHex(s: string) {
  return ethers.utils.hexlify(ethers.utils.toUtf8Bytes(s));
}
