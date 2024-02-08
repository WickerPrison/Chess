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
        if(data.data == ""){
            console.log("blank output from stockfish");
        }

        // these lines parse stockfish's output into our coordinate system
        var outputArray = data.data.split(" ");
        var bestMove = outputArray[1].split("");
        var initialCoords = [alphabet.indexOf(bestMove[0]), bestMove[1]];
        var newCoords = [alphabet.indexOf(bestMove[2]), bestMove[3]];
        
        // these lines get references to the square instances needed and move the pieces
        var initialSquare = document.getElementById(parseCoords(initialCoords)).square;
        var newSquare = document.getElementById(parseCoords(newCoords)).square;
        movePiece(initialSquare, newSquare);
        
        if(bestMove.length == 5){
            newSquare.occupation = bestMove[4];
            newSquare.setSprite();
        }
        endTurn(writeFen(false));
    })
}

// this function is called at the end of every turn by either player or stockfish
function endTurn(fenString){
    fetch(requestStringStart + fenString + "&depth=5&mode=bestmove")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        // if there is a checkmate data.data will return "Game over in position.""
        if(data.data == "Game over in position."){
            // if the player's turn just ended the gamestate will be waiting for a response from stockfish
            if(gameState == GameState.WAITINGFORRESPONSE){
                gameState = GameState.WHITEWINS;
                endGame.innerText = "White Wins You Filthy Cheater!";
                endGame.style.display = "block";
            }
            // if stockfish just ended it's turn the game state will still be set to STOCKFISHTURN
            else if (gameState == GameState.STOCKFISHTURN){
                gameState = GameState.BLACKWINS;
                endGame.innerText = "Black Wins!";
                endGame.style.display = "block";
            }
            gameOver = true;
        }
        // stockfish returns "bestmove (none)" if there is a stalemate
        else if(data.data == "bestmove (none)"){
            gameState = GameState.STALEMATE;
            endGame.innerText = "Stalemate";
            endGame.style.display = "block";
        }
        else{
            // if stockfish returns anything else the game should proceed
            if(gameState == GameState.STOCKFISHTURN){
                startTurnPosition = writeFen();
                gameState = GameState.PLAYERTURN;
            }
            if(gameState == GameState.WAITINGFORRESPONSE){
                gameState = GameState.STOCKFISHTURN;
                getStockfishMove(writeFen());
            }
        }
    })
}