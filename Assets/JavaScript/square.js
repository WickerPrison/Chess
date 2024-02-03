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

        // if square can be moved to then move to that square
        if(square.canMoveTo){
            movePiece(selectedSquare, square);
            clearAllSquares();
            console.log(writeFen());
            return;
        }

        clearAllSquares();

        // if the square has a white piece then the square is selected
        if(square.occupation != square.occupation.toLowerCase()){
            selectedSquare = square;
            square.el.style.backgroundColor = Colors.SELECTED;
            highlightMovableSquares(selectedSquare);
        }
    }

    // this function allows us to tell a square whether or not it can be moved to. It should take a bool as an input
    setCanMoveTo(canMoveToInput){
        if(this == selectedSquare) return;
        this.canMoveTo = canMoveToInput;
        if(this.canMoveTo){
            this.el.style.backgroundColor = Colors.CANMOVETO;
        }
        else{
            this.el.style.backgroundColor = Colors.DEFAULT;
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
        selectedSquare.el.style.backgroundColor = Colors.DEFAULT;
        selectedSquare = null;
    }
    for(var i = 0; i < board.length; i++){
        board[i].setCanMoveTo(false);
    }
}