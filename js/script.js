
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
const guessedLeftSpan = document.querySelector(".remaining span");
//The empty paragraph where messages will appear when the player guesses a letter.
const guessMessage = document.querySelector(".message");
//The hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");
//Start word before APR
const word = "magnolia";
//Empty array for all guessed letters
const guessedLetters = [];

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
    }
};