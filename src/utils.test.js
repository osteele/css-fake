import { matchingParens } from './utils';

it('renders without crashing', () => {
    // no parentheses
    expect(matchingParens('abcd')).toBe(true);
    // matched parentheses
    expect(matchingParens('a()bcd')).toBe(true);
    expect(matchingParens('a(bc)d')).toBe(true);
    expect(matchingParens('(abc)d')).toBe(true);
    expect(matchingParens('a(bcd)')).toBe(true);
    // multiple parentheses
    expect(matchingParens('a(b)c(d)')).toBe(true);
    expect(matchingParens('a(bc)(d)')).toBe(true);
    // nested parentheses
    expect(matchingParens('a(b(c)d)')).toBe(true);
    // mismatched parentheses
    expect(matchingParens('a(bcd')).toBe(false);
    expect(matchingParens('a((bc)d')).toBe(false);
    expect(matchingParens('abc)d')).toBe(false);
    expect(matchingParens('ab(c))d')).toBe(false);
});
