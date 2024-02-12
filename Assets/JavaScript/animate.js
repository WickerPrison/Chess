var movingPiece = document.getElementById("movingPiece");
var animateTime = 0.3;

function animate(fromSquare, toSquare){
    movingPiece.innerHTML = "d1" + "<img src=" + spriteDictionary[fromSquare.occupation] + ">"
    movingPiece.style.transition = "none";
    var rect = fromSquare.el.getBoundingClientRect();
    movingPiece.style.left = rect.left + "px";
    movingPiece.style.top = rect.top + "px";
    movingPiece.style.display = "block";

    movingPiece.style.transition = "all " + animateTime + "s ease";
    rect = toSquare.el.getBoundingClientRect();
    movingPiece.style.left = rect.left + "px";
    movingPiece.style.top = rect.top + "px";

    setTimeout(function (){
        movingPiece.style.display = "none";
    }, animateTime * 1000);

}