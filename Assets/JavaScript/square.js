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
    constructor(id, occupation, enPassant, el){
        this.id = id;
        this.occupation = occupation;
        this.enPassant = enPassant;
        this.el = el;
    }

    // this method sets the sprite on the board based on the occupation variable
    setSprite(){
        if(this.occupation == 0){
            this.el.innerHTML = "";
        }
        else{
            this.el.innerHTML = "<img src=" + spriteDictionary[this.occupation] + ">"
        }
    }

    // this method is called whenever a square is clicked on and decides what to do based on various circumstances
    getClicked(event){
        // if it is not the players turn nothing happens so the method ends early
        if(gameState != GameState.PLAYERTURN) return;

        // the previously selected square is unselected
        var square = event.target.square;
        if(selectedSquare != null){
            selectedSquare.el.style.backgroundColor = "lightblue";
            selectedSquare = null;
        }

        // if the square has a white piece then the square is selected
        if(typeof square.occupation == "string" && square.occupation == square.occupation.toUpperCase()){
            selectedSquare = square;
            square.el.style.backgroundColor = "Green";
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
