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


class Square{
    constructor(id, occupation, enPassant, el){
        this.id = id;
        this.occupation = occupation;
        this.enPassant = enPassant;
        this.el = el;
    }

    setSprite(){
        if(this.occupation == 0){
            this.el.innerHTML = "";
        }
        else{
            this.el.innerHTML = "<img src=" + spriteDictionary[this.occupation] + ">"
        }
    }

    getClicked(event){
        var square = event.target.square;
        if(typeof square.occupation == "string" && square.occupation == square.occupation.toUpperCase()){
            if(selectedSquare != null){
                selectedSquare.el.style.backgroundColor = "lightblue";
            }
            selectedSquare = square;
            square.el.style.backgroundColor = "Green";
        }
    }
}

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
