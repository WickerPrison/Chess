//pieces logic below




class pawn  {
    constructor(fenID){
        this.color = color;
        if(color == 'p'){

            this.color = 'white';
        }
        else{
            this.color = 'black'
        }
    }
    //gets and displays all available pawn moves given a square id
    getMoves(location) {
        var coords = getCoordinates(location);
        if(color == 'white'){
            var oneUp = traverseFrom("u", coords);
            var regularMove= document.getElementById(parseCoords(oneUp)).square;
            regularMove.setCanMoveTo(true);
            this.checkDiagonals(coords);
            //if it has not moved it can move one or two squares forward
            if(coords[1] === 2){
                var twoUp = traverseFrom("u", oneUp);
                var firstAllowed = document.getElementById(parseCoords(twoUp)).square;
                firstAllowed.setCanMoveTo(true);
            }

        }
        else{
            //black logic
        }

    }
    //checks diagonals to see if they exist, and occupied by an eneemy peice if they are, the moves are available.
    checkDiagonals(coords){
        var diagRight = traverseFrom("ur", coords);
        var targetRight= parseCoords(diagRight);
        var rightSquare = getPiece(targetRight);

        var diagLeft = traverseFrom("ul", coords);
        var targetLeft= parseCoords(diagLeft);
        var leftSquare = getPiece(targetRight);

        //checks right
        if((rightSquare != undefined && rightSquare.color !=this.color)){
            var captureRight= document.getElementById(parseCoords(diagRight)).square;
            captureRight.setCanMoveTo(true);
        }
        checksLeft
        if(targetLeft != 0 && targetLeft != targetLeft.toLowerCase()){
            var captureLeft= document.getElementById(parseCoords(diagRight)).square;
            captureLeft.setCanMoveTo(true);
        }

    }
}

//will eventually have cases for each of them
function getPiece(fenID){
    switch(fenID){
        case 'p':
        case 'P':
            var piece = new pawn(fenID);
            return piece;
        //other pieces here
        default:
            return;
    }
}
