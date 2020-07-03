/* 
  GAME FUNCTION:
    - Player must guess a number between a min and max
    - Player gets a certain amount of guesses
    - Notify player of guessses remaining
    - Notify the player of the corret answer if loose
    - Let player choose to play again
*/


// GAME VALUES
let min = 1, 
    max = 10,
    winneringNum = getRandomNum(min, max), 
    guessesLeft = 3;

//  UI ELEMENTS
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// ASSIGN UI MIN AND MAX
minNum.textContent = min;
maxNum.textContent = max;


// Play again eventlistener
game.addEventListener('mousedown', e =>{
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
})


// LISTEN FOR GUESS
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  // Validate
  if( isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
  } 

   
  // Check if won
  if(guess === winneringNum){
    // Game over - won //
    gameOver(true, `${winneringNum} is correct, YOU WIN!`);

  
  } else {
    // Wrong Number
    guessesLeft -= 1;

    if(guessesLeft === 0){
      // Game over - lost
      gameOver(false, `Game Over, you lost. The correct number was ${winneringNum}`);

    } else {
      // Game Continues - answer wrong //
      
      // Change border color
      guessInput.style.borderColor = 'red';

      // Clear input
      guessInput.value = '';

      // Tell user it's the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guess left`, 'red');
    }
  }



})


// Game over function
function gameOver(won, msg){
  let color;
  won === true? color = 'green': color = 'red';


  // DISABLE INPUT
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set Message
  setMessage(msg, color);

  // PLay Again 
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';


}


// Get Winning Number
function getRandomNum(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
} 

// SET MESSAGE 
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}