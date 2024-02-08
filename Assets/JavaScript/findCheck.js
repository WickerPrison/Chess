// what pieces are dangerous from only 1 space away
var closeDangerousPieces = {
    "u": "rqk",
    "d": "rqk",
    "l": "rqk",
    "r": "rqk",
    "ul": "bqkp",
    "ur": "bqkp",
    "dl": "bqk",
    "dr": "bqk"
}

// what pieces are dangerous from > 1 space away
var farDangerousPieces = {
    "u": "rq",
    "d": "rq",
    "l": "rq",
    "r": "rq",
    "ul": "bq",
    "ur": "bq",
    "dl": "bq",
    "dr": "bq"
}

var isChecked;
var directions = ["u", "d", "l", "r", "ul", "ur", "dl", "dr"];

// this function returns true if the chosen square is under attack by stockfish
function findCheck(startingSquare){
    isChecked = false;
    for(var i = 0; i < directions.length; i++){
        checkDirection(directions[i], startingSquare);
        if(isChecked){
            return true;
        }
    }

    checkForKnight(startingSquare);
    if(isChecked){
        return true;
    }

    return false;
}


// these strings give directions to every possible knight move away from the given square
var knightDirections = ["uur", "uul", "llu", "lld", "ddr", "ddl", "rru", "rrd"]; 

function checkForKnight(startSquare){
    var location = startSquare.id;
    
    for(var i = 0; i < knightDirections.length; i++){
        var coords = getCoordinates(location);
        var directions = knightDirections[i].split("");
        for(var j = 0; j < directions.length; j++){
            coords = traverseFrom(directions[j], coords);
        }
        var ID = parseCoords(coords);

        if(ID == null) continue;

        var occupation = checkSquare(ID);

        if(occupation == "n"){
            isChecked = true;
            return;
        }
    }
}

// checks vertical, horizontal, and diagonals for dangerous pieces
function checkDirection(direction, startSquare){
    var location = startSquare.id;
    var coords = getCoordinates(location);

    for(var i = 0; i < 8; i++) {
        var oneStep = traverseFrom(direction,coords);
        var ID = parseCoords(oneStep);

        if(ID == null) return;
        
        var nextOccupation = checkSquare(ID);

        if(nextOccupation != 0 && nextOccupation.toUpperCase() == nextOccupation){
            return;
        }

        if(nextOccupation != 0 && nextOccupation.toLowerCase() == nextOccupation){
            if(i == 0 && closeDangerousPieces[direction].includes(nextOccupation)){
                isChecked = true;
            }
            else if(farDangerousPieces[direction].includes(nextOccupation)){
                isChecked = true;
            }
            return;
        }
    }
}