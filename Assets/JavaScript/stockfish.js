var requestStringStart = "https://stockfish.online/api/stockfish.php?fen=";
// this variable determines how many moves in advance stockfish looks. Values between 5 and 13 are valid.
var depth = 13;

// this function takes a fen string as an input and moves the black pieces for stockfish
function getStockfishMove(inputFen){
    fetch(requestStringStart + inputFen + "&depth=" + depth + "&mode=bestmove")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        // these lines parse stockfish's output into our coordinate system
        var outputArray = data.data.split(" ");
        var bestMove = outputArray[1].split("");
        var initialCoords = [alphabet.indexOf(bestMove[0]), bestMove[1]];
        var newCoords = [alphabet.indexOf(bestMove[2]), bestMove[3]];

        // these lines get references to the square instances needed and move the pieces
        var initialSquare = document.getElementById(parseCoords(initialCoords)).square;
        var newSquare = document.getElementById(parseCoords(newCoords)).square;
        movePiece(initialSquare, newSquare);
        gameState = GameState.PLAYERTURN;
    })
}