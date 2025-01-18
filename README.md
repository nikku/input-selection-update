# selection-update

[![Build Status](https://travis-ci.com/nikku/selection-update.svg?branch=master)](https://travis-ci.com/nikku/selection-update)

Computing input selection updates on external content changes, as if we used browser managed _undo_ and _redo_.


## API

```javascript
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
calculateUpdate(currentSelection, currentValue, newValue);
```


## Usage

```javascript
import { calculateUpdate } from 'selection-update';

/**
 * Update input with new value.

 * @param {Node} $input
 * @param {String} newValue
 */
function updateInput($input, newValue) {

  var newSelection;

  // only retrieve and restore input, if the element
  // is currently active
  if (document.activeElement === $input) {

    // get the current selection and pass it in as {start, end}
    newSelection = selectionUpdate(getSelection($input), $input.value, newValue);
  }

  // apply new value, will naturally send selection to input end
  $input.value = value;

  if (newSelection) {
    // set new {start, end} selection on input
    setSelection($input, selection);
  }
}
```


## Related

* [selection-ranges](https://github.com/nikku/selection-ranges) - manipulate selection ranges on contenteditable elements


## License

MIT
