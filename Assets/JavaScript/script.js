// this tracks the total number of turns
var turnsNum = 0;

// this tracks the number of turns since a piece was taken or a pawn has advanced. At 50 the game ends in a draw
var turnsSinceTakeOrAdvance = 0;

// this string tracks which castles are still legal
var castlesAvailable;

// this tracks which square if any an en passant move is legal
var enPassantSquare = "-"

// this variable tracks which square is currently being selected
var selectedSquare;

// these are basically a poor man's enums. All they really do is let us store strings in a way that we don't have to type it out every time.
const Colors = {
    DEFAULT: "var(--defaultBorderColor)",
    SELECTED: "var(--selectedBorderColor)",
    CANMOVETO: "var(--canMoveToBorderColor)"
}

const BorderWidths = {
    DEFAULT: "var(--normalBorderWidth)",
    THICK: "var(--highlightedBorderWidth)"
}

const GameState = {
    PLAYERTURN: "PLAYERTURN",
    WAITINGFORRESPONSE: "WAITINGFORRESPONSE",
    STOCKFISHTURN: "STOCKFISHTURN",
    BLACKWINS: "BLACKWINS",
    WHITEWINS: "WHITEWINS",
    STALEMATE: "STALEMATE"
}
// this variable will track the state of the game
var gameState = GameState.PLAYERTURN;

var board = generateBoard();

// var initialBoardFenString = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
// var startTurnPosition = initialBoardFenString;
// var fenArray = readFen(initialBoardFenString);

var testFenString = "7k/5q2/8/8/5R2/5K2/8/8 w - - 0 1";
var startTurnPosition = testFenString;
readFen(testFenString);

