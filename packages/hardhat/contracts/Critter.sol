//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Critter {

    // #region Constants
    uint256 constant MAX_PUBLIC_AVAILABLE_GAMES = 10; // Max number of public available games, this limitation is to improve the performance

    uint256 public immutable ENDING_BET_PERIOD_REWARD; // Reward for who closes the betting period
    uint256 public immutable BETTING_PERIOD_BLOCKS_FOR_PUBLIC_GAMES; // Number of blocks for the betting period for public games. This is the period public games will be available. This limitation is important because the limitation of 10 public games. To avoid having only having public games that will take too long.
    uint256 public immutable MIN_BET_VALUE_FOR_PUBLIC_GAMES; // Minimum bet value for public games. This value is hardcoded to avoid only having public games that only accepts high bets.

    constructor(
        uint256 endingBetPeriodReward,
        uint256 bettingPeriodBlocksForPublicGames,
        uint256 minBetValueForPublicGames
    ) {
        ENDING_BET_PERIOD_REWARD = endingBetPeriodReward;
        BETTING_PERIOD_BLOCKS_FOR_PUBLIC_GAMES = bettingPeriodBlocksForPublicGames;
        MIN_BET_VALUE_FOR_PUBLIC_GAMES = minBetValueForPublicGames;
    }

    // #endregion

    // #region Structures
    // A game is a betting group
    struct Game {
        address creator;
        address[] participants; // Participants of the PRIVATE game, if empty, the game is public
        uint256 totalValue; // Total value of the bets in wei
        uint256 minEndingBlock; // Minimum block number to end the betting period. But there are other factors that limits the betting period ending.
        bytes32 combinedHash; // Used to calculate the drawn number
        uint256[25] betsPerNumber; // Value of bets per number in wei
        bool bettingPeriodEnded; // If true, no more bets can be placed
        uint8 drawnNumber; // Drawn number, only set when the betting period ends
        uint256 numberOfBets; // Total number of bets
        uint256 valueProvidedToWinners; // Total value already provided to winners by their claim
        uint256 minBetValue; // Minimum bet value in wei
    }

    // A bet on a game
    struct Bet {
        uint256 gameId; // Game id
        address bettor; // Bettor address
        uint256 value; // Bet value in wei
        uint8 number; // What number the bettor bet on, between 1 and 25
        bool prizeClaimed; // If true, the bettor has claimed the prize
    }
    // #endregion

    // #region Events
    // Event when a game is created
    event GameCreated(
        uint256 indexed gameId,
        address indexed creator,
        bool isPrivate,
        uint256 timestamp
    );

    // Event when a bet is placed
    event BetPlaced(
        uint256 indexed gameId,
        address indexed bettor,
        uint8 number,
        uint256 value,
        uint256 timestamp,
        uint256 betId
    );

    // Event when a bettor claims the prize
    event PrizeClaimed(
        uint256 indexed gameId,
        uint256 indexed betId,
        address indexed bettor,
        uint8 drawnNumber,
        uint256 prizeValue,
        uint256 timestamp
    );

    // Event when the betting period ends
    event EndOfBettingPeriod(
        uint256 indexed gameId,
        address indexed closer,
        uint256 reward,
        uint256 timestamp
    );
    // #endregion

    // #region State Variables
    mapping(uint256 => Game) public games; // all games by id
    mapping(uint256 => Bet) public bets; // all bets by id
    uint256[MAX_PUBLIC_AVAILABLE_GAMES] public publicAvailableGames; // all public games ids (limited to 10)
    uint256 public gameCount = 0; // total number of games (also used to calculate the next game id)
    uint256 public betCount = 0; // total number of bets (also used to calculate the next bet id)
    uint256 public publicAvailableGamesCount = 0; // total number of public games
    mapping(address => uint256[]) public privateGamesInvitations; // private games invitations by participant address, important to list all private games a bettor has been invited to. Reading events is not possible because the participants array is not indexed.
    // #endregion

    // #region Errors
    error GamePrivate(); // for when the bettor tries to place a bet in a private game without being invited
    error InvalidNumber(); // for when the bettor tries to bet an invalid number
    error BettingPeriodHasEnded(); // for when the bettor tries to place a bet after the betting period has ended
    error BettingPeriodHasNotEnded(); // for when the bettor tries to claim the prize before the betting period has ended
    error InvalidValue(); // for when the bettor tries to bet with an invalid value
    error NoPrize(); // for when the bettor tries to claim a prize of a non winning bet
    error BetDoesNotBelongToBettor(); // for when the bettor tries to claim a prize of a bet that does not belong to him
    error PrizeAlreadyClaimed(); // for when the bettor tries to claim a prize that has already been claimed
    error InsufficientBalance(); // for when the contract does not have enough balance to pay the prize (which should never happen)
    error TooManyPublicAvailableGames(); // for when there are too many public games
    error AddParticipantsToPrivateGame(); // for when the creator tries to create a private game without participants
    // #endregion
 
    // #region Public Functions
    /**
     * @notice Create a public game
     */
    function createPublicGame() external {
        uint256 gameId = ++gameCount;

        if (publicAvailableGamesCount >= MAX_PUBLIC_AVAILABLE_GAMES) revert TooManyPublicAvailableGames();
        publicAvailableGames[publicAvailableGamesCount] = gameId;
        publicAvailableGamesCount++;

        _initializeGame(
            gameId,
            BETTING_PERIOD_BLOCKS_FOR_PUBLIC_GAMES,
            MIN_BET_VALUE_FOR_PUBLIC_GAMES,
            new address[](0),
            false
        );
    }

    /**
     * @notice Create a private game, only accessible by the participants. The private game might have custom bettingPeriodBlocks and minBetValue.
     * @param bettingPeriodBlocks The number of blocks for the betting period
     * @param minBetValue The minimum bet value
     * @param participants The participants of the private game
     */
    function createPrivateGame(uint256 bettingPeriodBlocks, uint256 minBetValue, address[] memory participants) external {
        if (participants.length == 0) {
            revert AddParticipantsToPrivateGame();
        }

        uint256 gameId = ++gameCount;

        for (uint256 i = 0; i < participants.length; i++) {
            privateGamesInvitations[participants[i]].push(gameId);
        }

        _initializeGame(
            gameId,
            bettingPeriodBlocks,
            minBetValue,
            participants,
            true
        );
    }

    /**
     * @notice Place a bet
     * @param gameId The game id
     * @param number The number the bettor bet on, between 1 and 25
     */
    function placeBet(uint256 gameId, uint8 number) external payable {
        Game storage game = games[gameId];
        
        if (game.bettingPeriodEnded) revert BettingPeriodHasEnded();

        game.combinedHash = keccak256(abi.encodePacked(game.combinedHash, blockhash(block.number - 1)));


        // The following conditions are to end the betting period.
        // Check if we are in the minimum ending block or after. This is important to avoid having a game that ends too soon.
        if (block.number >= game.minEndingBlock) {

            // Check if all numbers have been bet. This is important to avoid having a winning bet that is not possible to be claimed.
            if (hasAllNumbersBet(game)) {

                bytes32 blockHash = blockhash(block.number - 1);
                uint8 lastByte = uint8(uint256(blockHash) & 0xff);  // Last byte
                uint8 lastChar = lastByte & 0xf;                    // Last character (4 bits)
                uint8 secondLastChar = (lastByte >> 4) & 0xf;       // Second last character (4 bits)

                // Check if the last and second last characters are the same. This is important to add some randomness to the drawn number.
                if (lastChar == secondLastChar) {
                    // if all the conditions are met, end the betting period
                    _endBettingPeriod(game, gameId);
                    // return to avoid placing a bet after the betting period has ended
                    return;
                }
            }
        }

        // The following code is for placing a bet, not for ending the betting period
    
        // Check if the game is private and if the bettor is a participant
        if (game.participants.length > 0) {
            bool isParticipant = false;
            for (uint256 i = 0; i < game.participants.length; i++) {
                if (game.participants[i] == msg.sender) {
                    isParticipant = true;
                    break;
                }
            }
            if (!isParticipant) revert GamePrivate();
        }

        if (number < 1 || number > 25) revert InvalidNumber();
        if (msg.value < game.minBetValue) revert InvalidValue();

        game.betsPerNumber[number - 1] += msg.value;
        game.totalValue += msg.value;
        game.numberOfBets++;

        uint256 betId = ++betCount;
        Bet storage bet = bets[betId];
        bet.gameId = gameId;
        bet.bettor = msg.sender;
        bet.value = msg.value;
        bet.number = number;
        bet.prizeClaimed = false;

        emit BetPlaced(
            gameId,
            msg.sender,
            number,
            msg.value,
            block.timestamp,
            betId
        );
    }

    /**
     * @notice Claim the prize of a bet
     * @param betId The bet id
     */
    function claimPrize(uint256 betId) external {
        Bet storage bet = bets[betId];
        Game storage game = games[bet.gameId];

        if (!game.bettingPeriodEnded) revert BettingPeriodHasNotEnded();
        if (bet.prizeClaimed) revert PrizeAlreadyClaimed();
        if (bet.bettor != msg.sender) revert BetDoesNotBelongToBettor();

        uint256 prize = _calculatePrize(game, bet);
        if (prize == 0) revert NoPrize();

        uint256 gameBalance = address(this).balance;

        // We will pay the maximum possible value that the contract has
        uint256 prizeToTransfer = gameBalance >= prize ? prize : gameBalance;

        if (prizeToTransfer == 0) revert InsufficientBalance(); // This should never happen, but if nothing is sent, we will not spend the users ETH with the transaction

        bet.prizeClaimed = true;
        game.valueProvidedToWinners += prize;

        emit PrizeClaimed(
            bet.gameId,
            betId,
            msg.sender,
            _calculateDrawnNumber(game),
            prizeToTransfer,
            block.timestamp
        );

        // Transfer the prize last to avoid reentrancy
        (bool sent, ) = payable(msg.sender).call{value: prizeToTransfer}("");
        require(sent, "Failed to send prize");
    }

    /**
     * @notice Receive ETH. This could be used to refill the contract balance to pay the prize. But it is not necessary.
     */
    receive() external payable {}
    // #endregion

    // #region Private Functions
    /**
     * @notice Initialize a game. Used by createPublicGame and createPrivateGame
     * @param gameId The game id
     * @param bettingPeriodBlocks The number of blocks for the betting period
     * @param minBetValue The minimum bet value
     * @param participants The participants of the private game
     * @param isPrivate If true, the game is private
     */
    function _initializeGame(
        uint256 gameId,
        uint256 bettingPeriodBlocks,
        uint256 minBetValue,
        address[] memory participants,
        bool isPrivate
    ) private {
        Game storage game = games[gameId];
        
        game.creator = msg.sender;
        game.participants = participants;
        game.totalValue = 0;
        game.minEndingBlock = block.number + bettingPeriodBlocks;
        game.combinedHash = bytes32(0);
        game.bettingPeriodEnded = false;
        game.numberOfBets = 0;
        game.valueProvidedToWinners = 0;
        game.minBetValue = minBetValue;

        emit GameCreated(
            gameId,
            msg.sender,
            isPrivate,
            block.timestamp
        );
    }

    /**
     * @notice End the betting period. This function is called when a certain condition is met when placing a bet.
     * @param game The game
     * @param gameId The game id
     */
    function _endBettingPeriod(Game storage game, uint256 gameId) private {
        game.drawnNumber = _calculateDrawnNumber(game);
        game.bettingPeriodEnded = true;

        if (game.participants.length == 0) {
            _removeFromPublicAvailableGames(gameId);
        }

        // The desired paymentValue is the reward plus the refund of the bet value
        uint256 desiredPaymentValue = ENDING_BET_PERIOD_REWARD + msg.value;

        uint256 gameBalance = address(this).balance;

        // We will pay the maximum possible value that the contract has
        uint256 paymentValue = gameBalance >= desiredPaymentValue 
            ? desiredPaymentValue 
            : gameBalance;

        if (paymentValue == 0) revert InsufficientBalance(); // This should never happen, but if nothing is sent, we will not spend the users ETH with the transaction

        emit EndOfBettingPeriod(
            gameId,
            msg.sender,
            paymentValue,
            block.timestamp
        );

        // Transfer reward last to avoid reentrancy
        (bool sent, ) = payable(msg.sender).call{value: paymentValue}("");
        require(sent, "Failed to send reward");
    }

    /**
     * @notice Remove a game from the public available games
     * @param gameId The game id
     */
    function _removeFromPublicAvailableGames(uint256 gameId) private {
        for (uint256 i = 0; i < publicAvailableGamesCount; i++) {
            if (publicAvailableGames[i] == gameId) {
                publicAvailableGamesCount--;
                if (i < publicAvailableGamesCount) {
                    publicAvailableGames[i] = publicAvailableGames[publicAvailableGamesCount]; // replaces the game id to remove with the last game id
                }
                publicAvailableGames[publicAvailableGamesCount] = 0; // removes the last game id
                break;
            }
        }
    }
    // #endregion

    // #region Public View Functions
    
    /**
     * @notice Get a game
     * @param gameId The game id
     * @return The game object
     */
    function getGame(uint256 gameId) external view returns (Game memory) {
        return games[gameId];
    }

    /**
     * @notice Get a bet
     * @param betId The bet id
     * @return The bet object
     */
    function getBet(uint256 betId) external view returns (Bet memory) {
        return bets[betId];
    }

    /**
     * @notice Get the prize value of a bet
     * @param betId The bet id
     * @return The prize value in wei
     */
    function getPrize(uint256 betId) external view returns (uint256) {
        Bet storage bet = bets[betId];
        Game storage game = games[bet.gameId];
        return _calculatePrize(game, bet);
    }

    /**
     * @notice Get the public available games
     * @return The games ids
     */
    function getPublicAvailableGames() external view returns (uint256[] memory) {
        uint256[] memory availableGames = new uint256[](publicAvailableGamesCount);
        for (uint256 i = 0; i < publicAvailableGamesCount; i++) {
            availableGames[i] = publicAvailableGames[i];
        }
        return availableGames;
    }

    /**
     * @notice Get the first closeable public game
     * @return The game id
     */
    function getFirstCloseablePublicGame() external view returns (uint256) {
        uint256 currentBlock = block.number;

        for (uint256 i = 0; i < publicAvailableGamesCount; i++) {
            Game memory game = games[publicAvailableGames[i]];
            if (currentBlock > game.minEndingBlock && hasAllNumbersBet(game)) {
                return publicAvailableGames[i];
            }
        }
        return 0;
    }

    /**
     * @notice Check if all numbers have been bet
     * @param game The game
     * @return True if all numbers have been bet, false otherwise
     */
    function hasAllNumbersBet(Game memory game) private pure returns (bool) {
        for (uint8 i = 0; i < 25; i++) {
            if (game.betsPerNumber[i] == 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * @notice Get the time left for a game to reach the minimum ending block
     * @param gameId The game id
     * @return The time left in blocks
     */
    function timeLeft(uint256 gameId) public view returns (uint256) {
        Game storage game = games[gameId];
        if (block.number >= game.minEndingBlock) {
            return 0;
        }
        return game.minEndingBlock - block.number;
    }

    /**
     * @notice Get the private game invitations of a participant
     * @param participant The participant address
     * @return The games ids
     */
    function getPrivateGameInvitations(address participant) external view returns (uint256[] memory) {
        return privateGamesInvitations[participant];
    }
    // #endregion

    // #region Private View Functions
    /**
     * @notice Calculate the drawn number of a game. If the betting period has ended, it returns the drawn number. Otherwise, it returns the number that would be drawn if the betting period had ended at the current block.
     * @param game The game
     * @return The drawn number
     */
    function _calculateDrawnNumber(Game storage game) private view returns (uint8) {
        if (game.bettingPeriodEnded) {
            return game.drawnNumber;
        }

        bytes32 hash = game.combinedHash;
        uint256 sum = uint256(hash);
        return uint8((sum % 25) + 1);
    }

    /**
     * @notice Calculate the prize of a bet
     * @param game The game
     * @param bet The bet
     * @return The prize value in wei
     */
    function _calculatePrize(Game storage game, Bet storage bet) private view returns (uint256) {
        uint8 drawnNumber = _calculateDrawnNumber(game);
        uint256 totalBetOnNumber = game.betsPerNumber[drawnNumber - 1];

        if (totalBetOnNumber == 0 || bet.number != drawnNumber) {
            return 0;
        }

        uint256 adjustedTotalValue = game.totalValue;
        if (adjustedTotalValue > ENDING_BET_PERIOD_REWARD) {
            adjustedTotalValue -= ENDING_BET_PERIOD_REWARD;
        }

        return (adjustedTotalValue * bet.value) / totalBetOnNumber;
    }
    // #endregion

    // TODO: Allow the game creator to finalize the game and collect the remaining prize after 50000 blocks since the betting period ended
    // This is important to avoid having a huge array of games and bets and also to incentivize the creation of games
}
