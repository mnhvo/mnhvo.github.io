const myVideo = document.querySelector("my-video");
console.log(myVideo);

//m play pause logic, 3 step process
// 1. fetch the right button for play and pause
const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);

const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

// 2. listen to the click event on the button
playPauseButton.addEventListener("click", togglePlay);

// 3. perform
function togglePlay() {
  if (myVideo.paused || myVideo.ended) {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
    myVideo.play();
  } else {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
    myVideo.pause();
  }
}

// 1. fetch the right button for play and pause
const muteUnmuteButton = document.querySelector("#mute-unmute-button");
console.log(muteUnmuteButton);

const muteUnmuteImg = document.querySelector("#mute-unmute-img");
console.log(muteUnmuteImg);

// 2. listen to the click event on the button
muteUnmuteButton.addEventListener("click", togglePlay);

// 3. perform
// assigning a value let b=4 name="rohit" id=1234
// === comparison of calue and type let b=4, if (b===4)true but if (b===6) false
// if (b) => b === true
// if (!b =>) b === false

// 1. fetch the right button for play and pause
const fastForwardButton = document.querySelector("#fast-forward-button");
console.log(fastForwardButton);

// 2. listen to the click event on the button
fastForwardButton.addEventListener("click", fastForward);

// 3. perform
function fastForward() {
  if (myVideo.playbackRate === 1.0) {
    myVideo.playbackRate = 2.0;
  } else {
    myVideo.playbackRate = 1.0;
  }
}

// 1. fetch the right button for play and pause
const fullscreenButton = document.querySelector("#fullscreen-button");
console.log(fullscreenButton);

myVideo.addEventListener("dblclick", goFullscreen);

// 2. listen to the click event on the button
fullscreenButton.addEventListener("click", goFullscreen);

// 3. perform
function goFullscreen() {
  if (!document.fullscreenElement) {
    myVideo.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// 1. fetch the right button for play and pause
const heartButton = document.querySelector("#heart-button");
console.log(heartButton);

const likesContainer = document.querySelector("#likes");
console.log(likesContainer);

let likes = 0;

// 2. listen to the click event on the button
heartButton.addEventListener("click", updateLikes);

// 3. perform

function updateLikes() {}

// progress bar logic
const progressBar = document.querySelector("#progress-bar");
console.log(progressBar);

myVideo.addEventListener;
