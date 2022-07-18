import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { toggleButtonEnabledState, setButtonEnabledState } from './common';

const elStartButton = document.querySelector('[data-start]');
let timer = null;
let timerHTML = null;
let selectedTime = 0;

class Timer {
  #deltaTime;
  #endTime;
  #isActive;
  #deltaTimeInDDHHMMSS;
  #timerID;
  #onTick;
  #onStop;

  constructor(onTick = () => {}, onStop = () => {}) {
    this.#onTick = onTick;
    this.#onStop = onStop;
    this.#deltaTime = 0;
    this.#endTime = -1;
    this.#isActive = false;
    this.#deltaTimeInDDHHMMSS = {};
  }

  #parseDeltaTime() {
    const ms = this.#deltaTime;
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    this.#deltaTimeInDDHHMMSS.days = Math.floor(ms / day);
    // Remaining hours
    this.#deltaTimeInDDHHMMSS.hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    this.#deltaTimeInDDHHMMSS.minutes = Math.floor(
      ((ms % day) % hour) / minute
    );
    // Remaining seconds
    this.#deltaTimeInDDHHMMSS.seconds = Math.floor(
      (((ms % day) % hour) % minute) / second
    );
  }

  #tick() {
    let { deltaTime, endTime } = this;
    this.#deltaTime = this.#endTime - Date.now();
    if (!(this.#deltaTime > 0)) {
      this.#deltaTime = 0;
      this.stop();
    }
    this.#parseDeltaTime();
    this.#onTick(this.#deltaTimeInDDHHMMSS);
  }

  isStarted() {
    return this.#isActive;
  }

  setTime(time) {
    this.#endTime = time;
  }

  start() {
    if (this.#isActive || this.#endTime < 0) {
      console.log('Timer start dropped');
      return;
    }

    this.#timerID = setInterval(this.#tick.bind(this), 1000);
    this.#isActive = true;
  }

  stop() {
    this.#deltaTime = 0;
    this.#endTime = -1;
    this.#isActive = false;
    clearInterval(this.#timerID);
    this.#onStop();
  }
}

class TimerHTMLInterface {
  #elements = {};

  constructor({ daysEl, hoursEl, minutesEl, secondsEl }) {
    this.#elements.days = daysEl;
    this.#elements.hours = hoursEl;
    this.#elements.minutes = minutesEl;
    this.#elements.seconds = secondsEl;
  }

  #addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }

  update({ days, hours, minutes, seconds }) {
    this.#elements.days.textContent = days;
    this.#elements.hours.textContent = this.#addLeadingZero(hours);
    this.#elements.minutes.textContent = this.#addLeadingZero(minutes);
    this.#elements.seconds.textContent = this.#addLeadingZero(seconds);
  }
}

(() => {
  flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: onDataSelected,
    minDate: Date.now(),
  });
  timer = new Timer(onTimerTick, onTimerStop);
  timerHTML = new TimerHTMLInterface({
    daysEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minutesEl: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]'),
  });
  elStartButton.addEventListener('click', onStartClick);
  toggleButtonEnabledState(elStartButton);
})();

function onDataSelected(selectedDates) {
  selectedTime = selectedDates[0];

  if (isTimeInFuture(selectedTime.getTime())) {
    setButtonEnabledState(elStartButton, true);
  } else {
    setButtonEnabledState(elStartButton, false);
    alert('Please choose a date in the future');
  }

  if (timer.isStarted()) {
    timer.stop();
    updateStartButtonText();
  }
}

function onStartClick() {
  if (!isTimeInFuture(selectedTime.getTime())) {
    toggleButtonEnabledState(elStartButton);
    alert('Please choose a date in the future');
    return;
  }
  timer.setTime(selectedTime);
  toggleTimerActiveState();
  updateStartButtonText();
}

function onTimerTick({ days, hours, minutes, seconds }) {
  timerHTML.update({ days, hours, minutes, seconds });
}

function onTimerStop() {
  updateStartButtonText();
}

function isTimeInFuture(time) {
  return time > Date.now();
}

function toggleTimerActiveState() {
  timer.isStarted() ? timer.stop() : timer.start();
}

function updateStartButtonText() {
  elStartButton.textContent = timer.isStarted() ? 'Stop' : 'Start';
}
