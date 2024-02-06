//pieces logic below
function getPiece(fenID){
    //will eventually have cases for each piece. Given a FenID grabs the appropriate piece class.
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
        }
        //checksLeft
        if(leftSquare != undefined && leftSquare != null && leftSquare.color != this.color){
            var captureLeft= document.getElementById(parseCoords(diagLeft)).square;
            captureLeft.setCanMoveTo(true);
        }

    }
}

