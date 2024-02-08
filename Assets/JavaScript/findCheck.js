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

function findCheck(startingSquare){
    isChecked = false;
    for(var i = 0; i < directions.length; i++){
        checkDirection(directions[i], startingSquare);
        if(isChecked){
            return true;
        }
    }
    return false;
}

function checkDirection(direction, startSquare){
    var location = startSquare.id;
    var coords = getCoordinates(location);

    for(var i = 0; i < 8; i++) {
        var oneStep = traverseFrom(direction,coords);
        var ID = parseCoords(oneStep);

        if(ID == null) return;
        
        var nextOccupation = checkSquare(ID);

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