prefers-color-scheme이란
===
prefers-color-scheme은 **사용자가 브라우저** 나 운영체제에서 "다크 모드" 또는 "라이트 모드"를 선호하는지를 나타내는 CSS 기능이다.

```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: black;
    color: white;
  }
}
```
- 위 코드는 **운영체제가 다크 모드일때만 적용** 된다.
- Tailwind에서 `darkMode: 'media'` 로 설정하면 이걸 기반으로 자동 다크 모드가 작동된다.

## 근데 왜 대부분 `darkMode: 'class'` 를 쓸까?
- 사용자가 원하는 때 직접 토글 버튼으로 다크 모드를 바꾸게 하고 싶을 때
- Tailwind에서 다크 모드 스타일을 명시적으로 제어하고 싶을 때
- `prefers-color-scheme` 은 유저 설정에만 의존하니까 커스터마이징이 어려움


## 정리
| 구분 | prefers-color-scheme | dark 클래스 |
| --- | --- | --- |
| 작동 방식 | 운영체제 설정을 자동 감지 | 개발자가 직접 제어 |
| Tailwind 옵션 | `darkMode: 'media'` | `darkMode: 'class'` |
| 커스터마이징 | 어려움 | 자유로움 (토글 등 가능) |
| 배워야 할지? | 선택 사항 | Tailwind에서 class 모드 쓸 거면 몰라도 됨 |