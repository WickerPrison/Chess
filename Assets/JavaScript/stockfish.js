var requestStringStart = "https://stockfish.online/api/stockfish.php?fen=";
// this variable determines how many moves in advance stockfish looks. Values between 5 and 13 are valid.
var depth = 13;

var endGame = document.getElementById("end-game");
var endGameDiv = document.getElementById("endGameContainer");

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
        // var piece = initialSquare.occupation;
        var newSquare = document.getElementById(parseCoords(newCoords)).square;
        movePiece(initialSquare, newSquare);
        blackEnPassant(inputFen);
        if(bestMove.length == 5){
            newSquare.occupation = bestMove[4];
            newSquare.setSprite();
        }
        
        if(initialCoords[1] == 7 && newCoords[1] == 5 && initialCoords[0] == newCoords[0] && newSquare.occupation == "p"){
            var enPassantCoords = [initialCoords[0], 6];
            enPassantSquare = parseCoords(enPassantCoords);
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
        // wait for animation to finish
        setTimeout(function(){
            // if there is a checkmate data.data will return "Game over in position.""
            if(data.data == "Game over in position."){
                // if the player's turn just ended the gamestate will be waiting for a response from stockfish
                if(gameState == GameState.WAITINGFORRESPONSE){
                    gameState = GameState.WHITEWINS;
                    endGame.innerText = "White Wins You Filthy Cheater!";
                    endGameDiv.style.display = "block";
                }
                // if stockfish just ended it's turn the game state will still be set to STOCKFISHTURN
                else if (gameState == GameState.STOCKFISHTURN){
                    gameState = GameState.BLACKWINS;
                    endGame.innerText = "Black Wins!";
                    endGameDiv.style.display = "block";
                    if(localStorage.getItem("lossCounter")==null){
                        localStorage.setItem("lossCounter",1)
                    }
                    else{
                        localStorage.setItem("lossCounter",+localStorage.getItem("lossCounter")+1);
                    }
                    updateNorrisIsTruth.removeEventListener("click", chuckNorrisInventedAPIs);

                    if(localStorage.getItem("lossCounter") == 1){
                    chuckNorrisSection.textContent = "You've lost to StockFish " + localStorage.getItem("lossCounter") + " time. "
                    }else {
                        chuckNorrisSection.textContent = "You've lost to StockFish " + localStorage.getItem("lossCounter") + " times. "
                    }
    
                }
                gameOver = true;
            }
            // stockfish returns "bestmove (none)" if there is a stalemate
            else if(data.data == "bestmove (none)"){
                gameState = GameState.STALEMATE;
                endGame.innerText = "Stalemate";
                endGameDiv.style.display = "block";
            }
            else{
                // if stockfish returns anything else the game should proceed
                if(gameState == GameState.STOCKFISHTURN){
                    startTurnPosition = writeFen();
                    addToFenStorrage(startTurnPosition);

                    gameState = GameState.PLAYERTURN;

                }
                if(gameState == GameState.WAITINGFORRESPONSE){
                    gameState = GameState.STOCKFISHTURN;
                    getStockfishMove(writeFen());
                }
            }
        }, animateTime * 1000);
    })
}