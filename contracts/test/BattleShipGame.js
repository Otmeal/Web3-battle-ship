const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("BattleShipGame", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBattleShipGame() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const BattleShipGame = await ethers.getContractFactory("BattleShipGame");
    const battleShipGame = await BattleShipGame.deploy([owner.address, otherAccount.address]);

    return { battleShipGame, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy without any error", async function () {
      const { battleShipGame, owner, otherAccount } = await loadFixture(deployBattleShipGame);
    });
  });
  describe("Util", function () {
    it("Should sign the data correctly", async function () {
      const { battleShipGame, owner, otherAccount } = await loadFixture(deployBattleShipGame);
      const res = await battleShipGame.signCoord({x: 2, y: 1}, ethers.toUtf8Bytes('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
      expect(res).to.equal('0xbcd3b305d0871d09e6aa505baaec5b1a5324982c7eb63141c32ff4adb0fcffbd')
    });
  });
});
