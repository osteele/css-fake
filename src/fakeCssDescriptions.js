/**
 * This uses a simple bigram to avoid overfitting, since the dataset is small
 * and this seems to produce sufficient randomness.
*/

/* eslint import/no-webpack-loader-syntax: off */
import text from '!raw-loader!./data/css-descriptions.txt';
import { hasMatchingParens } from './utils';

const descriptions = new Set(text.split("\n"));
descriptions.delete("");

// bigrams is a Map<Optional<string>, [Optional<string>]>. null in a key
// represents the position before the initial word. null in a value represents
// the position after the final word. Values are stored as Array<T> instead of
// Map<T, int> because the data set is so small, and this simplifies both
// construction and use.
const bigrams = new Map();

// Populate bigrams. Words are tokenized along with their punctuation;
// for example, "(static,".
descriptions.forEach((line) => {
    var previous = null;
    [...line.split(/\s+/), null].forEach((word) => {
        let successors = bigrams.get(previous);
        if (!successors) {
            successors = [];
            bigrams.set(previous, successors);
        }
        successors.push(word);
        previous = word;
    })
});

/**
 * Create a new description, possibly with mismatched parens or the same as a
 * real description.
 */
function createDescription() {
    const words = [];
    let word = null;
    while (true) {
        const successors = bigrams.get(word);
        word = successors[Math.floor(successors.length * Math.random())];
        if (word === null) {
            break;
        }
        words.push(word);
    }
    return words.join(" ");
}

function testDescription(description) {
    if (descriptions.has(description)) { return false; }
    if (!hasMatchingParens(description)) { return false; }
    return true;
}

export function fakeDescription() {
    while (true) {
        const description = createDescription();
        if (testDescription(description)) {
            return description;
        }
    }
}
