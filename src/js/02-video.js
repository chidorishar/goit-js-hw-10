import Vimeo from '@vimeo/player';

const PLAYED_TIME_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);
const savedTime = localStorage.getItem(PLAYED_TIME_KEY);
const throttle = require('lodash.throttle');

//main function
(() => {
  if (!player) {
    console.log('Cant initialize vimeo player!');
    return;
  }

  savedTime ? player.setCurrentTime(savedTime) : null;
  player.on('timeupdate', throttle(onVimeoTimeupdate, 1000));
})();

function onVimeoTimeupdate({ seconds }) {
  localStorage.setItem(PLAYED_TIME_KEY, seconds);
}
