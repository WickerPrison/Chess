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
        this.getColumnUp(startSquare);
        this.getColumnDown(startSquare);
        this.getRowRight(startSquare);
        this.getRowLeft(startSquare);
    }
    getColumnUp(startSquare) {
        console.log("Rook Up");
        var location = startSquare.id;
        var coords = getCoordinates(location);
    if(this.color == 'white'){
        var tempCoords = coords.slice();
        for(var i = 0; i < 8; i++) {
            var oneUp = traverseFrom("u",coords);
            var ID = parseCoords(oneUp);
            var nextOccupation = checkSquare(ID);
            var collisionPiece = getPiece(ID);
            if(nextOccupation == 0) {
               var columnUp = document.getElementById(ID).square;
               columnUp.setCanMoveTo(true);
            } else if(collisionPiece.color != this.color) {
                var columnUp = document.getElementById(ID).square;
               columnUp.setCanMoveTo(true);
               return;
            } else {
                return;
            }
        }
    }
}
    getColumnDown(startSquare) {
        console.log("Rook Down");
    var location = startSquare.id;
        var coords = getCoordinates(location);
    if(this.color == 'white'){
        var tempCoords = coords.slice();
        for(var i = 0; i < 8; i++) {
            var oneDown = traverseFrom("d",coords);
            var ID = parseCoords(oneDown);
            var nextOccupation = checkSquare(ID);
            var collisionPiece = getPiece(ID);
            if(nextOccupation == 0) {
               var columnDown = document.getElementById(ID).square;
               columnDown.setCanMoveTo(true);
            } else if(collisionPiece.color != this.color) {
                var columnDown = document.getElementById(ID).square;
               columnDown.setCanMoveTo(true);
               return;
            } else {
                return;
            }
        }
    }
    }
    
    
    getRowRight(startSquare) {
        console.log("Rook Right");
        var location = startSquare.id;
        var coords = getCoordinates(location);
    if(this.color == 'white'){
        var tempCoords = coords.slice();
        for(var i = 0; i < 8; i++) {
            var oneRight = traverseFrom("r",coords);
            var ID = parseCoords(oneRight);
            var nextOccupation = checkSquare(ID);
            var collisionPiece = getPiece(ID);
            if(nextOccupation == 0) {
               var rowRight = document.getElementById(ID).square;
               rowRight.setCanMoveTo(true);
            } else if(collisionPiece.color != this.color) {
                var rowRight = document.getElementById(ID).square;
               rowRight.setCanMoveTo(true);
               return;
            } else {
                return;
            }
        }
    }
}
getRowLeft(startSquare){
    console.log("Rook Left");
    var location = startSquare.id;
        var coords = getCoordinates(location);
    if(this.color == 'white'){
        var tempCoords = coords.slice();
        for(var i = 0; i < 8; i++) {
            var oneLeft = traverseFrom("l",coords);
            var ID = parseCoords(oneLeft);
            var nextOccupation = checkSquare(ID);
            var collisionPiece = getPiece(ID);
            if(nextOccupation == 0) {
               var rowLeft = document.getElementById(ID).square;
               rowLeft.setCanMoveTo(true);
            } else if(collisionPiece.color != this.color) {
                var rowLeft = document.getElementById(ID).square;
               rowLeft.setCanMoveTo(true);
               return;
            } else {
                return;
            }
        }
    }
    }
}

class bishop {
    constructor(fenID){
        this.fenId = fenID;
        if(fenID=='b'){
            this.color = "white";
        } else {
            this.color = "black";
        }
    }
    //gets and displays all available bishop moves given a square
    getMoves(startSquare){
        this.getUpRight(startSquare);
        this.getUpLeft(startSquare);
        this.getDownRight(startSquare);
        this.getDownLeft(startSquare);
    }
    getUpRight(startSquare) {
        console.log("Bishop Up Right");
        var location = startSquare.id;
        var coords = getCoordinates(location);
    if(this.color == 'white'){
        var tempCoords = coords.slice();
        for(var i = 0; i < 8; i++) {
            var oneUpRight = traverseFrom("ur",coords);
            var ID = parseCoords(oneUpRight);
            var nextOccupation = checkSquare(ID);
            var collisionPiece = getPiece(ID);
            if(nextOccupation == 0) {
               var upRight = document.getElementById(ID).square;
               upRight.setCanMoveTo(true);
            } else if(collisionPiece.color != this.color) {
                var upRight = document.getElementById(ID).square;
               upRight.setCanMoveTo(true);
               return;
            } else {
                return;
            }
        }
    }
}
    getUpLeft(startSquare) {
        console.log("Bishop Up Left");
    var location = startSquare.id;
        var coords = getCoordinates(location);
    if(this.color == 'white'){
        var tempCoords = coords.slice();
        for(var i = 0; i < 8; i++) {
            var oneUpLeft = traverseFrom("ul",coords);
            var ID = parseCoords(oneUpLeft);
            var nextOccupation = checkSquare(ID);
            var collisionPiece = getPiece(ID);
            if(nextOccupation == 0) {
               var upLeft = document.getElementById(ID).square;
               upLeft.setCanMoveTo(true);
            } else if(collisionPiece.color != this.color) {
                var upLeft = document.getElementById(ID).square;
               upLeft.setCanMoveTo(true);
               return;
            } else {
                return;
            }
        }
    }
    }
    
    
    getDownRight(startSquare) {
        console.log("Bishop Down Right");
        var location = startSquare.id;
        var coords = getCoordinates(location);
    if(this.color == 'white'){
        var tempCoords = coords.slice();
        for(var i = 0; i < 8; i++) {
            var oneDownRight = traverseFrom("r",coords);
            var ID = parseCoords(oneDownRight);
            var nextOccupation = checkSquare(ID);
            var collisionPiece = getPiece(ID);
            if(nextOccupation == 0) {
               var downRight = document.getElementById(ID).square;
               downRight.setCanMoveTo(true);
            } else if(collisionPiece.color != this.color) {
                var downRight = document.getElementById(ID).square;
               downRight.setCanMoveTo(true);
               return;
            } else {
                return;
            }
        }
    }
}
getDownLeft(startSquare){
    console.log("Bishop Down Left");
    var location = startSquare.id;
        var coords = getCoordinates(location);
    if(this.color == 'white'){
        var tempCoords = coords.slice();
        for(var i = 0; i < 8; i++) {
            var oneDownLeft = traverseFrom("l",coords);
            var ID = parseCoords(oneDownLeft);
            var nextOccupation = checkSquare(ID);
            var collisionPiece = getPiece(ID);
            if(nextOccupation == 0) {
               var downLeft = document.getElementById(ID).square;
               downLeft.setCanMoveTo(true);
            } else if(collisionPiece.color != this.color) {
                var downLeft = document.getElementById(ID).square;
               downLeft.setCanMoveTo(true);
               return;
            } else {
                return;
            }
        }
    }
    }
}