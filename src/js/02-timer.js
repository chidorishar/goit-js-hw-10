import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { toggleButtonEnabledState, setButtonEnabledState } from './common';

const elStartButton = document.querySelector('[data-start]');
let timer = null;
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
}
(() => {
  flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: onDataSelected,
  });
  timer = new Timer(onTimerTick);
  elStartButton.addEventListener('click', onStartClick);
  toggleButtonEnabledState(elStartButton);
})();

function onDataSelected(selectedDates) {
  selectedTime = selectedDates[0];

  console.log(selectedTime);

  isTimeInFuture(selectedTime.getTime())
    ? toggleButtonEnabledState(elStartButton)
    : alert('Please choose a date in the future');
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
function isTimeInFuture(time) {
  return time > Date.now();
}
