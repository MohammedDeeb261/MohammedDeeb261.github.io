/*Mohammed Deeb, 922875899, MohammedDeeb261*/

var totalClicks=0;
var correct =0;
var incorrect=0;
var totalScore=0.0;
var maxCorrect=0;
var rounds=1;
const maxRounds=10;
let unusedSentences = [
    { sentence: "sam first met pam while camping in tampa, florida.", correctIndices: [0, 3, 7, 8] },
    { sentence: "pam invited sam to read a book called puppy partners with her.", correctIndices: [0, 2, 8, 9] },
    { sentence: "puppy partners is about two silly dogs named pookie and pokey", correctIndices: [0, 1, 8, 10] },
    { sentence: "pookie and pokey go to a school called poochenworth academy.", correctIndices: [0, 2, 8, 9]},
    { sentence: "pam's favorite part about puppy partners was a crazy character called petey the parakeet.", correctIndices: [0, 4, 5, 11, 13]},
    { sentence: "sam said, \"now i get a turn! let's read my dinosaur book!\"", correctIndices: [0, 2, 3, 7]},
    { sentence: "the book was called \"dino the dinosaur doctor.\"", correctIndices: [0, 4, 6, 7]},
    { sentence: "\"dino the dinosaur doctor\" was about a dinosaur doctor named dr. dino who healed sick dinosaurs.", correctIndices: [0, 2, 3, 10, 11]},
    { sentence: "pam loved the book and wanted to show it to her favorite teacher, mr. morton.", correctIndices: [0, 13, 14]},
    { sentence: "her main man sam said, \"that's all good, pam, as long as you can get it back to me by wednesday.\"", correctIndices: [0, 3, 5, 8, 20]},
    { sentence: "then pam and sam got into a fiery dispute about the impact of amazon's kindle on the act of reading.", correctIndices: [0, 1, 3, 13, 14]},
    { sentence: "pam loves her kindle paperwhite because she can read in the dark and define words by touching them.", correctIndices: [0, 3, 4, ]},
    { sentence: "sam prefers the feel of real books, even sticky ones like \"dino the dinosaur doctor.\"", correctIndices: [0, 11, 13, 14]},
    { sentence: "pam and sam both enrolled in mr. morton's reading 101 course next year.", correctIndices: [0, 2, 6, 7, 8]},
    { sentence: "they might get into another dispute while learning about american literature and british literature", correctIndices: [0, 9, 12]}
];

let incorrectFeedback = [ 
    "Incorrect. Try again.",
    "Not quite. Keep going!",
    "Wrong answer. Keep trying!",
    "Sorry, that's incorrect.",
    "That's not right. Keep playing to improve.",
    "Nope, that's incorrect. Keep practicing.",
    "Incorrect answer. Don't give up!",
    "Not the right answer. Keep thinking.",
    "Incorrect. Keep going, you'll get it!",
]

// Array of statements for correct answers
let correctFeedback = [
    "Correct! Great job!",
    "That's it! You got it right!",
    "Excellent! That's the correct answer.",
    "You're correct! Keep up the good work!",
    "Well done! That's the right answer.",
    "Right on! That's the correct answer.",
    "Bingo! That's it.",
    "Brilliant! You got the right answer.",
    "Perfect! That's the correct answer.",
    "Congratulations! You got it right!"
  ];



let upperSection = document.getElementById("upper");

let scoreDiv = document.createElement('div');
scoreDiv.className = "score";
scoreDiv.innerText = "Score: 0";
scoreDiv.id = "score";

let roundDiv = document.createElement("div");
roundDiv.className = "round";
roundDiv.innerText = "round: "+ rounds+ "/"+ maxRounds;
roundDiv.id = "round";

upperSection.appendChild(scoreDiv);
upperSection.appendChild(roundDiv);

let usedSentences =[];
let words=[];
displayScore(0,rounds,maxRounds);
setWords();



function displayScore(score, round, totalRounds){
    scoreDiv.innerText = "Current Score: " + totalScore;
    roundDiv.innerText = "Round: "+ rounds + "/"+maxRounds;
}

function clickListener(arr) {
    arr.forEach(word => {
        word.addEventListener("click", eventListener);
    });
}

function eventListener(event) {
    const word = event.target;
    console.log(word.id);
    click(word);
}

// This function handles a click event on a word.
function click(word) {
    const index = words.indexOf(word);
    console.log("index", index);

    // Get the sentence object of the currently used sentence.
    const sentence = usedSentences[usedSentences.length - 1];

    // Check if the clicked word is a correct word or not.
    if (sentence.correctIndices.includes(index)) {
        handleCorrectClick(word);
    } else {
        handleIncorrectClick(word);
    }

    // Increment the total click count.
    totalClicks++;

    // If the number of correct words clicked is greater than or equal to the maximum number of correct words in the sentence, 
    // handle the end of the sentence.
    if (correct >= maxCorrect) {
        handleMaxCorrect();
    }
}

