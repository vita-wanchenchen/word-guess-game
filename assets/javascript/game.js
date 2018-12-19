// GLOBAL VARIABLES

// Array of Word Options
var wordsList = ["frozen", "moana", "brave", "tangled", "mulan", "pocahontas", 
"aladdin", "cinderella", "sleeping beauty", "the little mermaid"];
// Solution will be held here.
var wordToGuess = "";
// This will break the solution into individual letters to be stored in array.
var lettersInWordToGuess = [];
// This will be the number of blanks we show based on the solution
var numBlanks = 0;
// Holds a mix of blank and solved letters (ex: 'n, _ _, n, _').
var blanksAndSuccesses = [];
// Holds all of the wrong guesses
var wrongGuesses = [];

// Game counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 12;


// startGame() -- start and restart the game
function startGame() {
    // Reset the guesses back to 0.
    numGuesses = 12;

    // Word is chosen randomly from wordList
    wordToGuess = wordsList[Math.floor(Math.random() * wordsList.length)];

    // The word is broken into individual letters.
    lettersInWordToGuess = wordToGuess.split("");

    // We count the number of letters in the word.
    numBlanks = lettersInWordToGuess.length;

    // We print the solution in console (for testing).
    console.log(wordToGuess);

    // Reset the guess and success array at each round
    blanksAndSuccesses = [];

    // Reset the wrong guesses from the previous round
    wrongGuesses = [];

    // Fill up the blanksAndSuccesses list with appropriate number of blanks.
    /*for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
      }*/
    for (var i =0; i < lettersInWordToGuess.length; i++) {
      if (lettersInWordToGuess[i] === " ") {
        blanksAndSuccesses.push("&nbsp");
      } else {
        blanksAndSuccesses.push("_");
      }
    }
    // Print the initial blanks in console.
    console.log("array", blanksAndSuccesses);

    // Reprints the guessesLeft to 12
    document.getElementById("guesses-left").innerHTML = numGuesses;

    // Prints the blanks at the beginning of each round in the HTML
    document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

    // Clears the wrong guesses from the previous round
    document.getElementById("guessed-letters").innerHTML = wrongGuesses.join(" ");

};

// checkLetters() function comparisons for matches
function checkLetters(letter) {
    
    if (letter.search(/^[a-zA-Z]+$/) === -1) {
      document.getElementById("message").textContent = "Only characters";  
      //alert("Only characters");
        return;
      }
      if (wrongGuesses.indexOf(letter) > -1 || blanksAndSuccesses.indexOf(letter) > -1) {
        document.getElementById("message").textContent = "You already guess that letter!"; 
        //alert("You already guess that letter!");
        return;
      }

    // This boolean will be toggled based on whether or not a user letter is found anywhere in the word.
    var lettersInWordToGuess = false;

     // Check if a letter exists inside the array at all.
    for (var i = 0; i < numBlanks; i++) {
    if (wordToGuess[i] === letter) {
      // If the letter exists then toggle this boolean to true. This will be used in the next step.
      lettersInWordToGuess = true;
      blanksAndSuccesses[i] = letter;
    }
  }

  // If the letter exists somewhere in the word, then figure out exactly where (which indices).
  if (!lettersInWordToGuess) {

    // Loop through the word.
    /*for (var j = 0; j < numBlanks; j++) {

      // Populate the blanksAndSuccesses with every instance of the letter.
      if (wordToGuess[j] === letter) {
        // Here we set the specific space in blanks and letter equal to the letter when there is a match.
        blanksAndSuccesses[j] = letter;
      }
    }
    // Logging for testing.
    console.log(blanksAndSuccesses);
  }
  // If the letter doesn't exist at all...
  else {*/
    // ..then we add the letter to the list of wrong letters, and we subtract one of the guesses.
    wrongGuesses.push(letter);
    numGuesses--;
  }
}

// roundComplete() function run after each guess is made
function roundComplete() {

    // First, log an initial status update in the console telling us how many wins, losses, and guesses are left.
    console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);
  
    // Update the HTML to reflect the new number of guesses. Also update the correct guesses.
    document.getElementById("guesses-left").innerHTML = numGuesses;
    // This will print the array of guesses and blanks onto the page.
    document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
    // This will print the wrong guesses onto the page.
    document.getElementById("guessed-letters").innerHTML = wrongGuesses.join(" ");
  
    // If we have gotten all the letters to match the solution...
    //if (lettersInWordToGuess.toString() === blanksAndSuccesses.toString()) {
    if (blanksAndSuccesses.indexOf("_") === -1) {
      // ..add to the win counter & give the user an alert.
      winCounter++;
      document.getElementById("message").textContent = "You win!";
      //alert("You win!");
  
      // Update the win counter in the HTML & restart the game.
      document.getElementById("win-counter").innerHTML = winCounter;
      startGame();
    }
  
    // If we've run out of guesses..
    else if (numGuesses === 0) {
      // Add to the loss counter.
      lossCounter++;
      // Give the user an alert.
      document.getElementById("message").textContent = "You lose";
      //alert("You lose");
  
      // Update the loss counter in the HTML.
      document.getElementById("loss-counter").innerHTML = lossCounter;
      // Restart the game.
      startGame();
    }
  
  }
  
  // MAIN PROCESS (THIS IS THE CODE THAT CONTROLS WHAT IS ACTUALLY RUN)
  // ==================================================================================================
  
  // Starts the Game by running the startGame() function
  startGame();
  
  // Then initiate the function for capturing key clicks.
  document.onkeyup = function(event) {
    document.getElementById("message").textContent = " ";
    // Converts all key clicks to lowercase letters.
    var letterGuessed = String.fromCharCode(event.which).toLowerCase();
    // Runs the code to check for correctness.
    checkLetters(letterGuessed);
    // Runs the code after each round is done.
    roundComplete();
  };