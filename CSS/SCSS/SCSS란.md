## SCSS 란

CSS는 HTML 태그를 꾸미거나 효과를 넣어 주는 등 디자인 요소를 추가할 때 사용하는 전처리기 과정이다. 하지만 프로젝트 규모가 커지거나 작업이 고도화될 수록 CSS는 불가피하게 가독성이 떨어지는 등 유지보수의 어려움을 주는 요소가 된다. 코드의 재사용성을 올리고 가독성을 올리는 등, CSS에서 보이던 단점을 보완하고, 개발의 효율을 올리기 위해 등장한 개념이 SASS / SCSS라고 한다.

CSS의 태생적 한계를 보완하기 위해 Sass는 유용한 도구들을 제공한다.

- 변수의 사용
- 조건문과 반복문
- import
- Nesting
- Mixin
- Extend/Inheritance

### 설치 방법

```tsx
npm i sass --save
```

## Sass와 SCSS 차이

Sass (Syntactically Awesome Style Sheets)의 3버전에서 새롭게 등장한 SCSS는 CSS 구문과 완전히 호환되도록 새로운 구문을 도입해 만든 Sass의 모든 기능을 지원하는 CSS의 상위집합

**Sass**

```scss
.list
  width: 100px
  float: left
  li
    color: red
    background: url("./image.jpg")
    &:last-child
      margin-right: -10px

```

**scss**

```scss
.list {
  width: 100px;
  float: left;
  li {
    color: red;
    background: url("./image.jpg");
    &:last-child {
      margin-right: -10px;
    }
  }
}
```

간단한 차이는 { }, ;

즉, 중괄호와 세미콜론의 유무이다.

또 하나의 차이점은 mixin (재사용 가능한 기능을 만드는 방식)이다.

기능을 재사용하기 위해서 Sass의 경우 = 로 선언하고 + 로 적용시킨다.

SCSS의 경우 @mixin으로 선언하고, @include 로 적용시킨다.

```scss
// border-radius라는 재사용 블록(함수)를 만든 거고, $radius 는 매개변수 (값을 나중에 넣어줌)
=border-radius($radius)
  -webkit-border-radius: $radius
  -moz-border-radius:    $radius
  -ms-border-radius:     $radius
  border-radius:         $radius

// 사용
// border-radius 믹스인을 10px로 실행해 줘
.box
  +border-radius(10px)
```

```scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  -ms-border-radius: $radius;
  border-radius: $radius;
}

.box {
  @include border-radius(10px);
}

// border-radius 라는 이름의 스타일 묶음을 만들 건데, $radius 라는 값을 받아서,
// 벤더 프리픽스를 포함한 radius 코드를 한번에 넣어주세요.
```

- Sass는 좀 더 간결하고 작성하기 편리하며, {}, ; 를 사용하지 않아도 되니 코드가 훨씬 깔끔해진다.
- SCSS는 인라인 코드(한 줄 작성)를 할 수 있고, CSS와 유사한 문법을 가지고 있기 때문에 코드 통합이 훨씬 쉽다.
- 거의 차이가 없지만 몇몇 장단점이 있기 때문에 회사나 팀에서 원하는 방식으로 사용하거나 개인 취향에 따라 선택하면 될 듯 싶다.

### 사용부

```scss
.box {
  @include border-radius(10px);
}
```

이 줄은 사실상 아래 css로 변환됨

```scss
.box {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  border-radius: 10px;
}
```

## 장점

CSS와 비교해서 Sass(SCSS)는 아래와 같은 장점이 있다.

- CSS보다 심플한 표기법으로 CSS를 구조화하여 표현할 수 있다.
- 스킬 레벨이 다른 팀원들과의 작업 시 발생할 수 있는 구문의 수준 차이를 평준화 할 수 있다.
- CSS에는 존재하지 않는 Mixin등의 강력한 기능을 활용하여 CSS 유지 보수 편의성을 큰 폭으로 향상 시킬 수 있다.

SCSS는 중첩, 변수, 선언, 연산자 등 많은 장점을 가지고 있다. 대표적인 장점은 셀렉터 중첩 기능.

이에 대해서 알아보도록 하자

```scss
// css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

```scss
// Sass
nav
  ul
    margin: 0
    padding: 0
    list-style: none

  li
    display: inline-block

  a
    display: block
    padding: 6px 12px
    text-decoration: none
```

```scss
// scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
  }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

즉, 셀렉터 안에 셀렉터를 넣어 중첩을 시켜 가독성이 좋아진 걸 볼 수 있다.
