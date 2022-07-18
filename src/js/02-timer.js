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

  constructor(onTick = () => {}) {
    this.onTick = onTick;
    this.#deltaTime = 0;
    this.#endTime = -1;
    this.#isActive = false;
  }

  #tick() {
    let { deltaTime, endTime } = this;
    this.#deltaTime = this.#endTime - Date.now();
    this.onTick(this.#deltaTime);
    console.log(this.#deltaTime);
  }

  setTime(time) {
    this.#endTime = time;
  }

  start() {
    if (this.#isActive || this.#endTime < 0) {
      console.log('Timer start dropped');
      return;
    }

    setInterval(this.#tick.bind(this), 1000);
    this.#isActive = true;
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
  timer = new Timer(onTimerTick);
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

  console.log(selectedTime);

  if (isTimeInFuture(selectedTime.getTime())) {
    setButtonEnabledState(elStartButton, true);
  } else {
    setButtonEnabledState(elStartButton, false);
    alert('Please choose a date in the future');
  }
}

function onStartClick() {
  if (!isTimeInFuture(selectedTime.getTime())) {
    toggleButtonEnabledState(elStartButton);
    alert('Please choose a date in the future');
    return;
  }
  timer.setTime(selectedTime);
  timer.start();
}

function onTimerTick({ days, hours, minutes, seconds }) {}
function onTimerTick({ days, hours, minutes, seconds }) {
  timerHTML.update({ days, hours, minutes, seconds });
}

function isTimeInFuture(time) {
  return time > Date.now();
}
