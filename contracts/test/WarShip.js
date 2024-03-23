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

      // expect(await lock.unlockTime()).to.equal(unlockTime);
    });


  });
});
