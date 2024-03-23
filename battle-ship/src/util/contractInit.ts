import {abi} from "./abi"
import { ethers } from "ethers";
// import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";

const provider = new ethers.providers.Web3Provider()

async function connectWallet() {
    await provider.send("eth_requestAccounts", []);
    console.log(1234)
    console.log(await provider.getBlockNumber())
    console.log(await provider.getBalance("0xA871AB14f1AAe8DaEEDDD047999Fb9F234BcaAf5")    )
}
