# React Native에서 “끊김”을 잡는 법 — 지연 vs 프레임률, UI/JS 스레드, 진단 & 처방

## 오늘의 결론

- 사용자가 느끼는 끊김은 두 가지 원인이 섞여 있다.

1. 프레임 드랍 (throughput 문제)
2. 애니메이션 시작 지연 (latency 문제)

- 내 케이스 : UI FPS 는 60 근처인데 JS FPS 가 50대로 하락 -> 프레임 드랍이 아니라 시작 지연이 체감 버벅임이 주범

- 해결 핵심: JS타이머로 애니 오케스트레이션 하지 말고, `Animated.sequence / delay / parallel / stagger ` 로 네이티브 타입라인에 한번에 제출해라
- 부가적으로 리렌더 최소화(memo. callback/ memorize/배치) , UI 레이어 다이어트 (그림자/ 오버플로우)로 양 스레드의 부담을 함께 줄인다.

---

## 왜 "UI 60인데도 끊긴다"가 가능한가

### 1. 지연(레이턴시) vs. 프레임률(throughput)

- 사용자는 "탭" -> "카드 뒤집히기 시작"까지 늦으면 끊김처럼 느낌
- 시작만 늦고, 시작 후엔 ui 가 60fps로 잘 돌아가도 버벅으로 채감 됨

### 2. JS-driven 오케스트레이션의 지터

- setTimeout(600) 같은 JS 타이머로 "언제 `.start` 할지" 를 결정하면, 그 순간 JS 가 바쁘면 콜백이 늦어짐
- `.start()` 자체도 브리지 왕복 필요 -> 시작 지연 증가
- 그래서 JS FPS 는 떨어지는데, UI FPS 는 그대로일 수 있음 (아직 그릴 변화가 없어서)
  5

### 3. Performance Monitor의 평균화

- 짧은 스파이크(30~40ms)는 평균에 묻힐 수 있음 -> UI 60으로 보여도 순간 끊김 체감 가능

---

## 프레임 예산(60fps = 16.7ms/ 120fps/8,3ms)

- 한 프레임 안에 입력 처리 -> 애니 업데이트 -> 레이아웃 -> 그리기/합성을 끝내야 함
- 어느 스레드든 예산을 넘기면 드랍 프레임, 반응 지연이 발생

## 내 상황 진단 요약

- UI 60 유지, JS 50 대로 하락 -> 병목은 JS 스레드(시작 지연/ 리렌더/ 타이머)
- UI 병목(그림자, 레이아웃)이 주원인은 아님. 다만 보조 다이어트는 유효

## 처방 - 우선 순위대로 바로 적용

### A. JS 오케스트레이션을 네이티브로

**(Bad) JS 타이머 + `.start()` N번**

```tsx
setTimeout(() => {
  Animated.parallel([flipCardSafe(first, 0), flipCardSafe(second, 0)]).start();
}, 600);
```

**(Good) 네이티브 타임라인에 “한 번에” 제출**

```tsx
Animated.sequence([
  Animated.delay(600),
  Animated.parallel([flipCardSafe(first, 0), flipCardSafe(second, 0)]),
]).start();
```

- `delay/sequence/parallel/stagger`로 **브리지 호출 1회**로 끝내기 → **시작 지연·지터** 감소.

### B. 리렌더 최소화( JS FPS 방어 )

- `React.memo(MemoryTile/MemoryBoard)`
- 핸들러는 `useCallback`으로 참조 안정화
- 계산값은 `useMemo`(타일 크기/마진 등)
- **상태 업데이트 묶기**(동일 타이밍 다중 `setState` 지양)
- UI에 보여주지 않는 토글/플래그는 **ref**로 관리(리렌더 없음)

### C. UI 스레드 다이어트(보조 안정화)

- **그림자 분리/약화**: iOS `shadow*` 낮추고, Android `elevation` 과용 금지
- `renderToHardwareTextureAndroid`는 필요한 곳만
- **오버드로우** 줄이기(중첩 배경 최소/뷰 계층 얕게)
- **이미지**: require 자산 유지, 필요 시 사전 로드(Expo `Asset.loadAsync`)

### D. 프레임 바깥으로 미루기

- 점수·로그·분석 등 UI 비핵심 작업은
  ```tsx
  InteractionManager.runAfterInteractions(() => {
    /* … */
  });
  ```

---

## 성능 측정 루틴(개발→릴리즈)

1. **Dev Menu → Performance Monitor** 켜고 시나리오별 확인
   - ① 한 장 뒤집기 ② 불일치 후 복귀(딜레이) ③ 전체 뒤집기
   - JS만 떨어지면 A/B 우선 적용. UI가 떨어지면 C도 병행.
2. **Android**: Developer Options → **Profile HWUI Rendering**(막대가 초록선(16.7ms) 넘는지)

   **iOS**: Instruments → **Core Animation**(Frame time 스파이크)

3. **Release 빌드**로도 재확인(Dev는 느림)

---

## 커밋 전 체크리스트

- [ ] `setTimeout` → `Animated.delay/sequence/stagger/parallel`로 교체
- [ ] `React.memo` + `useCallback` + `useMemo` 적용
- [ ] 동일 타이밍 다중 `setState` → **배치/통합**
- [ ] 리스트 `key={card.id}`(상태 섞지 않기)
- [ ] (필요시) 그림자/오버드로우 다이어트

---

## 보너스: 구조 메모(ID vs Index)

- **데이터/렌더 식별**은 `id`(React key/정체성)
- **상태/애니**는 **index(=slot)** 로 충분(라운드 중 배열 불변 전제)
- 라운드 도중 순서/길이 변경이 필요해지면 `Map<id, Animated.Value>`로 **id 네이티브** 전환 고려

---

### 한 줄 요약

> 체감 끊김은 프레임 드랍만이 아니라 애니 시작 지연도 크다.
>
> **JS 타이머 오케스트레이션을 네이티브 타임라인으로 이동**하고, **리렌더/레이어를 정리**하면 UI·JS 모두 안정적으로 60fps를 붙는다.
