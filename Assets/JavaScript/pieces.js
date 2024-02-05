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
        console.log(startSquare);
        var location = startSquare.id;
        var coords = getCoordinates(location);
        console.log("coords" + coords)
        if(this.color == 'white'){
            var oneUp = traverseFrom("u", coords);
            console.log(oneUp);
            var regularMove= document.getElementById(parseCoords(oneUp)).square;
            regularMove.setCanMoveTo(true);
            this.checkDiagonals(coords);
            //if it has not moved it can move one or two squares forward
            if(coords[1] == '2'){
                var twoUp = traverseFrom("u", oneUp);
            console.log(true);
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
        var leftSquare = getPiece(targetLeft);

        //checks right
        if((rightSquare != undefined && rightSquare.color != this.color)){
            var captureRight= document.getElementById(parseCoords(diagRight)).square;
            captureRight.setCanMoveTo(true);
        }
        //checksLeft
        if(leftSquare != undefined && leftSquare.color != this.color){
            var captureLeft= document.getElementById(parseCoords(diagLeft)).square;
            captureLeft.setCanMoveTo(true);
        }

    }
}

