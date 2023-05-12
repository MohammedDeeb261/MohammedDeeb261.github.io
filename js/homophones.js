/*Mohammed Deeb, 922875899, MohammedDeeb261*/

var totalClicks=0;
var correct =0;
var incorrect=0;
var totalScore=0.0;
var maxCorrect=1;
var maxIncorrect= 1;
var rounds=1;
const maxRounds=10;
let unusedSentences = [
    { sentence: "\"I can't believe this class is one hour / our long,\" said John.", choiceIndices: [7,9], correctIndex: 7 },
    { sentence: "\"I know, that's a long thyme / time , right?\" I replied." , choiceIndices: [5, 7], correctIndex: 7 },
    { sentence: "John is my best friend and I'll never meat / meet a better friend than him", choiceIndices: [8, 10], correctIndex: 10 },
    { sentence: "Our teacher was giving us a lessen / lesson on homophones", choiceIndices: [6, 8], correctIndex: 8 },
    { sentence: "It was still pretty early in the morning / mourning.", choiceIndices: [7, 9], correctIndex: 7 },
    { sentence: "That was when those ninjas jumped threw / through the window.", choiceIndices: [6, 8], correctIndex: 8 },
    { sentence: "I was worried because ninjas are masters of the marshal / martial arts.", choiceIndices: [9, 11], correctIndex: 11 },
    { sentence: "I could feel their cold stairs / stares on me. ", choiceIndices: [5, 7], correctIndex: 7 },
    { sentence: "\"John, they are here to steal / steel our teacher's answer keys,\" I said.", choiceIndices: [5, 7], correctIndex: 5 },
    { sentence: "John didn't seam / seem that worried. ", choiceIndices: [2, 4], correctIndex: 4 },
    { sentence: "I exclaimed, \"We can knot / not let that happen, John!\"", choiceIndices: [4, 6], correctIndex: 6 },
    { sentence: "John said, \"I just don't sea / see why we should put ourselves in danger for more homework.\"", choiceIndices: [5, 7], correctIndex: 7 },
    { sentence: "I stood up and said, \"Because it's the right / write thing to do, John.\"", choiceIndices: [8, 10], correctIndex: 8 },
    { sentence: "Some of these ninjas were twice my sighs / size so I had to be smart", choiceIndices: [7, 9], correctIndex: 9 },
    { sentence: "I grabbed the answer keys and ran toward the principal's / principle's office", choiceIndices: [9, 11], correctIndex: 9 },
    { sentence: "The ninjas were chasing me so I dropped a banana peal / peel on the ground.", choiceIndices: [10, 12], correctIndex: 12 },
    { sentence: "One of the ninjas slipped and fell into the garbage chute / shoot face first.", choiceIndices: [10, 12], correctIndex: 10 },
    { sentence: "I said, \"What a waist / waste ,\" as I heard him fall into the dumpster with a crash.", choiceIndices: [4, 6], correctIndex:  6},
    { sentence: "The ninjas were still chasing me so I lead / led them downstairs.", choiceIndices: [8, 10], correctIndex: 10 },
    { sentence: "I grabbed a handful of tacks / tax from a bulletin board and tossed them on the floor.", choiceIndices: [5, 7], correctIndex: 5 },
    { sentence: "Then I hid in a supply closet as the ninjas ran passed / past me. ", choiceIndices: [11, 13], correctIndex: 13 },
    { sentence: "I knew / new when they ran over my trap because several ninjas started howling.", choiceIndices: [1, 3], correctIndex: 1 }
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
let words = [];
displayScore(0,rounds,maxRounds);
setWords();



function displayScore(score, round, totalRounds){
    scoreDiv.innerText = "Current Score: " + totalScore;
    roundDiv.innerText = "Round: "+ rounds + "/"+maxRounds;
}

function removeEventListeners(list) {
    list.forEach(e => {
        e.removeEventListener('click', eventListener);
    });
  }


  function clickListener(arr) {   
    for (let i=0; i<arr.length; i++){
        if (usedSentences[usedSentences.length-1].choiceIndices.includes(i)){
            arr[i].addEventListener("click", eventListener);
        }
    }
}

function eventListener(event) {
    const word = event.target;
    console.log(word.id);
    click(word);
}



function click(word) {
    const index = words.indexOf(word);
    const sentence = usedSentences[usedSentences.length-1];
   
    if (sentence.correctIndex == index) {
        correctClick(word);
    } else {
        incorrectClick(word);
    }
    totalClicks++;
    if (correct >= maxCorrect || incorrect>= maxIncorrect) {
        nextRoundButton();
    }
    removeEventListeners(words);
}

function correctClick(word) {
    correct++;
    totalScore++;
    word.classList.add("correct");
    word.removeEventListener("click", eventListener);
    displayScore(totalScore, rounds, maxRounds);
    addCorrectFeedback();
}

function addCorrectFeedback() {
    let choiceIndices = usedSentences[usedSentences.length-1].choiceIndices;
    let sentenceDiv = document.getElementById("s");
    let correctAnswer = words[usedSentences[usedSentences.length-1].correctIndex];
    
    for (let i = 0; i < words.length; i++) {
      if (i >= choiceIndices[0] && i <= choiceIndices[choiceIndices.length-1]) {
        sentenceDiv.removeChild(words[i]);
      }
    }
  
    const referenceNode = sentenceDiv.children[choiceIndices[0]];
    sentenceDiv.insertBefore(correctAnswer, referenceNode);
    let feedbackDiv = document.createElement("div");
    feedbackDiv.className = "correct_feedback";
    feedbackDiv.innerText = correctFeedback[Math.floor(Math.random() * correctFeedback.length)] + " +1 pt";
    document.getElementById("feedback").appendChild(feedbackDiv);
  }
  

function incorrectClick(word) {
    incorrect++;
    totalScore -= 0.5;
    word.classList.add("incorrect");
    word.removeEventListener("click", eventListener);
    displayScore(totalScore, rounds, maxRounds);
    addIncorrectFeedback();
}

function addIncorrectFeedback(){ 
    let incorrectFb= selectFeedback(incorrectFeedback);
    let qSentence = document.getElementById("s");
    let correctSentence = document.getElementById("s2");
 
    correctSentence.innerHTML = '<span style="font-weight:bold;text-decoration:underline">Correct Sentence: </span>';
    copyChildren(qSentence,correctSentence);
    let choiceIndices = usedSentences[usedSentences.length-1].choiceIndices;
    let correctAnswer = words[usedSentences[usedSentences.length-1].correctIndex];
    let correctAnswerCopy = copyCorrectAnswer(correctAnswer);
    for (let i = 0; i<words.length; i++){
        if (i>=choiceIndices[0] && i<=choiceIndices[choiceIndices.length-1]){
            removeByText(correctSentence.childNodes, words[i].innerText)
        }
    }
    let fbDiv = document.createElement("div");
    fbDiv.innerText = incorrectFb+ " -0.5 pts";
    fbDiv.className= "incorrect_feedback";
    document.getElementById("feedback").appendChild(fbDiv);
    const referenceNode = correctSentence.children[choiceIndices[0]+2];
    correctSentence.insertBefore(correctAnswerCopy, referenceNode);

}


function selectFeedback(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

function removeByText(nodes, text){
    nodes.forEach((element) => {
    if (element.textContent.includes(text)) {
        element.parentNode.removeChild(element); // remove the element
    }
});
}

function copyCorrectAnswer(node){
    var currentElem = document.createElement("div");
    currentElem.className = "word";
    currentElem.textContent = node.innerText;
    currentElem.style.color= "rgb(25, 175, 25)";
    currentElem.style.fontWeight = 700;
    currentElem.style.textDecoration = "underline";
    return currentElem;
}

function copyChildren(source, destination){
    let sChildren = source.childNodes;
    for (let i = 0; i < sChildren.length; i++){
        const currentElem = document.createElement("div");
        currentElem.className = "word";
        currentElem.textContent = sChildren[i].textContent;
        currentElem.id = "w2-" + i.toString();
        destination.appendChild(currentElem);
    }
}

function nextRoundButton() {
    let choiceIndices = usedSentences[usedSentences.length-1].choiceIndices;
    for (let i = 0; i < words.length; i++) {
        if (choiceIndices.includes(i)) {
            words[i].addEventListener("click", eventListener);
        }
    }

    let nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    document.getElementById('next_step').appendChild(nextButton);
    nextButton.addEventListener('click', () => {
        nextRound();
    });
}

function nextRound() {
    rounds++;
    displayScore(totalScore, rounds, maxRounds);
    removeChildren(document.getElementById('s2'));
    removeChildren(document.getElementById('feedback'));
    document.getElementById('s2').innerText="";
    removeChildren(document.getElementById('next_step'));
    correct = 0;
    incorrect = 0;
    if (rounds == maxRounds) {
       gameEnd()
    }
    setWords();
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

       



// This function sets the words for the game.
function setWords() {
    // Select a random sentence object.
    const sentenceObj = selectSentence();

    // Get the sentence string, the indices of the word choices, and the correct choice index from the sentence object.
    const sentence = sentenceObj.sentence;
    const choiceIndices = sentenceObj.choiceIndices;
    const correctIndex = sentenceObj.correctIndex;

    // Add the sentence object to the used sentences array and remove it from the unused sentences array.
    usedSentences.push(sentenceObj);
    removeUnusedSentence(sentenceObj);

    // Split the sentence string into an array of words.
    const brokenSentence = sentence.split(" ");

    // Get the sentence div element and remove all of its child elements.
    const sentenceDiv = document.getElementById("s");
    removeChildren(sentenceDiv);

    // Create a div element for each word in the sentence and add it to the sentence div element.
    const arr = [];
    for (let i = 0; i < brokenSentence.length; i++) {
        const currentElem = document.createElement("div");
        currentElem.className = "word";
        currentElem.innerText = brokenSentence[i];
        if (choiceIndices.includes(i)){
            currentElem.style.fontWeight = 700;
            currentElem.style.textDecoration = "underline";
        }
        currentElem.id = "w" + i.toString();
        sentenceDiv.appendChild(currentElem);
        arr.push(currentElem);
    }
    words = arr;

    // Add a click event listener to each word element.
    clickListener(words);
}

// This function selects a random sentence object from the unused sentences array.
function selectSentence() {
    const randomIndex = Math.floor(Math.random() * unusedSentences.length);
    return unusedSentences[randomIndex];
}

// This function removes a sentence object from the unused sentences array.
function removeUnusedSentence(sentenceObj) {
    const index = unusedSentences.indexOf(sentenceObj);
    unusedSentences.splice(index, 1);
}

// This function removes all child elements from a given element.
function removeChildren(e){
    let child = e.lastElementChild; 
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}




