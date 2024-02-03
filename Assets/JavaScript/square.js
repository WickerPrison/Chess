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
            console.log(this.occupation);
            this.el.innerHTML = "<img src=" + spriteDictionary[this.occupation] + ">"
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
        board.push(create);
    };

    return board;
}
