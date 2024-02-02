
function readFen(fenString){
    var fenArray = split(" ");
    fenString = fenArray[0];
    var whoseTurn = fenArray[1];
    var castlesAvailable = fenArray[2];
    var enPassantSquare = fenArray[3];
    turnsSinceTakeOrAdvance = fenArray[4];
    turnsNum = fenArray[5];

    var ranks = fenString.split("/");

    finalArray = [];
    for(var i = 0; i < ranks.length; i++){
        finalArray.push(ranks[i].split(""));
    }

    return finalArray;
}