var promotionButtons = document.getElementsByClassName("promotionButton");
var warning = document.getElementById("warning");

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

// this variable tracks which square currently has a pawn that needs to be promoted
var promotionSquare;

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
    STALEMATE: "STALEMATE",
    PROMOTINGPAWN: "PROMOTINGPAWN"
}
// this variable will track the state of the game
var gameState = GameState.PLAYERTURN;

var board = generateBoard();

var initialBoardFenString = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
var startTurnPosition = initialBoardFenString;
var fenArray = readFen(initialBoardFenString);

// var testFenString = "k7/8/2b1b3/8/5p2/r7/6PK/6NR b - - 0 1";
// var startTurnPosition = testFenString;
// readFen(testFenString);


// this function will show any string it is given on the screen for 0.6 seconds
function showMessage(messageString){
    warning.innerText = messageString;
    warning.style.display = "block";
    setTimeout(function(){
        warning.style.display = "none";
    }, 600)
}

// this is used to promote the player's pawns after they make their selection for what they will promote into
function promotePawn(event){
    promotionSquare.occupation = event.target.id;
    promotionSquare.setSprite();
    promotionSquare = "";
    promotionMenu.style.display = "none";
    clearAllSquares();
    gameState = GameState.WAITINGFORRESPONSE;
    endTurn(writeFen());
}

for(var i = 0; i < promotionButtons.length; i++){
    promotionButtons[i].addEventListener("click", promotePawn);
}