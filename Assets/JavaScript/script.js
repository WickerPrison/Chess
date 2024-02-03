// this tracks the total number of turns
var turnsNum = 0;

// this tracks the number of turns since a piece was taken or a pawn has advanced. At 50 the game ends in a draw
var turnsSinceTakeOrAdvance = 0;

// this string tracks which castles are still legal
var castlesAvailable;

// this tracks which square if any an en passant move is legal
var enPassantSquare;

// this variable tracks which square is currently being selected
var selectedSquare;


// these are basically a poor man's enums. All they really do is let us store strings in a way that we don't have to type it out every time.
const Colors = {
    DEFAULT: "lightblue",
    SELECTED: "Green",
    CANMOVETO: "lightgreen"
}

const GameState = {
    PLAYERTURN: "PLAYERTURN",
    STOCKFISHTURN: "STOCKFISHTURN",
}
// this variable will track the state of the game
var gameState = GameState.PLAYERTURN;

var board = generateBoard();

var initialBoardFenString = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
var testFenString = "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2";
var fenArray = readFen(initialBoardFenString);

// this loops through the board array and the output of the readFen function and places all the peices as they should be according to the fen string
for(var i = 0; i < 8; i++){
    for(var j=0; j < 8; j++){
        board[i * 8 + j].occupation = fenArray[i][j];
        board[i * 8 + j].setSprite();
    }
}