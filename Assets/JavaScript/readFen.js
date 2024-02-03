
function readFen(fenString){
    var fenArray = fenString.split(" ");
    fenString = fenArray[0];
    var whoseTurn = fenArray[1];
    var castlesAvailable = fenArray[2];
    var enPassantSquare = fenArray[3];
    turnsSinceTakeOrAdvance = fenArray[4];
    turnsNum = fenArray[5];

    var ranks = fenString.split("/");

    finalArray = [];
    for(var i = 0; i < ranks.length; i++){
        var row = ranks[i].split("");
        var finalRow = [];
        for(var j = 0; j < row.length; j++){

            // this gibberish is called regex, its basically black magic, but it works
            // it tests if the value in the fen string is a number or not
            if(/^\d+$/.test(row[j])){
                for(var k = 0; k < row[j]; k++){
                    finalRow.push(0);
                }
            }
            else{
                finalRow.push(row[j]);
            }
        }
        finalArray.push(finalRow);
    }

    return finalArray;
}