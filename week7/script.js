const topHeading = document.querySelector("#top-heading");
console.log(topHeading);

const airportAudio = document.querySelector("#airport-audio");
console.log(airportAudio);

// logic for pausing sound
const playButton = document.querySelector("#play-button");
console.log(playButton);

playButton.addEventListener("click", playAudio);

function playAudio() {
  myNewHeading = "Audio is currently playing";
  airportAudio.play();
  topHeading.textContent = myNewHeading;
}
//----------------------
// const vs let, use const when you are fetching something from html

const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

pauseButton.addEventListener("click", pauseAudio);

function pauseAudio() {
  myNewHeading = "Audio is currently paused";
  airportAudio.pause();
  topHeading.textContent = myNewHeading;
}
//----------------------
const popSound = document.querySelector("#pop-audio");
console.log(popAudio);

const popButton = document.querySelector("#pop-button");
console.log(popButton);

popButton.addEventListener("click", popAudio);

function popAudio() {
  myNewHeading = "Popping Sound";
  // airportAudio.pause();
  popSound.play();
  topHeading.textContent = myNewHeading;
}
