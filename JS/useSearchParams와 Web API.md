# React Router useSearchParams와 Web API(URLSearchPArams) 이해하기

## Web API 란?

> **웹 API**
>
> 웹용 코드를 작성할 때 사용할 수 있는 웹 API 가 많이 있습니다. 다음은 웹 앱이나 사이트를 개발하는 동안 사용할 수 있는 모든 API 및 인터페이스(객체 유형) 목록입니다.
>
> 웹 API 는 일반적으로 JS와 함께 많이 사용되지만 항상 그런 것은 아닙니다.

우선 mdn이의 공식 문서에는 위와 같이 정의되어 있다. **개발하는 동안 사용할 수 있는 모든 API 및 interface(객체)**를 의미한다.

웹 API를 이해하기 위해서는 또 API 가 무엇인지 알아야한다.

### API란

API 란 쉽게 말해서 **설명서**나 **버튼** 같은 것이다.

그 안에 무엇이 들어있는지 자세하게 알지는 못해고, **이미 짜여있는 것들을 쉽게 꺼내어 쓸 수 있도록 도와주는 역할**을 한다.

즉 web API는 미리 브라우저에 내장되어 있어서 개발자가 쉽게 꺼내어 쓸 수 있는 버튼이나, 설명서라도 이해하면 이해하기 쉽다.

#### 대표적인 Web API 예시:

- **window.location**
  - 현재 페이지 주소 관련 정보
- **URLServerParams**
  - 쿼리 문자열 다루기
- **navigator.clipboard**
  - 클립보드 제어
- **fetch**
  - HTTP 요청

## useSearchParams 와 Web API와 관계

- useSearchParams 는 React Router가 제공하는 **훅(hook)**이다.
- 그런데 내부적으로는 Web API인 `URLSearchParams`를 그대로 사용한다.
  - `searchParams.get("q")`
    - 사실상 `new URLSearchParams(window.location.search).get("q");`
  - 즉, React Router는 이 과정을 편하게 해준 것일 뿐, 기반은 Web API

---

### 코드 다시 보기 (Web API 관점)

```js
const url = `${window.location.origin}?${searchParams.toString()}`;
```

- window.location.origin
  - Web API (브라우저가 제공, 현재 사이트의 출저)
- SearchParams.toString()
  - Web API (URL)
- ${ ... }

  - JS의 템플릿 문자열 (Web API 는 아니고 언어 문법)

- React Router의 useSearchParams도 결국 Web API 를 편리하게 감싸주는 도구일 뿐, 핵심은 Web API로 URL을 조작한다는 것이다.

### 한 줄 정리

- React Router의 useSearchParams = Web API(URLSearchParams)를 React스럽게 감싼 도구
- window.location.origin = Web API(Location API)가 제공하는 현재 출처
- 우리가 작성하는 코드는 결국 Web API들을 조합해서 "URL 문자열"을 만들고, 그걸 애플리케이션 로직에 활용하는 것
