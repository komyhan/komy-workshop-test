'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { isValidQuantity } = require('./quantity');

const label = (v) => (typeof v === 'bigint' ? `${v}n` : Object.is(v, -0) ? '-0' : typeof v === 'string' ? JSON.stringify(v) : Array.isArray(v) ? '[]' : v === null ? 'null' : typeof v === 'object' ? '{}' : String(v));

const accept = [
  0, -0, 1, 2, 42, 1000000,
  Number.MAX_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER,
];
const reject = [
  [-1, -100, Number.MIN_SAFE_INTEGER, -(2 ** 53)],
  [0.5, 1.1, -0.1, Number.EPSILON, Number.MIN_VALUE, NaN, Infinity, -Infinity],
  [Number.MAX_SAFE_INTEGER + 1, 2 ** 60, 1e21, Number.MAX_VALUE],
  ['1', '0', '', ' 1 ', '1.5', 'abc'],
  [0n, 1n, 10n],
  [null, undefined, true, false, [], [1], {}, () => 1],
  [{ valueOf: () => 1 }, { toString: () => '1' }, new Number(1)],
].flat();

for (const v of accept) {
  test(`허용: ${label(v)}`, () => assert.strictEqual(isValidQuantity(v), true));
}
for (const v of reject) {
  test(`거부: ${label(v)} (${typeof v})`, () => assert.strictEqual(isValidQuantity(v), false));
}
