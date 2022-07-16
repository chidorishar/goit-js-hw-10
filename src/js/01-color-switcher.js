const TIMER_INTERVAL = 1000;
const cntrlBttns = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};
let isChangingActive = false;
let timerID = null;

//main function
(() => {
  Object.values(cntrlBttns).forEach(bttn =>
    bttn.addEventListener('click', onControlButtonClick)
  );
  toggleButtonEnabledState(cntrlBttns.stop);
})();

function onControlButtonClick() {
  if (isChangingActive) {
    clearInterval(timerID);
  } else {
    setRndBackgroundColor();
    timerID = setInterval(setRndBackgroundColor, TIMER_INTERVAL);
  }
  Object.values(cntrlBttns).forEach(bttn => toggleButtonEnabledState(bttn));
  isChangingActive = !isChangingActive;
}

function setRndBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function toggleButtonEnabledState(bttn) {
  bttn.hasAttribute('disabled')
    ? bttn.removeAttribute('disabled')
    : bttn.setAttribute('disabled', '');
}
