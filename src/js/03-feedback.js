const throttle = require('lodash.throttle');

const FORM_DATA_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');
let formData = {};

//main functions
(() => {
  formEl.addEventListener('input', throttle(onFormInput, 500));
  formEl.addEventListener('submit', onFormSubmit);

  makeFormFieldsRequired();
  readFormDataFromStorage();
  fillFormWithFormData();
})();

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log(formData);
  clearFormAndData();
}

function clearFormAndData() {
  [...formEl.elements].forEach(el => (el.value = ''));
  Object.keys(formData).forEach(key => (formData[key] = ''));
  localStorage.removeItem(FORM_DATA_KEY);
}

function readFormDataFromStorage() {
  formData = JSON.parse(localStorage.getItem(FORM_DATA_KEY));
  formData = formData ? formData : {};
}

function fillFormWithFormData() {
  Object.keys(formData).forEach(key =>
    formData[key] ? (formEl.elements[key].value = formData[key]) : null
  );
}

function makeFormFieldsRequired() {
  [...formEl.elements].forEach(value => {
    value.setAttribute('required', '');
  });
}
