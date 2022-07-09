var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// Event listener to clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retreives local stroage 
var highscores = localStorage.getItem("highscores");
highscores = JSON.parse(highscores);

if (highscores !== null) {

    for (var i = 0; i < highscores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = highscores[i].initials + " " + highscores[i].score;
        highScore.appendChild(createLi);

    }
}
// Event listener to move to index page
goBack.addEventListener("click", function () {
    window.location.replace("index.html");
});