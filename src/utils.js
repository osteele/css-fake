export function everyNth(items, n, offset) {
    const result = [];
    for (let i = offset || 0; i < items.length; i += n) {
        result.push(items[i]);
    }
    return result;
}

export function windows(items, size) {
    const result = [];
    for (let i = 0; i + size < items.length; i += size) {
        result.push(items.slice(i, i + size));
    }
    return result;
}

export function matchingParens(str) {
    const reduced = str.replace(/\(.*?\)/g, '');
    return !reduced.match(/[()]/);
}

// Randomly pick an element from a array-like or iterable.
export function pick(iterable) {
    const ar = Array.from(iterable);
    const i = Math.floor(ar.length * Math.random());
    return ar[i];
}


