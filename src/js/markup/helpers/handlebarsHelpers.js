const Handlebars = require('handlebars');

Handlebars.registerHelper('isOverZero', function (value) {
  return value > 0;
});

Handlebars.registerHelper('numberSeparatedWithWhitespace', function (value) {
  return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ');
});
