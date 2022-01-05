const msgEl = document.getElementById("msg");

// Function to generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const randomNum = getRandomNumber();
console.log(randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// function to display speech
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said:</div>
    <span class="box">${msg}</span>
  `;
}

// Check msg against number
function checkNumber(msg) {
  const num = +msg; // converts strings to a number

  // checks if its a valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>That is not a valid Number</div>`;
    return;
  }

  // Check in range
  if (num < 1 || num > 100) {
    msgEl.innerHTML += `<div>Number should be between 1 and 100</div>`;
  }

  // Check number
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congratulations!🎉🎆 You Win! <br><br>
      Number was ${num}.<br>
      <button class="play-again" id="play-again">Play Again</button>
      </h2>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div>GO LOWER</div>`;
  } else {
    msgEl.innerHTML += `<div>GO HIGHER</div>`;
  }
}

// function to handle speech event
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
}

// Start speech recognition and game
recognition.start();

// Speak result
recognition.addEventListener("result", onSpeak);

// End speech recognition and game
recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
