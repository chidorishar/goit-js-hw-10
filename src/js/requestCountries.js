var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

import './markup/helpers/handlebarsHelpers';
import shortCountryInfoTmpl from './markup/layouts/countryInfoMarkup.hbs';
import extendCountryInfoTmpl from './markup/layouts/extendCountryInfoMarkup.hbs';

const domEls = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

//main function
(() => {
  domEls.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
})();

function onInput(event) {
  const name = event.target.value.trim();

  if (!name.length) {
    return;
  }

  fetchCountries(name)
    .then(countries => {
      if (countries.length > 1 && countries.length <= 10) {
        clearRenderElements(false, true);
        renderCountriesShortInfo(countries);
      } else if (countries.length > 10) {
        clearRenderElements();
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        clearRenderElements(true, false);
        renderCountriesExtendInfo(countries);
      }
    })
    .catch(exception => {
      clearRenderElements();
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountriesShortInfo(countries = {}) {
  domEls.countryList.innerHTML = shortCountryInfoTmpl({ countries });
}

function renderCountriesExtendInfo(countries = {}) {
  domEls.countryInfo.innerHTML = extendCountryInfoTmpl({ countries });
}

function clearRenderElements(shortInfo = true, extendInfo = true) {
  shortInfo ? renderCountriesShortInfo() : null;
  extendInfo ? renderCountriesExtendInfo() : null;
}
