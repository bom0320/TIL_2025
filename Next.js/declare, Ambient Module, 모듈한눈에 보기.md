declare, Ambient Module, 모듈한눈에 보기
===

## 1. `declare` 키워드

| 특징 | 설명 |
| --- | --- |
| **역할** | “**이미 존재**하는 전역/외부 식별자와 타입을 **컴파일러에게만** 알려줘” |
| **JS 출력 여부** | 전혀 출력되지 않음 - 타입 검사용 메타데이터일 뿐 |
| **대표 사용처** | - CDN·타사 SDK가 만든 전역 객체- 동적(런타임)으로 주입될 클래스 프로퍼티 |
| **예시** | `ts declare const fooSdk: { doSomething(): boolean }ts class Person { declare id: string }` |

> declare는 새 변수를 생성하지 않는다. “있다고 믿어 달라”는 계약만 추가한다.
> 

---

## 2. Ambient(글로벌) Module

| 구분 | 글로벌(Ambient) 스크립트 | 로컬(모듈) 스크립트 |
| --- | --- | --- |
| **조건** | 파일에 `import` · `export` 가 **하나도 없음** | `import` 또는 `export` 중 하나라도 존재 |
| **스코프** | 파일 안의 모든 최상위 선언이 **자동 전역** | 선언은 파일 내부에만 존재 → 써려면 `export / import` |
| **장점** | 금방 테스트할 때 편함 | 이름 충돌 방지, 소스 추적이 명료, IDE 지원 우수 |
| **단점** | 어디서 왔는지 모호, 충돌 위험 | 약간의 보일러플레이트 필요 |

### 예시

```tsx

// data.ts  (글로벌)
type Age = number
let 나이: Age = 20            // 전역

// index.ts
console.log(나이 + 1)         // 오류 없음

```

```tsx

// data.ts  (모듈)
export {}                     // ← 빈 export 하나로도 모듈 전환
type Age = number
let 나이: Age = 20

// index.ts
console.log(나이)             // ❌ 에러 — 전역 아님

```

---

## 3. 왜 오픈소스는 항상 `import/export`를 쓸까?

1. **명확성** — 타입·값의 출처가 즉시 보인다.
2. **네임스페이스 충돌 방지** — 전역 오염이 없다.
3. **리팩터·자동완성·Jump to Definition** 지원이 탁월하다.
4. **트리 셰이킹(Tree-Shaking)** 가능 → 번들 크기 최적화.

> Ambient Module은 실험용·레거시 이식기로만 쓰고,
> 
> 
> **실무/오픈소스**에는 **모듈 방식**이 사실상 필수 관례.
> 

---

## 4. 실무 권장 패턴

| 상황 | 권장 방법 |
| --- | --- |
| 외부 CDN / 레거시 전역 변수를 타입 보강 | `globals.d.ts` 파일에 `declare const …` |
| 새 코드, 팀 프로젝트, 오픈소스 | 반드시 `export` + `import` 로 모듈화 |
| JS ↔ TS 혼용 단계 | `allowJs: true` 로 JS도 타입 추론 + `declare`로 부족한 부분 보강, 최종적으로 TS로 마이그레이션 |

---

## 5. 기억하기 좋은 한 줄

> declare = “존재는 믿어 줘, 타입은 이거야”
> 
> 
> **Ambient Module** = “`import/export` 없는 `.ts` 파일은 전부 전역”
> 
> **모듈(import/export)** = “안전·명확·실무 표준”
> 

---

### 빠른 체크리스트

- [ ]  외부 전역을 쓸 때 `.d.ts` + `declare` 작성했는가?
- [ ]  새 타입·값은 항상 `export` 하고 필요한 곳에서 `import` 했는가?
- [ ]  `import/export` 없는 `.ts` 파일이 프로젝트에 남아 있지 않은가?
- [ ]  레거시 전역 타입 보강 후 가능하면 모듈로 리팩터링할 계획이 있는가?