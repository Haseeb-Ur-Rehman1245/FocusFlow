
let focusTime = 1500;
let breakTime = 300;

let time = focusTime;
let isBreak = false;

let timer = null;
let isRunning = false;
let sessions = 0;

const timeDisplay = document.getElementById("time");
const progressCircle = document.querySelector(".progress");
const modeText = document.getElementById("mode");

const circumference = 2 * Math.PI * 100;
progressCircle.style.strokeDasharray = circumference;

function updateDisplay() {
  let min = Math.floor(time / 60);
  let sec = time % 60;

  timeDisplay.innerText = `${min}:${sec < 10 ? "0" : ""}${sec}`;

  let total = isBreak ? breakTime : focusTime;
  let progress = time / total;

  progressCircle.style.strokeDashoffset = circumference * (1 - progress);
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;

  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(timer);

      if (!isBreak) {
        sessions++;
        document.getElementById("sessions").innerText = sessions;
        showMessage("Break time ☕");
        time = breakTime;
        isBreak = true;
        modeText.innerText = "Break Mode";
      } else {
        showMessage("Back to focus 🚀");
        time = focusTime;
        isBreak = false;
        modeText.innerText = "Focus Mode";
      }

      isRunning = false;
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  time = focusTime;
  isBreak = false;
  modeText.innerText = "Focus Mode";
  isRunning = false;
  updateDisplay();
}

function addTask() {
  const input = document.getElementById("taskInput");

  if (!input.value.trim()) return;

  const li = document.createElement("li");
  li.innerText = input.value;

  li.onclick = () => li.classList.toggle("completed");

  document.getElementById("taskList").appendChild(li);

  input.value = "";
}


function showMessage(msg) {
  document.getElementById("message").innerText = msg;
}


document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("light");
};

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speed: Math.random() * 0.5
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.y += star.speed;

    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }

    ctx.fillStyle = "white";
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });

  requestAnimationFrame(animateStars);
}

animateStars();

updateDisplay();