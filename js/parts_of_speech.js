/*Mohammed Deeb, 922875899, MohammedDeeb261*/

var totalClicks=0;
var correct =0;
var incorrect=0;
var totalScore=0.0;
var maxCorrect=1;
var maxIncorrect= 7;
var rounds=1;
const maxRounds=10;
let unusedWords = [
    { word: 'dog', partOfSpeech: 'Noun' },
    { word: 'cat', partOfSpeech: 'Noun' },
    { word: 'elephant', partOfSpeech: 'Noun' },
    { word: 'car', partOfSpeech: 'Noun' },
    { word: 'book', partOfSpeech: 'Noun' },
    { word: 'teacher', partOfSpeech: 'Noun' },
    { word: 'student', partOfSpeech: 'Noun' },
    { word: 'desk', partOfSpeech: 'Noun' },
    { word: 'ocean', partOfSpeech: 'Noun' },
    { word: 'city', partOfSpeech: 'Noun' },
    { word: 'I', partOfSpeech: 'Pronoun' },
    { word: 'you', partOfSpeech: 'Pronoun' },
    { word: 'he', partOfSpeech: 'Pronoun' },
    { word: 'she', partOfSpeech: 'Pronoun' },
    { word: 'we', partOfSpeech: 'Pronoun' },
    { word: 'they', partOfSpeech: 'Pronoun' },
    { word: 'it', partOfSpeech: 'Pronoun' },
    { word: 'him', partOfSpeech: 'Pronoun' },
    { word: 'her', partOfSpeech: 'Pronoun' },
    { word: 'them', partOfSpeech: 'Pronoun' },
    { word: 'is', partOfSpeech: 'Verb' },
    { word: 'run', partOfSpeech: 'Verb' },
    { word: 'eat', partOfSpeech: 'Verb' },
    { word: 'jump', partOfSpeech: 'Verb' },
    { word: 'sleep', partOfSpeech: 'Verb' },
    { word: 'laugh', partOfSpeech: 'Verb' },
    { word: 'see', partOfSpeech: 'Verb' },
    { word: 'hear', partOfSpeech: 'Verb' },
    { word: 'smell', partOfSpeech: 'Verb' },
    { word: 'taste', partOfSpeech: 'Verb' },
    { word: 'happy', partOfSpeech: 'Adjective' },
    { word: 'sad', partOfSpeech: 'Adjective' },
    { word: 'funny', partOfSpeech: 'Adjective' },
    { word: 'scary', partOfSpeech: 'Adjective' },
    { word: 'cold', partOfSpeech: 'Adjective' },
    { word: 'hot', partOfSpeech: 'Adjective' },
    { word: 'fast', partOfSpeech: 'Adjective' },
    { word: 'slow', partOfSpeech: 'Adjective' },
    { word: 'quickly', partOfSpeech: 'Adverb' },
    { word: 'slowly', partOfSpeech: 'Adverb' },
    { word: 'happily', partOfSpeech: 'Adverb' },
    { word: 'sadly', partOfSpeech: 'Adverb' },
    { word: 'loudly', partOfSpeech: 'Adverb' },
    { word: 'quietly', partOfSpeech: 'Adverb' },
    { word: 'and', partOfSpeech: 'Conjunction' },
    { word: 'but', partOfSpeech: 'Conjunction' },
    { word: 'or', partOfSpeech: 'Conjunction' },
    { word: 'for', partOfSpeech: 'Conjunction' },
    { word: 'yet', partOfSpeech: 'Conjunction' },
    { word: 'after', partOfSpeech: 'Preposition' },
    { word: 'before', partOfSpeech: 'Preposition' },
    { word: 'above', partOfSpeech: 'Preposition' },
    { word: 'below', partOfSpeech: 'Preposition' },
    { word: 'beside', partOfSpeech: 'Preposition' },
    { word: 'among', partOfSpeech: 'Preposition' },
    { word: 'through', partOfSpeech: 'Preposition' },
    { word: 'into', partOfSpeech: 'Preposition' },
    { word: 'onto', partOfSpeech: 'Preposition' },
    { word: 'upon', partOfSpeech: 'Preposition' },
    { word: 'with', partOfSpeech: 'Preposition' },
    { word: 'about', partOfSpeech: 'Preposition' },
    { word: 'against', partOfSpeech: 'Preposition' },
    { word: 'between', partOfSpeech: 'Preposition' },
    { word: 'within', partOfSpeech: 'Preposition' },
    { word: 'without', partOfSpeech: 'Preposition' },
    { word: 'oh', partOfSpeech: 'Interjection' },
    { word: 'wow', partOfSpeech: 'Interjection' },
    { word: 'oops', partOfSpeech: 'Interjection' },
    { word: 'ah', partOfSpeech: 'Interjection' },
    { word: 'oh no', partOfSpeech: 'Interjection' },
    { word: 'hey', partOfSpeech: 'Interjection' },
    { word: 'hi', partOfSpeech: 'Interjection' },
    { word: 'hello', partOfSpeech: 'Interjection' },
    { word: 'hurray', partOfSpeech: 'Interjection' }
];

