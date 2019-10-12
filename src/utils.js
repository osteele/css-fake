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

// A string comparator, useful as an argument to sort().
export function stringCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

export function fixedPoint(fn, x) {
    while (true) {
        const y = fn(x);
        if (x === y) { return x; }
        x = y;
    }
}

export function matchingParens(str) {
    const reduced = fixedPoint((s) => s.replace(/\([^(]*?\)/g, ''), str);
    return !reduced.match(/[()]/);
}

// Randomly pick an element from a array-like or iterable.
export function pick(iterable) {
    const ar = Array.from(iterable);
    const i = Math.floor(ar.length * Math.random());
    return ar[i];
}



