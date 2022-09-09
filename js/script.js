
//The unordered list where the player’s guessed letters will appear.
const guessedLettersElement = document.querySelector(".guessed-letters");
//The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
//The text input where the player will guess a letter.
const letterInput = document.querySelector(".letter");
//The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
//The paragraph where the remaining guesses will display.
const guessesLeftParagraph = document.querySelector(".remaining");
//The span inside the paragraph where the remaining guesses will display.
const guessesLeftSpan = document.querySelector(".remaining span");
//The empty paragraph where messages will appear when the player guesses a letter.
const guessMessage = document.querySelector(".message");
//The hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");
//Start word before APR
let word = "magnolia";
//Empty array for all guessed letters
const guessedLetters = [];
//Remaining wrong guesses left
let remainingGuesses = 8;

//Async for word txt
const getWord = async function () {
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await request.text();
    //console.log(words);
    //Grab a random word from the array
        //Split words into an array with split()
        //Use line breaks to seperate them with a delimiter n
    const wordArray = words.split("/n");
    console.log(wordArray);
        //Pull random word by produce a random number and multiply by how many items in array
        //Round the number down 0-99 like array index
    const randomIndex = Math.floor(Math.random() * wordArray.length);
        //Trim() white space in text file
        word = wordArray[randomIndex].trim();
        hiddenLetters(word);
};

//Call Async function
getWord();

//Hide the start word with circles
const hiddenLetters = function (word) {
    //use an array
    const lettersArray = [];
    for (const letter of word) {
        //Within the loop this consoles out each letter individually
        console.log(letter);
        //For each item in array add circle to hide the letter
        lettersArray.push("●");
    }
    //Join all the array elements into a string
    wordInProgress.innerText = lettersArray.join("");
};

hiddenLetters(word);

//When player clicks Guess button
guessButton.addEventListener("click", function (e) {
    //Prevent click sub and page reload
    e.preventDefault();
    //Empty message paragraph
    guessMessage.innertext = "";
    //Capture letter input
    const guess = letterInput.value;
    //Make sure guess is a single letter
    const goodGuess = validateInput(guess);
    
    if (goodGuess) {
        makeGuess(guess);
    }
    //Empty input box
    letterInput.value = "";
});

const validateInput = function (input) {
     //Use a regular exzpression to ensure a letter is input
     const acceptedLetter = /[a-zA-Z]/;
     if (input.length === 0) {
        guessMessage.innerText = "You didn't input anything!";
     } else if (input.length > 1) {
        guessMessage.innerText = "Only one letter at a time please!";
     } else if (!input.match(acceptedLetter)) {
        guessMessage.innerText = "Only one letter, no symbols or numbers please!";
    } else {
     return input;
``  }
};

const makeGuess = function (guess) {
    //Convert all guesses to uppercase so all casing is uniform
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        guessMessage.innerText = "You already guess that letter silly! Try again.";
    }
    else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        countGuesses(guess);
        displayGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const displayGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const newLetter of guessedLetters) {
        const li = document.createElement("li");
        li.innerHTML = newLetter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    //To split the word into an array
    const wordArray = wordUpper.split("");
    //Array of all letters guessed by user
    const updatedLetters = [];
    for (const newLetter of wordArray) {   
        //Checks if letter that went thru guessedLetters is in array of the word, if yes then push letter to the new array
        if (guessedLetters.includes(newLetter)) {
        updatedLetters.push(newLetter.toUpperCase());
        //Else push a ● to the new array
        } else {
            updatedLetters.push("●")
        }
    };
    //console.log(updatedLetters);
    //Update the empty paragraph where the word in progress appears
    wordInProgress.innerText = updatedLetters.join("");
    didYouWin();
};

//Count players guesses
const countGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        guessMessage.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        guessMessage.innerText = `Yes! The word does have the letter ${guess}!`;
    }
//Display how many guesses left
    //If no more guesses, display message
    if (remainingGuesses === 0) {
        guessMessage.innerText = `You ran out of guesses! The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        guessesLeftSpan.innerText = `You only have one more guess remaining!`;
    } else {
        guessesLeftSpan.innerText = `You have ${remainingGuesses} remaining!`
    }
};

//Check if player wins
const didYouWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        guessMessage.classList.add("win");
        guessMessage.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};