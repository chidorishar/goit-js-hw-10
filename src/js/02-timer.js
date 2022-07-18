import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import toggleButtonEnabledState from './common';

(() => {
  flatpickr('#datetime-picker', { enableTime: true });
})();