const partsOfSpeechDefinitions = [
    {partOfSpeech: "Noun", definition: "a word used to identify any of a class of people, places, or things"},
    {partOfSpeech: "Verb", definition: "a word usedto describe an action, state, or occurrence"},
    {partOfSpeech: "Adjective", definition: "a word used to describe a noun or pronoun"},
    {partOfSpeech: "Adverb", definition: "a word used to describe or modify a verb, adjective, or other adverb"},
    {partOfSpeech: "Pronoun", definition: "a word used in place of a noun"},
    {partOfSpeech: "Preposition", definition: "a word used to show the relationship between a noun (or pronoun) and other words in a sentence"},
    {partOfSpeech: "Conjunction", definition: "a word used to connect words, phrases, or clauses"},
    {partOfSpeech: "Interjection", definition: "a word or phrase used to express strong emotion or surprise"}
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

let usedWords =[];
let currentWord;
let partsOfSpeech =[];
displayScore(0,rounds,maxRounds);
setWords();



function displayScore(score, round, totalRounds){
    scoreDiv.innerText = "Current Score: " + totalScore;
    roundDiv.innerText = "Round: "+ rounds + "/"+maxRounds;
}

function clickListener(arr) {   
    for (let i=0; i<arr.length; i++){
        arr[i].addEventListener("click", eventListener);
        
    }
}
function removeEventListeners(list) {
    list.forEach(e => {
        e.removeEventListener('click', eventListener);
    });
  }

function eventListener(event) {
    const word = event.target;
    console.log(word.id);
    click(word);
}

function click(word) {
   
    if (word.innerText == usedWords[usedWords.length-1].partOfSpeech) {
        correctClick(word);
    } else {
        incorrectClick(word);
    }
    totalClicks++;
    if (correct >= maxCorrect || incorrect>= maxIncorrect) {
        nextRoundButton();
        removeEventListeners(partsOfSpeech);
    }
}

function correctClick(word) {
    correct++;
    totalScore++;
    word.classList.add("correct");
    word.removeEventListener("click", eventListener);
    displayScore(totalScore, rounds, maxRounds);
    addCorrectFeedback(word);
}

function addCorrectFeedback(word){ 
    let incorrectFb= selectFeedback(correctFeedback);
    let fbDiv = document.createElement("div");
    fbDiv.innerText = incorrectFb+ " +1 pt";
    fbDiv.className= "correct_feedback";
    removeChildren(document.getElementById("feedback"));
    document.getElementById("feedback").appendChild(fbDiv);
}


function incorrectClick(word) {
    incorrect++;
    totalScore -= 0.5;
    word.classList.add("incorrect");
    word.removeEventListener("click", eventListener);
    displayScore(totalScore, rounds, maxRounds);
    addIncorrectFeedback(word);
}

function addIncorrectFeedback(word){ 
    let incorrectFb= selectFeedback(incorrectFeedback);
    let fbDiv = document.createElement("div");
    fbDiv.innerText = incorrectFb+ " -0.5 pts";
    fbDiv.className= "incorrect_feedback";
    removeChildren(document.getElementById("feedback"));
    let def = document.createElement("div");
    def.innerText ="-> "+getDefinition(word.innerText);
    def.className= "choice_word";
    word.parentNode.appendChild(def);
    document.getElementById("feedback").appendChild(fbDiv);
}


function getDefinition(partOfSpeech) {

    for (let i = 0; i < partsOfSpeechDefinitions.length; i++) {
      if (partsOfSpeechDefinitions[i].partOfSpeech === partOfSpeech){
        return partsOfSpeechDefinitions[i].definition;
      }
    }
    return "Definition Not Found";
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
    let nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    document.getElementById('next_step').appendChild(nextButton);
    nextButton.addEventListener('click', () => {
        nextRound();
    });
}

function nextRound() {
    rounds++;
    removeChildren(document.getElementById("s3"));
    partsOfSpeech = [];
    displayScore(totalScore, rounds, maxRounds);
    removeChildren(document.getElementById('s2'));
    removeChildren(document.getElementById('feedback'));
    document.getElementById('s2').innerText="";
    removeChildren(document.getElementById('next_step'));
    correct = 0;
    incorrect = 0;
    if (rounds == maxRounds) {
        gameEnd();
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


       


function setWords() {
    const descriptionDiv = document.getElementById("s1");
    descriptionDiv.innerHTML= "What is the correct part of speech for the following word?";
    const wordObj = selectWord();
    currentWord=wordObj;
    const word = wordObj.word;
    const partOfSpeech = wordObj.partOfSpeech;
    usedWords.push(wordObj);
    const wordDiv = document.getElementById("s2");
    wordDiv.innerHTML= "Word: "+ word;
    setPartsOfSpeech();
    clickListener(partsOfSpeech);
}


function setPartsOfSpeech(){
    partOfSpeechDiv = document.createElement("div");
    partOfSpeechDiv.className= "choice";
    partOfSpeechDiv.innerText = "Please choose one of the following options:";
    document.getElementById("s3").appendChild(partOfSpeechDiv);
    setPartOfSpeech("Noun",1);
    setPartOfSpeech("Pronoun",2);
    setPartOfSpeech("Verb",3);
    setPartOfSpeech("Adjective",4);
    setPartOfSpeech("Adverb",5);
    setPartOfSpeech("Conjunction",6);
    setPartOfSpeech("Preposition",7);
    setPartOfSpeech("Interjection",8);
}

function setPartOfSpeech(partOfSpeech, idNum){
    s = document.createElement("div");
    s.className= "choice";
    s.id= "partOfSpeech"+ idNum;
    s.innerText= idNum+". ";
    partOfSpeechDiv = document.createElement("div");
    partOfSpeechDiv.className= "choice_word";
    partOfSpeechDiv.innerText = partOfSpeech;
    partsOfSpeech.push(partOfSpeechDiv);
    s.appendChild(partOfSpeechDiv);
    document.getElementById("s3").appendChild(s);
    partsOfSpeech.push(partOfSpeechDiv);
}

function selectWord() {
    const randomIndex = Math.floor(Math.random() * unusedWords.length);
    const selectedWord = unusedWords[randomIndex];
    usedWords.push(selectedWord);
    unusedWords.splice(randomIndex, 1);
    return selectedWord;
}



function removeChildren(e){
    let child = e.lastElementChild; 
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}




