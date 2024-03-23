// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.10;

contract BattleShipGame {
    // Admin
    address payable public owner;

    // Max Number of players participating in the game
    uint public constant NO_PLAYERS = 2;

    // Number of ship pieces a player can have, to build their ships
    uint public constant NO_SHIP_PIECES = 10;

    // The current round of the game
    uint public round = 0;

    // All the players participating in the game
    mapping(address => bool) private players;
    address[] private playersAddress; // We use an array because it's easier to iterate than a mapping

    // Player ships
    mapping(address => mapping(bytes32 => bool)) ships;

    // Player ships that have been destroyed
    mapping(address => Coordinate[]) destroyedShips;

    // Players who have lost all their ships
    mapping(address => bool) public destroyedPlayers;
    uint public numberOfDestroyedPlayers;
    uint public numberOfKeysSubmitted;

    mapping(address => Coordinate) public playerShots;
    mapping(address => bool) public playerHasPlayed;
    mapping(address => bool) public playerHasPlacedShips;
    mapping(address => bool) public playerHasReportedHits;
    // keccak256 hash of the player's secret key
    mapping(address => bytes32) public playerHashedSecretKeys;
    mapping(address => bytes32) public playerSecretKeys;

    mapping(uint => Coordinate[]) public roundShotsHistory;
    mapping(address => mapping(uint => mapping(uint => ShipShotProof))) public playerReportHistory;

    bool public isGameOver;
    bool public isKeysRevealed;

    struct Coordinate {
        uint8 x;
        uint8 y;
    }

    struct ShipShotProof {
        bytes32 signature;
        // The address of the player that shot
        // at this coordinate
        address shotBy;
    }

    event ShotReport(
        Coordinate coord,
        address target,
        address shotBy,
        bool isHit
    );

    event PlayerJoinedGame(address player, uint playerIndex);

    // Emitted when a player loses all his ships
    event PlayerLost(address player);

    constructor(address[] memory _playersAddress) payable {
        require(
            _playersAddress.length == NO_PLAYERS,
            "_playersAddress does not match the number of expected players"
        );
        for (uint i = 0; i < _playersAddress.length; i++) {
            address playerAddress = _playersAddress[i];
            players[playerAddress] = true;
            playersAddress.push(playerAddress);
            emit PlayerJoinedGame(playerAddress, i);
        }
        owner = payable(msg.sender);
    }

    function joinGame(bytes32[] memory _playerShips, bytes32 hashedSecretKey) public {
        require(!isGameOver, "Game is over");
        require(players[msg.sender], "Address is not a part of this game");
        require(
            _playerShips.length == NO_SHIP_PIECES,
            "Number of ship pieces does not match the expected value"
        );
        require(
            !playerHasPlacedShips[msg.sender],
            "Player has already placed ships"
        );

        for (uint i = 0; i < _playerShips.length; i++) {
            bytes32 shipHash = _playerShips[i];
            require(
                !ships[msg.sender][shipHash],
                "User has already placed a ship on this tile."
            );
            ships[msg.sender][shipHash] = true;
        }
        playerHasPlacedShips[msg.sender] = true;
        playerHashedSecretKeys[msg.sender] = hashedSecretKey;
    }

    function takeAShot(Coordinate memory _coord) public {
        require(isGameStarted(), "Game hasn't started");
        require(!isGameOver, "Game is over");
        require(players[msg.sender], "msg.sender is not a player in this game");
        require(
            !playerHasPlayed[msg.sender],
            "Player has made a move for this turn"
        );

        playerShots[msg.sender] = _coord;
        playerHasPlayed[msg.sender] = true;
        roundShotsHistory[round].push(_coord);
    }

    function reportHits(ShipShotProof[] memory _shotSignatures) public {
        require(isGameStarted(), "Game hasn't started");
        require(!isGameOver, "Game is over");
        require(isTurnOver(), "All players have not played for this turn.");
        require(
            _shotSignatures.length <= NO_PLAYERS,
            "No way you can validate more shots than there are players!"
        );

        for (uint i = 0; i < _shotSignatures.length; i++) {
            ShipShotProof memory shotProof = _shotSignatures[i];
            (bool _isHit, Coordinate memory coord) = isHit(shotProof);
            if (_isHit) {
                destroyPlayerShip(msg.sender, coord);
            }
            emit ShotReport({
                coord: coord,
                target: msg.sender,
                shotBy: shotProof.shotBy,
                isHit: _isHit
            });
        }
        playerHasReportedHits[msg.sender] = true;
        for (uint i = 0; i < _shotSignatures.length; i++) {
            playerReportHistory[msg.sender][round][i] = _shotSignatures[i];
        }
    }

    function isHit(
        ShipShotProof memory _hitProof
    ) internal view returns (bool, Coordinate memory) {
        Coordinate memory _playerShot = playerShots[_hitProof.shotBy];
        // A ship piece at this coordinate exists
        return (ships[msg.sender][_hitProof.signature] == true, _playerShot);
    }

    //
    function destroyPlayerShip(
        address _player,
        Coordinate memory _coord
    ) internal {
        destroyedShips[_player].push(_coord);

        // All of a player's ships have been destroyed
        if (destroyedShips[_player].length == NO_SHIP_PIECES) {
            destroyedPlayers[_player] = true;
            numberOfDestroyedPlayers++;
            emit PlayerLost(_player);
        }
    }

    // Check if all players have played for this turn
    function isTurnOver() public view returns (bool) {
        for (uint i = 0; i < playersAddress.length; i++) {
            address _playerAddress = playersAddress[i];
            if (!playerHasPlayed[_playerAddress]) {
                return false;
            }
        }
        return true;
    }

    function hasReportedShots() public view returns (bool) {
        for (uint i = 0; i < playersAddress.length; i++) {
            address _playerAddress = playersAddress[i];
            if (!playerHasReportedHits[_playerAddress]) {
                return false;
            }
        }
        return true;
    }

    // End the current turn and reset all variables
    function endTurn() public returns (bool) {
        require(
            isTurnOver(),
            "The turn is not yet over, some players are yet to shoot"
        );
        require(hasReportedShots(), "Some players are yet to report hits");

        // Do we have a winner?
        // Only one player is left standing
        // It's also possible that everybody destroyed everybody. (Edge case)
        if (numberOfDestroyedPlayers >= (NO_PLAYERS - 1)) {
            isGameOver = true;
        }

        for (uint i = 0; i < playersAddress.length; i++) {
            address _playerAddress = playersAddress[i];
            playerHasPlayed[_playerAddress] = false;
            playerHasReportedHits[_playerAddress] = false;
            playerShots[_playerAddress] = Coordinate({x: 0, y: 0});
        }
        round++;
        return true;
    }

    function isGameStarted() public view returns (bool) {
        for (uint i = 0; i < playersAddress.length; i++) {
            address _playerAddress = playersAddress[i];
            if (!playerHasPlacedShips[_playerAddress]) {
                return false;
            }
        }
        return true;
    }

    function getWinner() public view returns (address winner) {
        require(isGameOver, "The game isn't over yet");
        require(isKeysRevealed, "Keys are not yet revealed");
        for (uint i = 0; i < playersAddress.length; i++) {
            address _playerAddress = playersAddress[i];
            if (!destroyedPlayers[_playerAddress] && !isCheater(_playerAddress)) {
                return _playerAddress;
            }
        }
        // No winner
        return address(0);
    }

    function submitKey(bytes32 key) public {
        require(isGameOver, "The game isn't over yet");
        require(players[msg.sender], "Address is not a part of this game");
        require(playerHashedSecretKeys[msg.sender] == keccak256(abi.encodePacked(key)), "Invalid key");
        require(playerSecretKeys[msg.sender] == 0, "Player has already submitted keys");
        playerSecretKeys[msg.sender] = key;
        numberOfKeysSubmitted++;

        if (numberOfKeysSubmitted == NO_PLAYERS) {
            isKeysRevealed = true;
        }
    }

    function isCheater(address _player) public view returns (bool) {
        require(isGameOver, "The game isn't over yet");
        require(isKeysRevealed, "Keys are not yet revealed");
        for (uint i = 0; i < round; i++) {
            for (uint j = 0; j < roundShotsHistory[i].length; j++) {
                if (sign(abi.encodePacked(roundShotsHistory[i][j].x, roundShotsHistory[i][j].y), playerSecretKeys[_player]) != playerReportHistory[_player][i][j].signature) {
                    return true;
                }
            }
        }
        return false;
    }

    function sign(bytes memory data, bytes32 key) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(data, key));
    }
}



