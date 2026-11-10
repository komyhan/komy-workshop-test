'use strict';

/**
 * 정수 수량 검증: 0 및 양의 안전한 정수만 허용.
 * 음수, 소수, 문자열(및 기타 비-number), NaN/Infinity, 안전 범위 초과 정수는 거부.
 */
function isValidQuantity(value) {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 && !Object.is(value, -0);
}

module.exports = { isValidQuantity };
