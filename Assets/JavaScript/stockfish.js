var requestStringStart = "https://stockfish.online/api/stockfish.php?fen=";
// this variable determines how many moves in advance stockfish looks. Values between 5 and 13 are valid.
var depth = 13;

function getStockfishMove(inputFen){
    fetch(requestStringStart + inputFen + "&depth=" + depth + "&mode=bestmove")
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        var outputArray = data.data.split(" ");
        var bestMove = outputArray[1].split("");
        var initialCoords = [alphabet.indexOf(bestMove[0]), bestMove[1]];
        var newCoords = [alphabet.indexOf(bestMove[2]), bestMove[3]];

        var initialSquare = document.getElementById(parseCoords(initialCoords)).square;
        var newSquare = document.getElementById(parseCoords(newCoords)).square;
        console.log(newSquare);
        movePiece(initialSquare, newSquare);
        gameState = GameState.PLAYERTURN;
    })
}