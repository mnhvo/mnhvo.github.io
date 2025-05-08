const siteSubtitle = document.getElementById("site-subtitle");
const workBtn = document.getElementById("work-btn");
const breakBtn = document.getElementById("break-btn");
const customBtn = document.getElementById("custom-btn");
const resetBtn = document.getElementById("reset-btn");
const customMinutesInput = document.getElementById("custom-minutes-input");
const customMinutesLabel = document.querySelector("#custom-timer-group label");
const volumeSlider = document.getElementById("volume-slider");
const timerDisplay = document.getElementById("timer-display");
const backgroundMusic = document.getElementById("background-music");
const bellSound = document.getElementById("bell-sound");
const workProgressBar = document.getElementById("work-progress-bar");
const breakProgressBar = document.getElementById("break-progress-bar");
const allSessionButtons = document.getElementById("session-buttons");
const customTimerGroup = document.getElementById("custom-timer-group");
const volumeControlGroup = document.getElementById("volume-control");

let timerInterval = null;
let totalDurationSeconds = 25 * 60;
let remainingSeconds = totalDurationSeconds;
let isTimerRunning = false;
let currentSessionType = "work";
const DEFAULT_WORK_MINS = 25;
const DEFAULT_BREAK_MINS = 5;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(remainingSeconds);
}

function updateProgressBar() {
  if (totalDurationSeconds === 0) {
    if (currentSessionType === "work" || currentSessionType === "custom") {
      workProgressBar.style.width = "0%";
    } else if (currentSessionType === "break") {
      breakProgressBar.style.width = "0%";
    }
    return;
  }
  const percentageElapsed =
    ((totalDurationSeconds - remainingSeconds) / totalDurationSeconds) * 100;

  if (currentSessionType === "work" || currentSessionType === "custom") {
    workProgressBar.style.width = `${percentageElapsed}%`;
    breakProgressBar.style.width = "0%";
  } else if (currentSessionType === "break") {
    breakProgressBar.style.width = `${percentageElapsed}%`;
    workProgressBar.style.width = "0%";
  }
}

function updateControlsVisibility() {
  siteSubtitle.classList.remove("hidden");
  workBtn.textContent = "Start Work";
  workBtn.classList.remove("active-session");
  breakBtn.textContent = "Start Break";
  breakBtn.classList.remove("active-session");
  customBtn.textContent = "Start Custom";
  customBtn.classList.remove("active-session");

  allSessionButtons.classList.remove("hidden");
  customTimerGroup.classList.remove("hidden");
  workBtn.classList.remove("hidden");
  breakBtn.classList.remove("hidden");
  customBtn.classList.remove("hidden");
  customMinutesInput.classList.remove("hidden");
  customMinutesLabel.classList.remove("hidden");
  resetBtn.classList.remove("hidden");
  volumeControlGroup.classList.remove("hidden");

  if (isTimerRunning) {
    siteSubtitle.classList.add("hidden");
    resetBtn.classList.add("hidden");
    volumeControlGroup.classList.add("hidden");
    customMinutesInput.classList.add("hidden");
    customMinutesLabel.classList.add("hidden");

    workBtn.classList.add("hidden");
    breakBtn.classList.add("hidden");
    customBtn.classList.add("hidden");

    allSessionButtons.classList.add("hidden");
    customTimerGroup.classList.add("hidden");

    if (currentSessionType === "work") {
      workBtn.textContent = "Pause Work";
      workBtn.classList.add("active-session");
      workBtn.classList.remove("hidden");
      allSessionButtons.classList.remove("hidden");
    } else if (currentSessionType === "break") {
      breakBtn.textContent = "Pause Break";
      breakBtn.classList.add("active-session");
      breakBtn.classList.remove("hidden");
      allSessionButtons.classList.remove("hidden");
    } else if (currentSessionType === "custom") {
      customBtn.textContent = "Pause Custom";
      customBtn.classList.add("active-session");
      customBtn.classList.remove("hidden");
      customTimerGroup.classList.remove("hidden");
    }
  } else if (remainingSeconds > 0 && remainingSeconds < totalDurationSeconds) {
    if (currentSessionType === "work") {
      workBtn.textContent = "Resume Work";
      workBtn.classList.add("active-session");
    } else if (currentSessionType === "break") {
      breakBtn.textContent = "Resume Break";
      breakBtn.classList.add("active-session");
    } else if (currentSessionType === "custom") {
      customBtn.textContent = "Resume Custom";
      customBtn.classList.add("active-session");
    }
  }
}

