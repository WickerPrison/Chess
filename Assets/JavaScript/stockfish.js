var requestStringStart = "https://stockfish.online/api/stockfish.php?fen=";
// this variable determines how many moves in advance stockfish looks. Values between 5 and 13 are valid.
var depth = 13;

var endGame = document.getElementById("end-game");

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
        endTurn(writeFen(false));
    })
}

function endTurn(fenString){
    fetch(requestStringStart + fenString + "&depth=5&mode=bestmove")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if(data.data == "Game over in position."){
            if(gameState == GameState.WAITINGFORRESPONSE){
                gameState = GameState.WHITEWINS;
                endGame.innerText = "White Wins You Filthy Cheater!";
                endGame.style.display = "block";
            }
            else if (gameState == GameState.STOCKFISHTURN){
                gameState = GameState.BLACKWINS;
                endGame.innerText = "Black Wins!";
                endGame.style.display = "block";
            }
            gameOver = true;
        }
        else if(data.data == "bestmove (none)"){
            gameState = GameState.STALEMATE;
            endGame.innerText = "Stalemate";
            endGame.style.display = "block";
        }
        else{
            if(gameState == GameState.STOCKFISHTURN){
                gameState = GameState.PLAYERTURN;
            }
            if(gameState == GameState.WAITINGFORRESPONSE){
                gameState = GameState.STOCKFISHTURN;
                getStockfishMove(writeFen());
            }
        }
    })
}