transition VS. animation 차이
===

|  | transition | animation |
| --- | --- | --- |
| **트리거(시작 조건)** | **외부 자극 필요** (ex: hover, 클릭) | **스스로 실행 가능** (자동으로 시작) |
| **세밀한 제어** | 시작 상태 → 끝 상태 **1번만** 변화 | 여러 단계(keyframes)로 자유롭게 움직임 가능 |
| **코드 구성** | 간단 (from → to만 설정) | 복잡 (0%, 50%, 100% 이런 식으로 단계별로 설정) |
| **반복 가능성** | 기본은 1번만 발생 | 반복(loop) 가능 (`infinite` 반복 가능) |
| **사용 목적** | 버튼 hover 효과, 간단한 변화 | 로딩 애니메이션, 캐릭터 움직임처럼 복잡한 동작 |

---

## 쉽게 말하면..

- **transition =**
    - **외부 동작(hover, click 등)** 이 있을 때, 짧게 변화시키는 것
    - (ex: 버튼 눌렀을때 살짝 커지는 효과)

- **animatio =**
    - **혼자서 자동으로** 움직이거나, **복잡한 흐름** 을 만들고 싶을 때 쓴다.
    - (ex: 로딩 스피너 돌리기, 캐릭터가 빙글빙글 돈다든가)

---

## 예시 비교

### transition 예시

```css
.box {
  transition: transform 0.5s;
}
.box:hover {
  transform: scale(1.2);
}
```
👉 hover할 때만 커짐. 외부 액션 필요

----

### animation 예시

```css
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.box {
  animation: spin 2s linear infinite;
}
```
👉 가만히 있어도 혼자서 계속 돌아감. 외부 액션 필요 없음.

---

### 한줄로 기억하기 🧠

- **transition = "변화할 때 예쁘게"**
    - (누가 건들어야 시작함)

- **animation = "자기 혼자 움직임 만들기"**
    - (건들지 않아도 움직일 수 있음)

## 요약
🔥 **transition은 "누가 건드리면 서서히 변화", animation은 "스스로 움직임"**!