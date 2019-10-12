/* Export a single function makeNewName that returns a string that is similar to
* but distinct from multi-word (hyphenated) CSS attribute names.
*/

/* eslint import/no-webpack-loader-syntax: off */
import text from '!raw-loader!./data/css-names.txt';
import { pick } from './utils';

// CSS attribute names
const names = new Set(text.split("\n"));

// words that appear respectively at the beginning, middle, and end of a CSS
// name
const first = new Set();
const middle = new Set();
const last = new Set();
// words that appear as the entirety of a CSS name
const solo = new Set();

// number of actual CSS names at each word-count
const stats = [0];

// populate first, middle, last, and solo
names.forEach(name => {
    const parts = name.split('-');
    stats[parts.length] = (stats[parts.length] || 0) + 1
    if (parts.length > 1) {
        first.add(parts.shift());
        last.add(parts.pop());
        while (parts.length) {
            middle.add(parts.pop());
        }
    } else {
        solo.add(parts.pop());
    }
})

// Synthesize a multi-word CSS name. It may turn out to be the same as a actual
// CSS name.
function makeName() {
    const sum = (xs) => xs.reduce((a, b) => a + b, 0);
    const words = [pick(first)];
    // add middle words, with the same length distribution as the observed CSS
    // names.
    while (Math.random() < sum(stats.slice(words.length + 2)) / sum(stats.slice(words.length + 1))) {
        words.push(pick(middle));
    }
    words.push(pick(last));
    return words.join("-");
}

/* Synthesize a multi-word (hyphenated) CSS name that is distinct from actual
 * CSS attribute names. This matches the word count statistics of the actual CSS
 * attribute names, but it does not use a Markov process to match collocation
 * frequencies. The set of attribute names is too small.
 */
export function makeNewName() {
    while (true) {
        const name = makeName();
        if (names.has(name)) {
            continue;
        }
        return name;
    }
}
