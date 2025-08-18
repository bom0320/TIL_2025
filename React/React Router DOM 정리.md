# React Router DOM 정리

## React Router DOM 이란?

- React 애플리케이션에서 **페이지 전환(라우팅)**을 담당하는 라이브러리
- React는 기본적으로 SRA (Single Page Application) 방식 -> 페이지를 새로고침하지 않고 필요한 부분만 업데이트
- 하지만 URL 경로에 따라 다른 화면을 보여줄 필요가 있음 -> 그걸 해결하는 도구가 `react-router-dom`.

## 주요 개념

### BrowserRouter

- 라우터의 **최상위 관리자**
- 브라우저의 History API를 사용해 URL을 바꾸고, 전체 리로드 없이 화면 전환 가능
- 앱 전체를 `<BrowserRouter>` 로 감싸야 내부틔 `<Routes>`, `<Route>` , `<Link>` 등이 정상 작동

#### 다른 라우터와 비교

- **BrowserRouter**
  - 가장 일반적인 방식
  - `/about` 처럼 깔끔한 경로
- **HashRouter**
  - `/#/about` 처럼 해시 기반
  - 옛날 브라우저 호환용
- **MemoryRouter**
  - 주소창 대신 메모리에 기록 (주로 테스트용)

---

### Route

- 특정 URL ↔ 특정 컴포넌트를 연결

```jsx
<Route path="/about" element={<About />} />
```

### Routes (v6) / Switch (v5)

- 여러 Route 중 **하나만** 선택해 렌더링

#### v5까지는 `Switch` 사용:

```jsx
<Switch>
  <Route path="/about">
    <About />
  </Route>
  <Route path="/">
    <Home />
  </Route>
</Switch>
```

- 위에서부터 검사해서 **첫 번째 매치**만 렌더링

#### v6부터는 `Routes`로 변경, 문법도 바뀜:

```jsx
<Routes>
  <Route path="/about" element={<About />} />
  <Route path="/" element={<Home />} />
</Routes>
```

### Link / NavLink

- `<a>` 대신 사용하는 내부 이동 링크
- 전체 새로고침 없이 페이지 전환 가능

```jsx
<Link to="/about">About</Link>
```

- `NavLink`는 현재 경로일 때 스타일링을 다르게 줄 수 있음

### useNavigate

- 코드로 페이지 이동 (예: 버튼 클릭 이벤트에서 사용)

```jsx
const navigation = useNavigate();
navigate("/about");
```

### useParams

- URL에 포함된 동적 파라미터 가져오기

```jsx
<Route path="/user/:id" element={<User />} />;

// User 컴포넌트
const { id } = useParams();
```

### useLocation

- 현재 URL 정보(경로, 쿼리스트링 등)를 가져오기

## 간단 예시

#### v5 (Switch 사용)

```jsx
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
```

#### v6 (Routes 사용)

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId" element={<Coin />} />
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 정리

- `react-router-dom`은 SPA에서 URL을 기반으로 **열 페이지처럼 보이게하는 핵심 라이브러리**
- BrowserRouter: 앱 전체 라우팅을 관리하는 최상위 컴포넌트
- Switch (v5) -> Routes (v6) : 여러 Route 중 하나만 렌더링
- 자주 쓰는 훅: `useNavigation`, `useParams` , `useLocation`

### 요약

"**BrowserRouter**로 전체 앱을 감싸고, **Routes/Route**로 경로별 컴포넌트를 매핑한다. v5는 Switch, v6는 Routes를 사용한다."
