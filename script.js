const timerInput = document.querySelector('#time-input');
const button = document.querySelector('#add-timer');
const timersList = document.querySelector('#timers');
const emptyMessage = 'Добавьте первый тамер';

button.addEventListener('click', addNewTimer);

function updateEmptyMessage() {
  if (timersList.children.length === 0) {
    let emptyList = document.createElement('li');
    emptyList.textContent = emptyMessage;
    timersList.appendChild(emptyList);
  } else if (
    timersList.children.length === 1 &&
    timersList.firstElementChild.textContent.trim() === emptyMessage
  ) {
    timersList.innerHTML = '';
  }
}

function addNewTimer() {
  const value = timerInput.value.trim();
  const startTime = Date.now();
  if (!value || isNaN(value) || value <= 0) return;

  if (!value) return;
  let duration = parseInt(value);

  updateEmptyMessage();
  const timer = document.createElement('li');
  const timeContainer = document.createElement('span');
  let elapsedTime = Math.floor((Date.now() - startTime) / 100);
  let remainingTime = duration - elapsedTime;
  let isPaused = false;
  let intervalId;
  timeContainer.textContent = remainingTime;
  timer.appendChild(timeContainer);
  addButtons(timer);
  timersList.appendChild(timer);
  timerInput.value = '';

  function startTimer() {
    intervalId = setInterval(() => {
      if (!isPaused) {
        remainingTime--;
        timeContainer.textContent = remainingTime;
      }
      if (remainingTime < 0) {
        clearInterval(intervalId);
        timer.remove();
        updateEmptyMessage();
      }
    }, 1000);
  }
  startTimer();

  function stopTimer() {
    clearInterval(intervalId);

    timer.remove();
    updateEmptyMessage();
  }

  function addButtons() {
    const toggleButton = createButton('Пауза', () => toggleTimer(toggleButton));
    const stopButton = createButton('Остановить таймер', stopTimer);
    const buttons = document.createElement('div');
    buttons.className = 'buttons';
    timer.appendChild(buttons);
    buttons.appendChild(toggleButton);
    buttons.appendChild(stopButton);
  }

  function toggleTimer(toggleButton) {
    if (!isPaused) {
      clearInterval(intervalId);
      toggleButton.textContent = 'Возобновить';
    } else {
      startTimer();
      toggleButton.textContent = 'Пауза';
    }
    isPaused = !isPaused;
  }
}

function createButton(text, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', onClick);
  return button;
}

updateEmptyMessage();
