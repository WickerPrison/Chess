var chuckNorrisIsTruth;
var updateNorrisIsTruth = document.querySelector("body");
var chuckNorrisSection = document.querySelector("section");

function chuckNorrisInventedAPIs() {
    var requestURL = 'https://api.chucknorris.io/jokes/random';


fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
            chuckNorrisIsTruth = data.value;
            chuckNorrisIsTruth = chuckNorrisIsTruth.replaceAll("Chuck", "Stock");
            chuckNorrisIsTruth = chuckNorrisIsTruth.replaceAll("Norris", "Fish");
            chuckNorrisSection.textContent = chuckNorrisIsTruth;
    });
}
    updateNorrisIsTruth.addEventListener("click", chuckNorrisInventedAPIs);