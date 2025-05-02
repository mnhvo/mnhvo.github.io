const video = document.querySelector("#custom-video-player");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
video.removeAttribute("controls");
video.addEventListener("timeupdate", updateProgressBar);
function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}
function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;
  progressBar.style.width = value + "%";
}

const startPauseBtn = document.getElementById("start-pause-timer");
const progressFill = document.getElementById("pomodoro-progress-fill");
const music = document.getElementById("background-music");

let isRunning = false;
let isBreak = false;
let timer = null;
let startTime = null;
let duration = 25 * 60 * 1000; // 25 minutes
let elapsed = 0;

startPauseBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTimer();
    music.play();
    backgroundVideo.play();
    startPauseBtn.textContent = "Pause";
  } else {
    pauseTimer();
    music.pause();
    backgroundVideo.pause();
    startPauseBtn.textContent = "Start";
  }
});

function startTimer() {
  isRunning = true;
  startTime = Date.now() - elapsed;

  timer = setInterval(() => {
    elapsed = Date.now() - startTime;
    const percent = (elapsed / duration) * 100;
    progressFill.style.width = Math.min(percent, 100) + "%";

    if (elapsed >= duration) {
      clearInterval(timer);
      isRunning = false;
      isBreak = !isBreak;
      duration = isBreak ? 5 * 60 * 1000 : 25 * 60 * 1000;
      elapsed = 0;
      startPauseBtn.textContent = "Start";
      startTimer(); // auto-start next session
    }
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timer);
}

const backgroundVideo = document.getElementById("background-video");