function startCountdown() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  isTimerRunning = true;
  setTimeout(() => {
    backgroundMusic
      .play()
      .catch((error) => console.error("Error playing music:", error));
  }, 100);
  timerInterval = setInterval(() => {
    remainingSeconds--;
    updateTimerDisplay();
    updateProgressBar();
    if (remainingSeconds < 0) {
      clearInterval(timerInterval);
      isTimerRunning = false;
      bellSound.play();
      backgroundMusic.pause();
      remainingSeconds = totalDurationSeconds;
      updateTimerDisplay();
      updateControlsVisibility();
      const completedSessionType = currentSessionType;
      setTimeout(() => {
        if (
          completedSessionType === "work" ||
          completedSessionType === "custom"
        ) {
          if (currentSessionType === completedSessionType || !isTimerRunning) {
            workProgressBar.style.width = "0%";
          }
        } else if (completedSessionType === "break") {
          if (currentSessionType === completedSessionType || !isTimerRunning) {
            breakProgressBar.style.width = "0%";
          }
        }
      }, 1000);
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  backgroundMusic.pause();
  updateControlsVisibility();
}

function resetCurrentSession() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
  let resetMinutes;
  if (currentSessionType === "work") {
    resetMinutes = DEFAULT_WORK_MINS;
  } else if (currentSessionType === "break") {
    resetMinutes = DEFAULT_BREAK_MINS;
  } else if (currentSessionType === "custom") {
    resetMinutes = parseInt(customMinutesInput.value);
    if (isNaN(resetMinutes) || resetMinutes <= 0) {
      resetMinutes = DEFAULT_WORK_MINS;
      customMinutesInput.value = resetMinutes;
    }
  } else {
    currentSessionType = "work";
    resetMinutes = DEFAULT_WORK_MINS;
  }
  totalDurationSeconds = resetMinutes * 60;
  remainingSeconds = totalDurationSeconds;
  updateTimerDisplay();
  updateProgressBar();
  updateControlsVisibility();
}

workBtn.addEventListener("click", () => {
  if (isTimerRunning && currentSessionType === "work") {
    pauseTimer();
  } else {
    if (
      currentSessionType !== "work" ||
      remainingSeconds <= 0 ||
      remainingSeconds === DEFAULT_WORK_MINS * 60
    ) {
      currentSessionType = "work";
      totalDurationSeconds = DEFAULT_WORK_MINS * 60;
      remainingSeconds = totalDurationSeconds;
      updateProgressBar();
    }
    startCountdown();
    updateControlsVisibility();
  }
});

breakBtn.addEventListener("click", () => {
  if (isTimerRunning && currentSessionType === "break") {
    pauseTimer();
  } else {
    if (
      currentSessionType !== "break" ||
      remainingSeconds <= 0 ||
      remainingSeconds === DEFAULT_BREAK_MINS * 60
    ) {
      currentSessionType = "break";
      totalDurationSeconds = DEFAULT_BREAK_MINS * 60;
      remainingSeconds = totalDurationSeconds;
      updateProgressBar();
    }
    startCountdown();
    updateControlsVisibility();
  }
});

customBtn.addEventListener("click", () => {
  if (isTimerRunning && currentSessionType === "custom") {
    pauseTimer();
  } else {
    const customMins = parseInt(customMinutesInput.value);
    if (
      currentSessionType !== "custom" ||
      remainingSeconds <= 0 ||
      (customMins > 0 && remainingSeconds === customMins * 60)
    ) {
      if (customMins > 0) {
        currentSessionType = "custom";
        totalDurationSeconds = customMins * 60;
        remainingSeconds = totalDurationSeconds;
        updateProgressBar();
      } else {
        alert("Please enter a valid number of minutes for the custom timer.");
        return;
      }
    } else if (currentSessionType === "custom" && customMins <= 0) {
      alert(
        "Custom minutes value is invalid. Please set a valid duration to resume or reset."
      );
      return;
    }
    startCountdown();
    updateControlsVisibility();
  }
});

resetBtn.addEventListener("click", resetCurrentSession);

volumeSlider.addEventListener("input", (event) => {
  backgroundMusic.volume = event.target.value;
});

currentSessionType = "work";
remainingSeconds = DEFAULT_WORK_MINS * 60;
totalDurationSeconds = remainingSeconds;
updateTimerDisplay();
updateProgressBar();
updateControlsVisibility();
backgroundMusic.volume = volumeSlider.value;
