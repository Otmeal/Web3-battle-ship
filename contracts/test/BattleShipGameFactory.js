const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("BattleShipGameFactory", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBattleShipGame() {

    // Contracts are deployed using the first signer/account by default
    const [owner, player1, player2] = await ethers.getSigners();

    const BattleShipGameFactory = await ethers.getContractFactory("BattleShipGameFactory");
    const battleShipGameFactory = await BattleShipGameFactory.deploy([player1.address, player2.address]);

    return { battleShipGameFactory, owner, player1, player2 };
  }

  describe("Deployment", function () {
    it("Should deploy battleShipGameFactory without any error", async function () {
      const { battleShipGameFactory, owner, player1, player2 } = await loadFixture(deployBattleShipGame);
    });
    it("Should call deployBattleShipGame without any error", async function () {
      const { battleShipGameFactory, owner, player1, player2 } = await loadFixture(deployBattleShipGame);
      const gameAddress = await battleShipGameFactory.createBattleShipGame([player1.address, player2.address]);
      expect(gameAddress).to.not.be.null;
      expect(gameAddress).to.not.be.undefined;
    });
  });
});
