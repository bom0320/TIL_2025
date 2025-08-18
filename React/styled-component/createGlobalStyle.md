# createGlobalStyle

CreateGlobalStyle은 styled-components 라이브러리에서 제공하는 컴포넌트 중 하나로, 전역 스타일을 정의하고 적용할 수 있게 해주는 기능이다.
리액트 애플리케이션에서 **전역적으로 적용되는 스타일을 설정**하는 데 사용된다.

일반적으로 웹 애플리케이션에서 각각의 컴포넌트에 스타일을 지정하는 것은 좋은 방법이지만,
때로는 모든 컴포넌트에서 공통적으로 사용되는 스타일이 필요할 때가 있다.

이때 createGlobalStyle을 사용해 **전역 스타일을 정의**하고, 해당 스타일이 모든 컴포넌트에 적용되도록 할 수 있다.

```js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
  }

  /* 기타 전역 스타일들 */
`;

function App() {
  return (
    <>
      <GlobalStyle />
      {/* 나머지 컴포넌트들 */}
    </>
  );
}
```

위의 예제에서 GlobalStyle 컴포넌트 안에 정의한 스타일은 앱 전체의 body 요소에 적용된다.

createGlobalStyle은 템플릿 리터럴 내에서 CSS 스타일을 정의할 수 있으며, 이렇게 정의된 스타일은 해당 컴포넌트가 마운트될 때 `<style>` 태그로 추가되어 전역 스타일로 적용된다.
