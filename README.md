# Web3-battle-ship

## Introduction

The core of the project is a smart contract. It implements an advanced Battleship game for two players, with the possibility of further extension. Players can join the game, place their ships on a virtual board (by providing the signature of the coordnate without revealing their actual position until the end of the game), and take turns shooting at each other's ships. The game ends when one player destroys all the other player's ships. Additionally, once the game ends, various cryptographic methods are employed, initial and intermediate game states are revealed, and cheater is determined. This decentralized approach provides unprecedented fairness and trancparancy of actions to all players, which makes the gamelay more engaging and interesting.

### Original Implementation
While doing research on the topic of games backed by blockchain, we discovered a Battleship smart contract implementation, and used it as our reference:
https://github.com/chainstacklabs/zk-battleship-game-hardhat, so the credit for originality goes to them.

### Our Contribution
We discovered significant vulnerabilities and security issues in the original smart contract and introduced our solutions to them, while building upon the original implementation. Additionally, we developed a comprehensive Web UI for the application, tightly integrated with the backend written in Solidity, providing smooth User Experience.


## Client

### Placing Ships
![alt text](./battle-ship/public/image.png)

### Battle
![alt text](./battle-ship/public/image-1.png)

## Contract
### Functionality
**Player Management**
    
    - Supports two players with the possibility of the accessible further extension.
    - Verifies player addresses during game interaction.

**Ship Placement**
    
    - Players submit the signitures(hashes) of their ship positions without revealing the actual position until the end of the game, facilitating security.
    - Duplicate as well as out-of-bounds ship placements become evident at the end of the game, facilitating fairness.

**Hit Detection**
    
    - The contract checks if a shot hits a ship based on the submitted hash.

**Game State Management**
    
    - Tracks destroyed ships and players.
    - Determines the winner when one player loses all ships.
    - Handles turn management and checks if all players have played/reported hits.

**Cheat Detection**
    
    - The initial hashed placements of ships are stored, as well as all the shots during all the rounds, and hit confirmations of players towards themselves. At the end of the game player's private keys are revealed, and the shot history is encoded together with that key: (data , key) format. If it does not match the report, provided by the player, than it indicates that this player is a cheater.

### Variables
| State Variables | Description |
| ----------- | ----------- |
| owner | The address of the contract deployer |
| NO_PLAYERS | Constant defining the number of players in the current game  |
| NO_SHIP_PIECES | Constant defining the number of ships pieces per player |
| players | Mapping to track participating players (address to bool) |
| playersAddress | Array of player addresses for easier iteration. |
| ships | Mapping to store player ship placements (address to mapping of ship hash to bool) |
| destroyedShips | Mapping to store destroyed ship coordinates for each player (address to array of Coordinates) |
| destroyedPlayers | Mapping to track players who lost all ships (address to bool) |
| numberOfDestroyedPlayers | Keeps track of the number of players who lost |
| playerShots | Mapping to store the last shot coordinates for each player (address to Coordinate) |
| playerHasPlayed | Mapping to track if a player has made a shot in the current turn (address to bool) |
| playerHasPlacedShips | Mapping to track if a player has placed their ships (address to bool) |
| playerHasReportedHits | Mapping to track if a player has reported hits in the current turn (address to bool) |
| isGameOver | Boolean flag indicating whether the game has ended |


### Structs
**Coordinate**
    
    -Represents a ship or shot location on the board (x, y coordinates).
**ShipShotProof**
    
    -Stores proof of a shot including the signature, and the address of the player who took the shot.

### Events
**ShotReport**

    Emitted when a shot is reported, including coordinates, target, shooter, and hit status.
**PlayerJoinedGame**

    Emitted when a player joins the game.
**PlayerLost**

    Emitted when a player loses all ships.
**Constructor**
    
    - Takes an array of player addresses as input.
    - Validates the number of players.
    - Adds players to the game and emits PlayerJoinedGame events.
    - Sets the contract owner.


### Functions
`joinGame(_playerShips)`: 
Allows a player to join the game by submitting their ship placements as keccak256 hashes.

`takeAShot(_coord)`:
Lets a player take a shot at a specific coordinate.

`reportHits(_shotSignatures)`:
Allows a player to report hits on their opponent's ships using signed proofs.

`isHit(_hitProof)`:
Internal function that verifies the shot proof and checks if it hits a ship.

`destroyPlayerShip(_player, _coord)`:
Internal function that marks a ship as destroyed and checks for a winner.

`isTurnOver()`:
Checks if all players have made their shots in the current turn.

`hasReportedShots()`:
Checks if all players have reported hits in the current turn.

`endTurn()`:
Ends the current turn, resets player variables, and

### Additional Functions

`isGameStarted()`: 
Checks if the game has started by verifying if all players have placed all their ships.

`getWinner()`: 
Retrieves the winner of the game by checking both destroyed ships and cheater status.

`submitKey(bytes32 key)`:
Allows players to submit their private keys for verification after the game ends.

`isCheater(address _player)`:
Checks if a player has submitted incorrect shot records or invalid hip placements, indicating cheating.

`sign(bytes memory data, bytes32 key)`:
Helper function to sign data with a private key.

