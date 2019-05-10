const assume = require('assume');
const { paint, stripper } = require('./');

describe('es-paint', function () {
  const example = 'ohai';

  describe('#paint', function () {
    it('is a function', function () {
      assume(paint).is.a('function');
    });

    it('renders a string with ansi colors using fatarrow syntax', function () {
      const result = paint`foo ${example}=>#ffd700 lol ${example}`;

      assume(result).is.a('string');
      assume(result).equals('foo \x1b[38;5;220mohai\x1b[39;49m lol ohai');
    });

    it('renders a string with ansi colors using pipeline operator', function () {
      const result = paint`foo ${example}|>#ffd700 lol ${example}`;

      assume(result).is.a('string');
      assume(result).equals('foo \x1b[38;5;220mohai\x1b[39;49m lol ohai');
    });
  });

  describe("#stripper", function () {
    it('is a function', function () {
      assume(stripper).is.a('function');
    });

    it('renders the string normally using a fatarrow', function () {
      const result = stripper`foo ${example}=>#ffd700 lol ${example}`;

      assume(result).is.a('string');
      assume(result).equals('foo ohai lol ohai');
    });

    it('renders a string normally using pipeline operator', function () {
      const result = stripper`foo ${example}|>#ffd700 lol ${example}`;

      assume(result).is.a('string');
      assume(result).equals('foo ohai lol ohai');
    });
  });
});
