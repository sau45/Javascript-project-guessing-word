const inputs = document.querySelector('.inputs')

const resetBtn = document.querySelector('.reset-btn')

const hing = document.querySelector('.hing span')

const wrongletter = document.querySelector('.wrong-letter span')

const typingInput = document.querySelector('.typing-input')

const guessLeft = document.querySelector('.guess-left span')

let word,maxGuesses,
  correct = [],
  incorrect = [];

function randomWord() {
  //getting random object from wordList
  let ranObj = wordList[Math.floor(Math.random() * wordList.length)]

  // console.log(ranObj);
  word = ranObj.word //getting word of random object
  incorrect = [],correct = [];
  maxGuesses=8;
  console.log(word)

//it will show the total attempt to type letter to predict the word
  guessLeft.innerText = maxGuesses;


  // it will add dynamically the input button text for word
  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`
  }

  //innerHTML will add the element to the html document
  inputs.innerHTML = html
  
  // it is for to show the hint in the Hint:
  let hint = ranObj.hint
  hing.textContent = `  ${hint}`;
  wrongletter.textContent ="";

}

randomWord()

function initGame(e) {
  let key = e.target.value
  console.log(key);
  // Now, user can't enter with same wrong letter twice
  if (
    (key.match(/^[A-Za-z]+$/))&&
   (!incorrect.includes(`${key}`)) && (!correct.includes(`${key}`)))
  {
    if (word.includes(key)) {
      //if user letter found in the word
      // console.log('letter found');

      correct.push(key)
      for (let i = 0; i < word.length; i++) {
        //showing matched letter in the input
        if (word[i] === key) {
          inputs.querySelectorAll('input')[i].value = key
        }
      }
    } else {
        maxGuesses--;

        //it will push wrong letter in the incorrect array
      incorrect.push(key);
    }

    // it is for the attempt for user after typing of wrong letter
    guessLeft.innerText = maxGuesses;
   
  }

  //it will show the wrong letter typed
  wrongletter.textContent = incorrect

  // this is hide input button which takes by user which will clear the input taken
  typingInput.value = '';


setTimeout(() => {
    if(correct.length===word.length){
        alert(`Congrats! You found the word ${word.toUpperCase()}`)
      }
    
      else if(maxGuesses<1){// if user couldn't found all letters
        alert("Game over! You don't have remaining guesses");
        for(let i=0;i<word.length;i++){
            //show all letters in the input
            inputs.querySelectorAll("input")[i].value=word[i];
        }
    
      }
});
}

resetBtn.addEventListener('click', randomWord)
typingInput.addEventListener('input', initGame)
document.addEventListener('keydown', () => typingInput.focus())
inputs.addEventListener('keydown', () => typingInput.focus())
