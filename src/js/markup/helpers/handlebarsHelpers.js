const Handlebars = require('handlebars');

Handlebars.registerHelper('isOverZero', function (value) {
  return value > 0;
});
