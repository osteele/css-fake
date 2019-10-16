import { hasMatchingParens } from './utils';

it('renders without crashing', () => {
    // no parentheses
    expect(hasMatchingParens('abcd')).toBe(true);
    // matched parentheses
    expect(hasMatchingParens('a()bcd')).toBe(true);
    expect(hasMatchingParens('a(bc)d')).toBe(true);
    expect(hasMatchingParens('(abc)d')).toBe(true);
    expect(hasMatchingParens('a(bcd)')).toBe(true);
    // multiple parentheses
    expect(hasMatchingParens('a(b)c(d)')).toBe(true);
    expect(hasMatchingParens('a(bc)(d)')).toBe(true);
    // nested parentheses
    expect(hasMatchingParens('a(b(c)d)')).toBe(true);
    // mismatched parentheses
    expect(hasMatchingParens('a(bcd')).toBe(false);
    expect(hasMatchingParens('a((bc)d')).toBe(false);
    expect(hasMatchingParens('abc)d')).toBe(false);
    expect(hasMatchingParens('ab(c))d')).toBe(false);
});
