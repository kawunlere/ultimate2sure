/* ============================================
   ULTIMATE2SURE - TASK LOCKER CORE
============================================ */

/* CONFIG */
const TASK_TIME = 15; // 15 seconds per task

let tasks = [
  { id: 1, name: "Subscribe to YouTube", icon: "📺", link: "#" },
  { id: 2, name: "Like the Video", icon: "👍", link: "#" },
  { id: 3, name: "Comment on Video", icon: "💬", link: "#" },
  { id: 4, name: "Join WhatsApp", icon: "🟢", link: "#" },
  { id: 5, name: "Join Telegram", icon: "✈️", link: "#" }
];

let currentTask = 0;
let completedTasks = 0;

/* LOAD TASKS */
function renderTaskList() {
  const list = document.querySelector(".task-list-sidebar");
  if (!list) return;

  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const item = document.createElement("div");
    item.classList.add("task-list-item");

    if (index < currentTask) item.classList.add("completed");
    if (index === currentTask) item.classList.add("active");
    if (index > currentTask) item.classList.add("locked");

    item.innerHTML = `
      <div class="task-status-icon">
        ${index < currentTask ? "✅" : task.id}
      </div>
      <div class="task-list-info">
        <h4>${task.name}</h4>
        <p>Complete this task to continue</p>
      </div>
    `;

    list.appendChild(item);
  });
}

renderTaskList();

/* START TASK */
function startTask() {
  if (currentTask >= tasks.length) return;

  const task = tasks[currentTask];
  window.open(task.link, "_blank");

  startTimer();
}

/* TIMER */
function startTimer() {
  const timerDisplay = document.querySelector(".timer-circle");
  let timeLeft = TASK_TIME;

  if (!timerDisplay) return;

  timerDisplay.textContent = timeLeft;
  timerDisplay.classList.remove("done");

  const interval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(interval);
      completeTask();
    }
  }, 1000);
}

/* COMPLETE TASK */
function completeTask() {
  currentTask++;
  completedTasks++;

  updateDots(currentTask, tasks.length);
  setProgress((completedTasks / tasks.length) * 100);

  renderTaskList();

  if (currentTask >= tasks.length) {
    unlockFinal();
  }
}

/* UNLOCK FINAL PAGE */
function unlockFinal() {
  const finalBtn = document.querySelector(".final-btn");
  if (finalBtn) {
    finalBtn.style.display = "inline-flex";
  }

  localStorage.setItem("allTasksDone", "true");
}

/* PREVENT SKIP */
window.addEventListener("beforeunload", function (e) {
  if (currentTask < tasks.length) {
    e.preventDefault();
    e.returnValue = "";
  }
});

/* CHECK ACCESS TO COMPLETE PAGE */
if (window.location.pathname.includes("complete.html")) {
  if (!localStorage.getItem("allTasksDone")) {
    window.location.href = "/";
  }
}

/* BUTTON EVENT */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".start-task-btn");
  if (btn) btn.addEventListener("click", startTask);
});
