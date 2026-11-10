'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { isValidQuantity } = require('./quantity');

test('허용: 0과 양의 안전한 정수', () => {
  for (const v of [0, 1, 42, 1000000, Number.MAX_SAFE_INTEGER]) {
    assert.strictEqual(isValidQuantity(v), true, String(v));
  }
});

test('거부: 음수', () => {
  for (const v of [-1, -100, Number.MIN_SAFE_INTEGER, -0]) {
    assert.strictEqual(isValidQuantity(v), false, String(v));
  }
});

test('거부: 소수 및 비유한 수', () => {
  for (const v of [0.5, 1.1, -0.1, NaN, Infinity, -Infinity]) {
    assert.strictEqual(isValidQuantity(v), false, String(v));
  }
});

test('거부: 문자열 및 기타 타입', () => {
  for (const v of ['1', '0', '', 'abc', null, undefined, true, [], {}, 10n]) {
    assert.strictEqual(isValidQuantity(v), false, String(typeof v));
  }
});

test('거부: 안전 범위를 넘는 정수', () => {
  for (const v of [Number.MAX_SAFE_INTEGER + 1, 2 ** 60, 1e21, -(2 ** 53)]) {
    assert.strictEqual(isValidQuantity(v), false, String(v));
  }
});
