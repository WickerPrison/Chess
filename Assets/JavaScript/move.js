//TODO movement logic and functions for pieces

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// this is the function that actually moves the pieces
function movePiece(fromSquare, toSquare){
    toSquare.occupation = fromSquare.occupation;
    toSquare.setSprite();
    fromSquare.occupation = "0";
    fromSquare.setSprite();
}

// this function determines which squares can be moved to and tells the squares. It takes a Square class as an input
// for now this function will just have every piece move forward one square
function highlightMovableSquares(startSquare){
    var occupation = startSquare.occupation;
    if(occupation == '0'){
        return;
    } else{

        for(var i = 0; i < board.length; i++){
            board[i].setCanMoveTo(false);
        }
        var piece=getPiece(startSquare.occupation);
        piece.getMoves(startSquare);

    }

    //IMPORTANT: leaving the code for each piece moving forward only one hear for troubleshooting. piece logic will go here.
    // var startingCoords = getCoordinates(square.id);
    // var nextCoords = traverseFrom("u", startingCoords);
    // var nextSquare = document.getElementById(parseCoords(nextCoords)).square;
    // nextSquare.setCanMoveTo(true);
}


//used to turn an id into coordinates for traversing the board. 
//IMPORTANT
//coords[1] is a number pulled directly from the id and are therefore indexed 1 to 8
//coords [0] calls the converted letter, which are drawn from an array and will be indexed 0 to 7
//so its important to always use checkSquare after traversing the board to properly get the id back.
function getCoordinates(id) {
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

//NOTE: input is in a string direction of a single letter and [num,num] coordinates. remember to use get coordinates for input from an id in addition this function doesn't check whether a square actually exists. this allows for repition for more complex pieces such as knights.
function traverseFrom(direction, coords) {
    var letterNum = coords[0];
    var num = coords[1];

    switch (direction){
        case "u":
            num++;
            coords[1] = num;
            return coords;
        case "d":
            num--;
            coords[1] = num;
            return coords;
        case "l":
            letterNum--;
            coords[0] =letterNum;
            return coords;
        case "r":
            letterNum++;
            coords[0] =letterNum;
            return coords;
        case "ur":
            coords = traverseFrom('u', coords);
            coords = traverseFrom('r', coords);
            return coords;
        case "ul":
            coords = traverseFrom('u', coords);
            coords = traverseFrom('l', coords);
            return coords;
        case "dr":
            coords = traverseFrom('d', coords);
            coords = traverseFrom('r', coords);
            return coords;
        case "dl":
            coords = traverseFrom('d', coords);
            coords = traverseFrom('l', coords);
            return coords;
        default:
            throw new console.error("invalid input in function traverseFrom");
    }
}

//takes coordinates and parses them to an id. Then grabs obj by id and checks the occupation value, and returns it. 
function parseCoords(coords){
    var num;
    var letter;
    var id;
    if(coords[0]<= 7 && coords[0]>=0 && coords[1]<= 8 && coords[1]>0){
        letter = alphabet[coords[0]]
        num = coords[1];
        id = `${letter}${num}`
        return id;
    } else{
        //IMPORTANT: this return case for if the coordinate provided is not a square can be null or false. up to the group I guess.
        return null;
    }
}

function checkSquare(id){
    if(id != null){

        //I've never used .filter before. I expect a problem here at some point
        var target = board.findIndex( function(element){
           return element.id === id;
        })
        var targetSquare = board[target];
        var occupation = targetSquare.occupation;
        return occupation;
    }
    else{
        return null;
    }
}