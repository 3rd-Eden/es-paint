const assume = require('assume');
const paint = require('./');

describe('es-paint', function () {
  const example = 'ohai';

  it('is a function', function () {
    assume(paint).is.a('function');
  });

  it('renders a string with ansi colors', function () {
    const result = paint`foo ${example}=>#ffd700 lol ${example}`;

    assume(result).is.a('string');
    assume(result).equals('foo \x1b[38;5;220mohai\x1b[39;49m lol ohai');
  });
});
