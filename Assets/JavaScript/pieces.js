//pieces logic below
function getPiece(fenID){
    //will eventually have cases for each piece. Given a FenID grabs the appropriate piece class.
    switch(fenID){
        case 'r':
        case 'R':
            var piece = new rook(fenID);
            return piece;
        case 'n':
        case 'N':
            var piece = new knight(fenID);
            return piece;
        case 'b':
        case 'B':
             var piece = new bishop(fenID);
            return piece;
        case 'k':
        case 'K':
            var piece = new king(fenID);
            return piece;
        case 'q':
        case 'Q':
            var piece = new queen(fenID);
            return piece;
        case 'p':
        case 'P':
            var piece = new pawn(fenID);
            return piece;
        default:
            return;
    }
}

class pawn  {
    constructor(fenID){
        if(fenID== 'P'){

            this.color = 'white';
        }
        else{
            this.color = 'black'
        }
    }
    //gets and displays all available pawn moves given a square
    getMoves(startSquare) {
        var location = startSquare.id;
        var coords = getCoordinates(location);
        if(this.color == 'white'){
            var oneUp = traverseFrom("u", coords);
            coords =getCoordinates(location);
            var nextOccupation = checkSquare(parseCoords(oneUp));
            //checks for a piece blocking the regular move
            if(nextOccupation == '0'){

                var regularMove= document.getElementById(parseCoords(oneUp)).square;
                regularMove.setCanMoveTo(true);

                var twoUp = traverseFrom("u", oneUp);
                coords = getCoordinates(location);
                var twoBlocksUp = checkSquare(parseCoords(twoUp));

                //if it has not moved forward and the spot is not taken it can move two
                if(coords[1] == '2' && twoBlocksUp == '0'){
                    var firstAllowed = document.getElementById(parseCoords(twoUp)).square;
                    firstAllowed.setCanMoveTo(true);
                }
            }
            this.checkDiagonals(startSquare);

        }
        else{
            //black logic
        }
    }
    //checks diagonals to see if they exist, and occupied by an eneemy peice if they are, the moves are available.
    checkDiagonals(startSquare){
        var location = startSquare.id;
        var coords = getCoordinates(location);

        var diagRight = traverseFrom("ur", coords);
        coords = getCoordinates(location);
        var targetRight= checkSquare(parseCoords(diagRight));
        var rightSquare = getPiece(targetRight);


        var diagLeft = traverseFrom("ul", coords);
        coords = getCoordinates(location);
        var targetLeft= checkSquare(parseCoords(diagLeft));
        var leftSquare = getPiece(targetLeft);
        
        //checks right
        if((rightSquare != undefined && rightSquare != null && rightSquare.color != this.color)){
            var captureRight= document.getElementById(parseCoords(diagRight)).square;
            captureRight.setCanMoveTo(true);
            console.log('right Checked');
        }
        //checksLeft
        if(leftSquare != undefined && leftSquare != null && leftSquare.color != this.color){
            var captureLeft= document.getElementById(parseCoords(diagLeft)).square;
            captureLeft.setCanMoveTo(true);
            console.log('left Checked');
        }

    }
}

// this function is just what nathan and william wrote but slightly tweaked to be more general
// this can be used to find pieces along any direction so it works for bishops, rooks, and queens
function getDirection(direction, startSquare){
    var location = startSquare.id;
    var coords = getCoordinates(location);

    for(var i = 0; i < 8; i++) {
        var oneStep = traverseFrom(direction,coords);
        var ID = parseCoords(oneStep);

        if(ID == null) return;
        
        var nextOccupation = checkSquare(ID);
        if(nextOccupation == 0) {
           var nextSquare = document.getElementById(ID).square;
           nextSquare.setCanMoveTo(true);
        } else if(nextOccupation.toLowerCase() == nextOccupation) {
            var nextSquare = document.getElementById(ID).square;
           nextSquare.setCanMoveTo(true);
           return;
        } else {
            return;
        }
    }
}

class rook {
    constructor(fenID){
        this.fenId = fenID;
        if(fenID=='R'){
            this.color = "white";
        } else {
            this.color = "black";
        }
    }
    //gets and displays all available rook moves given a square
    getMoves(startSquare){
        if(this.color == "white"){
            getDirection("u", startSquare);
            getDirection("d", startSquare);
            getDirection("l", startSquare);
            getDirection("r", startSquare);
        }
        else{
            // black logic
        }
    }
}

class bishop {
    constructor(fenID){
        this.fenId = fenID;
        if(fenID=='B'){
            this.color = "white";
        } else {
            this.color = "black";
        }
    }
    //gets and displays all available bishop moves given a square
    getMoves(startSquare){
        if(this.color == "white"){
            getDirection("ul", startSquare);
            getDirection("ur", startSquare);
            getDirection("dl", startSquare);
            getDirection("dr", startSquare);
        }
        else{
            // black logic
        }
    }
}

class queen {
    constructor(fenID){
        this.fenId = fenID;
        if(fenID=='Q'){
            this.color = "white";
        } else {
            this.color = "black";
        }
    }
    //gets and displays all available queen moves given a square
    getMoves(startSquare){
        if(this.color == "white"){
            getDirection("u", startSquare);
            getDirection("d", startSquare);
            getDirection("l", startSquare);
            getDirection("r", startSquare);
            getDirection("ul", startSquare);
            getDirection("ur", startSquare);
            getDirection("dl", startSquare);
            getDirection("dr", startSquare);
        }
        else{
            // black logic
        }
    }
}


class king  {
    constructor(fenID){
        if(fenID== 'K'){

            this.color = 'white';
        }
        else{
            this.color = 'black'
        }
    }
}

class knight  {
    constructor(fenID){
        if(fenID== 'N'){

            this.color = 'white';
        }
        else{
            this.color = 'black'
        }
    }
}