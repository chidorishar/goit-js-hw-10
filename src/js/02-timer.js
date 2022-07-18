import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { toggleButtonEnabledState, setButtonEnabledState } from './common';

const elStartButton = document.querySelector('[data-start]');
let selectedTime = 0;

(() => {
  flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: onDataSelected,
  });
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
}

function isTimeInFuture(time) {
  return time > Date.now();
}
