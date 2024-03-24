"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var hashAlgorithm = "sha256";
var data = "[1 , 1]";
var key = "0xF6f69dbC5Ef706d8eF78CfdbBe62AF57B5eeE18b";
function sign(data, key) {
    // Convert data and key to bytes based on padding method
    var dataBytes = ethers_1.ethers.utils.toUtf8Bytes(data);
    var keyBytes = ethers_1.ethers.utils.toUtf8Bytes(key); // Convert key to bytes
    // Pad data and key to align lengths
    var paddedData = padDataAndKey(dataBytes, keyBytes);
    // Calculate hash based on the specified hash algorithm
    var hash = ethers_1.ethers.utils.hashMessage(paddedData);
    // Return the hash
    return hash;
}
// Function to pad data and key to align lengths
function padDataAndKey(dataBytes, keyBytes) {
    // Calculate the required padding length
    var paddingLength = Math.max(dataBytes.length, keyBytes.length) - Math.min(dataBytes.length, keyBytes.length);
    // Pad the shorter array with zeros
    if (dataBytes.length < keyBytes.length) {
        dataBytes = ethers_1.ethers.utils.concat([dataBytes, new Uint8Array(paddingLength)]);
    }
    else if (dataBytes.length > keyBytes.length) {
        keyBytes = ethers_1.ethers.utils.concat([keyBytes, new Uint8Array(paddingLength)]);
    }
    // Concatenate data and key bytes
    return ethers_1.ethers.utils.concat([dataBytes, keyBytes]);
}
var hash = sign(data, key);
console.log(hash);
