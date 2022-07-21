import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const promisesOptions = {
  delay: 0,
  step: 0,
  amount: 0,
};

//main function
(() => {
  formEl.addEventListener('submit', onFormSubmit);
})();

function onFormSubmit(event) {
  event.preventDefault();

  readPromisesCreationOptions(promisesOptions);
  const { delay, step, amount } = promisesOptions;

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  event.target.reset();
}

function readPromisesCreationOptions(opt) {
  Object.keys(opt).forEach(key => {
    opt[key] = parseInt(formEl.elements[key].value);
  });
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  );
}
