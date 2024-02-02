
class Square{
    constructor(id, occupation, enPassant){
        
    }
}

function generateBoard () {
    var squares = document.getElementsByClassName('spaces');
    for (var i = 0; i <squares.length; i++){
        var target = squares[i];
        var id  = target.getAttribute('id');
        var create = new Square(id, '0', false);
    };
}
