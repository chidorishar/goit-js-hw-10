var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

import './markup/helpers/handlebarsHelpers';
const DEBOUNCE_DELAY = 300;
