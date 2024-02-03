// hooray new script
var turnsNum = 0;
var turnsSinceTakeOrAdvance = 0;

var board = generateBoard();
console.log(board);

var initialBoardFenString = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
var testFenString = "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2";
var fenArray = readFen(initialBoardFenString);


for(var i = 0; i < 8; i++){
    for(var j=0; j < 8; j++){
        board[i * 8 + j].occupation = fenArray[i][j];
        board[i * 8 + j].setSprite();
        console.log(board[i * 8 + j].occupation);
    }
}