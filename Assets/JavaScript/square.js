
class Square{
    constructor(id, occupation, enPassant, el){
        this.id = id;
        this.occupation = occupation;
        this.enPassant = enPassant;
        this.el = el;
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
