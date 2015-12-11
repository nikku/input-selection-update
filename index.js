'use strict';

/**
 * Calculate the selection update for the given
 * current and new input values.
 *
 * @param {Object} currentSelection as {start, end}
 * @param {String} currentValue
 * @param {String} newValue
 *
 * @return {Object} newSelection as {start, end}
 */
function calculateUpdate(currentSelection, currentValue, newValue) {

  var newSelection = currentSelection.start,
      diff = newValue.length - currentValue.length,
      idx;

  if (diff > 0) {

    // newValue longer than currentValue
    // search position after addition
    // AAABCCC => AAAAB|BCCC
    for (idx = newValue.length; idx >= 0; idx--) {
      if (currentValue.charAt(idx - diff) !== newValue.charAt(idx)) {

        newSelection = idx + 1;
        break;
      }
    }
  } else {

    // currentValue longer than newValue
    // search position before deletion addition
    // AAAABBCCC => AAA|BCCC
    for (idx = 0; idx < newValue.length + 1; idx++) {
      if (currentValue.charAt(idx) !== newValue.charAt(idx)) {

        newSelection = idx;
        break;
      }
    }
  }

  return range(newSelection);
}

module.exports = calculateUpdate;


/**
 * Utility method for creating a new selection range {start, end} object.
 *
 * @param {Number} start
 * @param {Number} [end]
 *
 * @return {Object} selection range as {start, end}
 */
function range(start, end) {
  return {
    start: start,
    end: end === undefined ? start : end
  };
}

module.exports.range = range;