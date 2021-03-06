const kuler = require('kuler');

/**
 * Our color syntax.
 *
 * =>(#hex || color name)
 *
 * @type {RegExp}
 * @private
 */
const extract = /^[=|\|]>([#?^\w]+)/;

/**
 * Generates our painters.
 *
 * @param {Function} modifier Modifier to trigger when encountering |> =>() tags
 * @return {Function} Our painter.
 * @public
 */
function painter(modifier) {
  /**
   * Introduce ANSI colors by processing template literals.
   *
   * @param {Array} strings Template strings.
   * @param {Array} values Template values.
   * @returns {String} The colored template.
   * @public
   */
  return function paint(strings, ...values) {
    let result = '';
    let value = '';

    for (let i = 0, l = strings.length; i < l; i++) {
      let str = strings[i];
      let match = extract.exec(str);

      if (match && value) {
        result += modifier(value, match[1]);

        //
        // Remove the paint instruction from the string so it doesn't end up in
        // the resulting output.
        //
        str = str.slice(match[0].length);
      } else {
        result += value;
      }

      result += str;
      value = values.shift();
    }

    return result;
  }
}

const stripper = painter((content) => content);
const paint = painter(kuler);

//
// Expose the paint method.
//
module.exports = {
  stripper: stripper,
  painter: painter,
  paint: paint
};
