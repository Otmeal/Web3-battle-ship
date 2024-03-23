// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.10;
import "./BattleShipGame.sol";

contract WarShipFactory {
    address[] public deployedGames;

    function createBattleShipGame(address[] memory _playersAddress) public payable returns (address) {
        address newGame = address(new BattleShipGame(_playersAddress));
        deployedGames.push(newGame);
        return newGame;
    }
    function getDeployedGames() public view returns (address[] memory) {
        return deployedGames;
    }
}