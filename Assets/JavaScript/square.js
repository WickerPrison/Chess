var promotionMenu = document.getElementById("promotionMenu");

// this dictionary allows us to get a reference to the image file from a letter
var spriteDictionary = {
    "r": "./Assets/Sprites/blackRook.svg",
    "R": "./Assets/Sprites/whiteRook.svg",
    "n": "./Assets/Sprites/blackKnight.svg",
    "N": "./Assets/Sprites/whiteKnight.svg",
    "b": "./Assets/Sprites/blackBishop.svg",
    "B": "./Assets/Sprites/whiteBishop.svg",
    "k": "./Assets/Sprites/blackKing.svg",
    "K": "./Assets/Sprites/whiteKing.svg",
    "q": "./Assets/Sprites/blackQueen.svg",
    "Q": "./Assets/Sprites/whiteQueen.svg",
    "p": "./Assets/Sprites/blackPawn.svg",
    "P": "./Assets/Sprites/whitePawn.svg"
}

// Each square on the board will have a copy of this class. It contains variables and methods the squares will need
class Square{
    constructor(id, occupation, enPassant, el, canMoveTo){
        this.id = id;
        this.occupation = occupation;
        this.enPassant = enPassant;
        this.el = el;
        this.canMoveTo = false;
        this.canCastleTo = false;
        this.canPromote = false;
    }

    // this method sets the sprite on the board based on the occupation variable
    setSprite(){
        if(this.occupation == "0"){
            this.el.innerHTML = this.id;
        }
        else{
            this.el.innerHTML = this.id + "<img src=" + spriteDictionary[this.occupation] + ">"
        }
    }

    // this method is called whenever a square is clicked on and decides what to do based on various circumstances
    getClicked(event){
        // if it is not the players turn nothing happens so the method ends early
        if(gameState != GameState.PLAYERTURN) return;

        var square = event.target.square;

        // this moves the rook if clicking on this square would result in castling
        if(square.canCastleTo){
            if(square.id == "g1"){
                var fromSquare = document.getElementById("h1").square;
                var toSquare = document.getElementById("f1").square;
            }
            else if (square.id == "c1"){
                var fromSquare = document.getElementById("a1").square;
                var toSquare = document.getElementById("d1").square;
            }
            castlesAvailable = castlesAvailable.replace("Q", "");
            castlesAvailable = castlesAvailable.replace("K", "");
            movePiece(fromSquare, toSquare);
        }

        // if square can be moved to then move to that square
        if(square.canMoveTo){
            movePiece(selectedSquare, square);
            var kingsSquare = board.find(function(kingSquare){
                return kingSquare.occupation == "K";
            })

            if(findCheck(kingsSquare)){
                console.log("can't move into check");
                readFen(startTurnPosition);
                return;
            }


            var selectedCoords = getCoordinates(selectedSquare.id);
            var newCoords = getCoordinates(square.id);
            var num = selectedCoords[1]
            var numTwo = newCoords[1];
            var eq = numTwo-num;

            if(square.occupation == 'P' && eq == 2){
                enPassantSquare = parseCoords(traverseFrom('u', selectedCoords));
                console.log('enpassante ' + enPassantSquare);
            }

            if(square.canPromote){
                gameState = GameState.PROMOTINGPAWN;
                promotionMenu.style.display = "block";
                promotionSquare = square;
                return;
            }

            clearAllSquares();
            gameState = GameState.WAITINGFORRESPONSE;
            endTurn(writeFen());
            return;
        }

        clearAllSquares();

        // if the square has a white piece then the square is selected
        if(square.occupation != square.occupation.toLowerCase()){
            selectedSquare = square;
            square.el.style.borderColor = Colors.SELECTED;
            square.el.style.borderWidth = BorderWidths.THICK;
            highlightMovableSquares(selectedSquare);
        }
    }

    // this function allows us to tell a square whether or not it can be moved to. It should take a bool as an input
    setCanMoveTo(canMoveToInput){
        if(this == selectedSquare) return;
        this.canMoveTo = canMoveToInput;
        if(this.canMoveTo){
            this.el.style.borderColor = Colors.CANMOVETO;
            this.el.style.borderWidth = BorderWidths.THICK;
        }
        else{
            this.el.style.borderColor = Colors.DEFAULT;
            this.el.style.borderWidth = BorderWidths.DEFAULT;
        }
    }
}

// this function creates a copy of the Square class and attaches it to every spaces element. It also adds an event listener to call the getClicked method and returns an array of all the spaces
function generateBoard () {
    var squares = document.getElementsByClassName('spaces');
    var board =[];
    for (var i = 0; i <squares.length; i++){
        var target = squares[i];
        var id  = target.getAttribute('id');
        var create = new Square(id, '0', false, target);
        target.square = create;
        target.addEventListener("click", create.getClicked);
        board.push(create);
    };

    return board;
}


function clearAllSquares(){
    if(selectedSquare != null){
        selectedSquare.el.style.borderColor = Colors.DEFAULT;
        selectedSquare.el.style.borderWidth = BorderWidths.DEFAULT;
        selectedSquare = null;
    }
    for(var i = 0; i < board.length; i++){
        board[i].setCanMoveTo(false);
        board[i].canCastleTo = false;
        board[i].canPromote = false;
    }
}