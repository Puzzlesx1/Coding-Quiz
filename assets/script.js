// Declared variables
var score = 0;
var questionIndex = 0;
var timer = document.querySelector("#timer");
var startQuiz = document.querySelector("#startQuiz");
var questions = document.querySelector("#questions");
var container = document.querySelector("#container");
var createUl = document.createElement("ul");
var penalty = 10;
var holdInterval = 0;
var timeRem = 60;
var points = 20;
var questionsArray = [
    {
        question: "What is the proper tag when linking a CSS?",
        choices: ["<script>", "<link>", "<src>", "<CSS>"],
        answer: "<link>"
    },
    {
        question: "Which tag is used to list items with bullets?",
        choices: ["<ul>", "<list>", "<ol>", "<bullets>"],
        answer: "<ul>"
    },
    {
        question: "The first page of a website is called?",
        choices: ["Design Page", "Web Page", "Home Page", "Main Page"],
        answer: "Home Page"
    },
    {
        question: "What CSS selector is used for an ID?",
        choices: ["*", ".", ":", "#"],
        answer: "#"
    },
    {
        question: "What year was the World Wide Web invented?",
        choices: ["1989", "1990", "1987", "1991"],
        answer: "1989"
    },

];


// Starts questions/timer on click 
startQuiz.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            timeRem--;
            timer.textContent = "Time: " + timeRem;

            if (timeRem <= 0) {
                clearInterval(holdInterval);
                allDone();
                timer.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

//Render questions
function render(questionIndex) {
    questions.innerHTML = "";
    createUl.innerHTML = "";
    for (var i = 0; i < questionsArray.length; i++) {
        var userQuestion = questionsArray[questionIndex].question;
        var userChoices = questionsArray[questionIndex].choices;
        questions.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questions.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questionsArray[questionIndex].answer) {
            score = score + points;
            createDiv.textContent = "Correct!";
        } else {
            timeRem = timeRem - penalty;
            createDiv.textContent = "Incorrect! The correct answer is:  " + questionsArray[questionIndex].answer;
        }

    }
    questionIndex++;

    if (questionIndex >= questionsArray.length) {
        allDone();
        createDiv.textContent = "The End!" + " " + "You got a score of: " + score;
    } else {
        render(questionIndex);
    }
    questions.appendChild(createDiv);

}
// Set up final page 
function allDone() {
    questions.innerHTML = "";
    timer.innerHTML = "";
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"
    questions.appendChild(createH1);
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questions.appendChild(createP);

    if (timeRem >= 0) {
        var timeRemaining = timeRem;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "You finished with " + timeRemaining + " seconds remaining";

        questions.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your name: ";

    questions.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questions.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questions.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var name = createInput.value;

        if (name === null) {

            console.log("Error");

        } else {
            var finalScore = {
                Name: name,
                score: timeRemaining
            }
            console.log(finalScore);
            var highscores = localStorage.getItem("highscores");
            if (highscores === null) {
                highscores = [];
            } else {
                highscores = JSON.parse(highscores);
            }
            highscores.push(finalScore);
            var newScore = JSON.stringify(highscores);
            localStorage.setItem("highscores", newScore);
            window.location.replace("HS.html");
        }
    });

}
