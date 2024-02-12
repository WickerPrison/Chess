var movingPiece = document.getElementById("movingPiece");
var animateTime = 0.3;

function animate(fromSquare, toSquare){
    movingPiece.innerHTML = "d1" + "<img src=" + spriteDictionary[fromSquare.occupation] + ">"
    movingPiece.style.transition = "none";
    var coordinates = getDocumentCoordinates(fromSquare.el);
    movingPiece.style.left = coordinates.left + "px";
    movingPiece.style.top = coordinates.top + "px";
    movingPiece.style.display = "block";

    movingPiece.style.transition = "all " + animateTime + "s ease";
    coordinates = getDocumentCoordinates(toSquare.el);
    movingPiece.style.left = coordinates.left + "px";
    movingPiece.style.top = coordinates.top + "px";

    setTimeout(function (){
        movingPiece.style.display = "none";
    }, animateTime * 1000);
}

function getDocumentCoordinates(element){
    var windowCoords = element.getBoundingClientRect();
    var documentCoords ={
        top: windowCoords.top + window.scrollY,
        left:windowCoords.left +window.scrollX
    }
    return documentCoords;
}