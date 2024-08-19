let timer;
let isRunning = false;
let milliseconds = 0;
let lapCounter = 0;

const display = document.getElementById("display");
const lapsList = document.getElementById("laps");
const startStopButton = document.getElementById("startStop");
const lapButton = document.getElementById("lap");
const resetButton = document.getElementById("reset");
const clearLapsButton = document.getElementById("clearLaps");

function updateDisplay() {
  const hrs = Math.floor(milliseconds / 3600000);
  const mins = Math.floor((milliseconds % 3600000) / 60000);
  const secs = Math.floor((milliseconds % 60000) / 1000);
  const ms = milliseconds % 1000;

  // Convert milliseconds to a format with three digits
  display.textContent = `${String(hrs).padStart(2, "0")}:${String(
    mins
  ).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(ms).padStart(
    3,
    "0"
  )}`;
  display.classList.add("animate");
  setTimeout(() => display.classList.remove("animate"), 500);
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;
  timer = setInterval(() => {
    milliseconds++;
    updateDisplay();
  }, 1); // Update every millisecond
}

function stopTimer() {
  if (!isRunning) return;

  isRunning = false;
  clearInterval(timer);
}

startStopButton.addEventListener("click", () => {
  if (isRunning) {
    stopTimer();
    startStopButton.textContent = "Start";
  } else {
    startTimer();
    startStopButton.textContent = "Pause";
  }
});

lapButton.addEventListener("click", () => {
  if (isRunning) {
    lapCounter++;
    const lapTime = display.textContent;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapsList.appendChild(lapItem);
  }
});

resetButton.addEventListener("click", () => {
  stopTimer();
  milliseconds = 0;
  updateDisplay();
  startStopButton.textContent = "Start";
});

clearLapsButton.addEventListener("click", () => {
  lapsList.innerHTML = "";
  lapCounter = 0;
});
