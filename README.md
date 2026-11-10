# komy-workshop-test

## 수량 검증 `isValidQuantity(value)` (`quantity.js`)

외부 패키지 없는 Node.js 함수. boolean을 반환한다.

**허용**: `0`, `-0`, 양의 안전한 정수(`Number.MAX_SAFE_INTEGER`까지)

**거부**: 음수, 소수, `NaN`/`Infinity`, 안전 범위 초과 정수(`2 ** 53` 등),
문자열 숫자(`"1"`, `" 1 "`), BigInt(`10n`, `0n`), `new Number(1)` 등 박싱 객체,
`null`/`undefined`/배열/객체/함수 등 number가 아닌 모든 값

## 시험 실행

```
node --test quantity.test.js
```

시험 이름에 입력값이 표시된다(예: `거부: 10n (bigint)`, `허용: -0`).
