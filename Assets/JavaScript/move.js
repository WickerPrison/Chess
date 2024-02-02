//TODO movement logic and functions for pieces

var squares = generateBoard();

function getCoordinates(id) {
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var  input = id.split("");
    var x;
    for(var i = 0; i< alphabet.length; i++){
        if(input[0] == alphabet[i]){
            x =i;
        }
    }
    var coords = [x, input[1]];
    return coords;
}

function checkLine(direction, id) {
    if(direction === "up"){

    }
    else if(direction === "down"){
        
    }
    else if(direction === "left"){
        
    }
    else if(direction === "right"){
        
    }



}

function checkDiagonal(direction, square){

}