// This function handles a correct click event on a word.
function handleCorrectClick(word) {
    console.log("correct");

    // Increment the correct count and total score.
    correct++;
    totalScore++;

    //remove previous feedback
    removeChildren(document.getElementById("feedback"));

    //displays correct feedback
    let incorrectFb= selectFeedback(correctFeedback);
    let fbDiv = document.createElement("div");
    fbDiv.innerText = incorrectFb+ " + 1 pts";
    fbDiv.className= "correct_feedback";
    document.getElementById("feedback").appendChild(fbDiv);

    // Add the "correct" class to the word and capitalize its first letter.
    word.classList.add("correct");
    capitalizeFirstLetter(word);

    // Remove the click listener from the word and update the score display.
    word.removeEventListener("click", eventListener);
    displayScore(totalScore, rounds, maxRounds);
}

// This function handles an incorrect click event on a word.
function handleIncorrectClick(word) {
    console.log("incorrect");
    //remove previous feedback
    removeChildren(document.getElementById("feedback"));

    // Increment the incorrect count and decrease the total score by 0.5.
    incorrect++;
    totalScore -= 0.5;

      //displays incorrect feedback
      let incorrectFb= selectFeedback(incorrectFeedback);
      let fbDiv = document.createElement("div");
      fbDiv.innerText = incorrectFb+ " -0.5 pts";
      fbDiv.className= "incorrect_feedback";
      document.getElementById("feedback").appendChild(fbDiv);

    // Add the "incorrect" class to the word and remove the click listener from it.
    word.classList.add("incorrect");
    word.removeEventListener("click", eventListener);

    // Update the score display.
    displayScore(totalScore, rounds, maxRounds);
}


function selectFeedback(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

function capitalizeFirstLetter(word) {
    if (word.textContent.charAt(0) != '"') {
        word.textContent = word.textContent.charAt(0).toUpperCase() + word.textContent.slice(1);
    } else {
        word.textContent = word.textContent.charAt(0) + word.textContent.charAt(1).toUpperCase() + word.textContent.slice(2);
    }
}

function handleMaxCorrect() {
    
    words.forEach(word => {
        word.removeEventListener("click", eventListener);
    });

    var nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    document.getElementById('next_output').appendChild(nextButton);
    // Add event listener to "Next" button
    nextButton.addEventListener('click', () => {
        rounds++;
        displayScore(totalScore, rounds, maxRounds);
        // Remove "Next" button
        nextButton.parentNode.removeChild(nextButton);
        // Reset correct and incorrect counts and display the next sentence
        correct = 0;
        incorrect = 0;
        if (rounds >=maxRounds) {
            gameEnd();
        }
        setWords();
    });
}

function gameEnd(){
    // select all elements on the page
    var allElements = document.body.querySelectorAll("*");

    // loop through all elements and remove them
    for (var i = 0; i < allElements.length; i++) {
    allElements[i].remove();
    }

    const score = document.createElement("div"); // create a new word element
    score.className = "score_e";
    score.innerText = "Score: "+ totalScore;
    
    
    var options = document.createElement("div");
    options.className= "options";


    // create a new link element
    var mainM = document.createElement("a");
    mainM.className= "option";
    // set the link's href attribute
    mainM.href = "../index.html";
    // set the link's text content
    mainM.textContent = "Exit";


    // create a new link element
    var challenges = document.createElement("a");
    challenges.className= "option";
    // set the link's href attribute
    challenges.href = "./gamemodes.html";
    // set the link's text content
    challenges.textContent = "Go to challenges";



    // add the score to the page
    document.body.appendChild(score);
    // add the link to options
    options.appendChild(mainM);
    // add the link to options
    options.appendChild(challenges);
    // add the options to the page
    document.body.appendChild(options);
}

       


// Sets up a new sentence and attaches click listeners to each word
function setWords() {
    const sentenceObj = getRandomSentence(); // get a random sentence object
    const sentenceDiv = document.getElementById("s");
    const words = createWordElements(sentenceObj.sentence, sentenceDiv); // create word elements for the sentence
    maxCorrect = sentenceObj.correctIndices.length; // set the maximum number of correct clicks for the sentence
    clickListener(words); // attach click listeners to the words
}

// Retrieves a random sentence object from the unusedSentences array and removes it
function getRandomSentence() {
    const randomIndex = Math.floor(Math.random() * unusedSentences.length);
    const sentenceObj = unusedSentences[randomIndex];
    usedSentences.push(sentenceObj);
    unusedSentences.splice(randomIndex, 1);
    return sentenceObj;
}

// Creates a new word element for each word in the sentence and appends it to the parent element
function createWordElements(sentence, parentElement) {
    removeChildren(parentElement); // remove any existing word elements from the parent element
    const arr = []; // array to store the created word elements
    const brokenSentence = sentence.split(" "); // split the sentence into individual words
    for (let i = 0; i < brokenSentence.length; i++) {
        const currentElem = document.createElement("div"); // create a new word element
        currentElem.className = "word";
        currentElem.innerText = brokenSentence[i];
        currentElem.id = "w" + i.toString();
        parentElement.appendChild(currentElem); // append the word element to the parent element
        arr.push(currentElem); // add the word element to the array
    }
    words=arr; // set the global words variable to the array of word elements
    return words; // return the array of word elements
}

// Removes all child elements from the specified parent element
function removeChildren(e){
    var child = e.lastElementChild; 
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}
