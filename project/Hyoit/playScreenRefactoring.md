## **⚠️ playScreen 책임 과부화때매 리팩토링 결정**

pages/game/memory/PlayScreen.tsx PlayScreen 이 난이도 파라밑 파싱, 덱 생성, 카운트 다운, HP 계산, 성공/실패 판성, 재시작까지 모두 포함하고 있음

> FSD 기준으로 화면(page) 은 위젯들을 조합하고 도메인x 레벨(use cases)에서 온 데이터/상태를 넘겨주는 역할이 적절하다.

현재 로직 덩어리를 전부 page 에서 다루면 이후 다른 화면이나 플랫폼(웹. 등)에서 재사용하려할 대도 메인 로직을 분리하기 어렵다.

따라서…

entities/memory-game 또는 feature/memory-game 계층으로 useMemoroyPlaySession같은 훅을 이동해 상태/전이(phase, untilStart, wrong, pairLeft 등)을 관리하게 하면 화면은 hook → props → widget 전달만 맡게 된다.
