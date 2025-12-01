# About mixin

## mixin 이 뭘까

> **mixin = 자주 쓰는 CSS 묶음을 “함수처럼” 만들어서 여러 곳에서 재사용하는 것**

CSS에서는 복사- 붙여넣기 밖에 안됨 ⇒ mixin은 그걸 이름 붙여서 재사용하게 해주는 기능이다.

## 왜 mixin 이 필요했을까

**css에서의 문제 상황**

```scss
.box {
  border-radius: 10px;
}

.card {
  border-radius: 10px;
}

.modal {
  border-radius: 10px;
}
```

나중에 `border-radius` 값을 바꾸려면 모든 곳을 다 고쳐야함

### mixin을 쓰면 이렇게 바뀜

```scss
@mixin rounded {
  border-radius: 10px;
}

.box {
  @include rounded;
}

.card {
  @include rounded;
}
```

- 변경하고 싶으면?
  - → mixin 하나면 수정하면 긑

### mixin 은 언제 쓰면 좋을까

- flex 중앙 정렬
- 버튼 공통 스타일
- 자주 스는 애니메이션 패턴
- 반응형 미디어쿼리
- 벤더 프리픽스 묶음

ex.

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  @include flex-center;
}
```
