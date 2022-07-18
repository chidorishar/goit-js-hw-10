import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import toggleButtonEnabledState from './common';

(() => {
  flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: onDataSelected,
  });
  toggleButtonEnabledState(elStartButton);
})();
