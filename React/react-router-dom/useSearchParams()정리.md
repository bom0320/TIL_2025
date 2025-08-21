# useSearchParams() 에 대한 정리

## useSearchParams()

- 현재 위치의 쿼리 매개변수(쿼리 문자열)에 대한 데이터를 읽고 수정하는데 사용하는 리액트 라우터 돔에서 제공하는 훅이다.
- 즉 한마디로 현재 URL의 쿼리 스트링을 가져오는 훅이다.

- 참고) 쿼리 문자열과 쿼리 매개변수를 혼용해서 사용하고 있는데, 둘 다 같은 말이다.

## 사용 예시

- 리액트의 useState 훅과 유사하게 두 개의 변수를 제공하는데,
- 하나는 **쿼리 매개변수의 데이터가 담겨 있는** searchParams 변수이고, 두 번째는 **쿼리 매개변수를 개발자 혹은 사용자가 직접 지정할 수 있는** setSearchParams 함수를 제공한다.

- searchParams 변수에는 현재 쿼리 문자열이 {key:value} 형식으로 저장되어 있으며, get 메서드에 '키'를 전달하면 해당 키의 value를 읽어서 출력해준다.

예를 들어 브라우저 주소가 이렇게 되있다고 해보자:

```bash
http://localhost:3000/search?q=apple&category=fruits
```

```js
import * as React from "react";
import { useSearchParams } from "react-router-dom";

let [searchParams, setSearchParams] = useSearchParams();
console.log(searchParams.get("q")); // 출력: "apple"
console.log(searchParams.get("category")); // 출력: "fruits"
```

즉, `q=apple` , `category=fruits` 라는 쿼리스트링이 들어있는것이다.

## 활용예시

사용법에 따라 다양하게 활용이 가능하지만, 대표적인 방식으로 3가지가 있다.

### 1) 검색기능 구현

아래는 단순하게 구성되어 있지만, 서버에 get 요청을 보낼 때 사용자가 검색창에 입력한 데이터를 쿼리 문자열에 포함시켜 보내면 해당 쿼리 문자열에 대한 검색 결과를 렌더링하는데 활용할 수 있다.

```js
import * React form "react";
import { useSearchParams } from "react-router-dom";

function SearchResults() {
    let [searchParams] = useSearchParams();

}
```

---

### 2) 필터링 및 정렬

이 또한 위 검색 기능과 마찬가지로 사용자가 선택한 카테고리에 대한 데이터를 쿼리 문자열의 값으로 전달하여 서버에 데이터를 요청하면 해당 기준에 따라 정렬된 데이터를 불러올 수 있도록 로직을 구성할 수 있다.

```js
import * as React from "react";
import { useSearchParams } from "react-router-dom";

function ProductList() {
  let [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const sortBy = searchParams.get("sort");

  // 필터링 및 정렬된 상품 목록을 가져오는 로직 작성

  function handleCategoryChange(event) {
    setSearchParams({ category: event.target.value });
  }

  function handleSortChange(event) {
    setSearchParams({ sort: event.target.value });
  }

  return (
    <div>
      <h1>Product List</h1>
      <div>
        <label>
          Category:
          <select value={category} onChange={handleCategoryChange}>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Sort By:
          <select value={sortBy} onChange={handleSortChange}>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>
      {/* 필터링된 및 정렬된 상품 목록을 렌더링하는 로직 */}
    </div>
  );
}
```

### 3) 공유 URL 생성

searchParams 는 **현재 위치에 대한 쿼리 문자열 정보**를 가지고 있는 변수이므로 해당 변수의 데이터를 toString() 메서드를 사용해 문자열로 변환할 수 있다.

또한 window.location.origin 은 도메인 주소(ex. duklook.tistory.com)를 가지고 있으므로 이 둘을 합치게 되면, 온전한 URL을 얻을 수 있다.(ex.https://duklook.tistory.com/manage/newpost/?type=post)

따라서 이를 활용하면 사용자 공유 버튼을 클릭하여, 해당 url이 클립 보드에 복사되는 기능을 만들어, 링크 공유등의 다양한 목적에 따라 활용이 가능해진다.

```js
import * as React from "react";
import { useSearchParams } from "react-router-dom";

function ShareablePage() {
    let [searchParams] = useSearchParams();

    // URL 검색 매개변수를 기반으로 특정 상태를 설정하는 로직 작성

    const handleShareButtonClick = () => {
        cont url = `${window.location.origin}?${searchParams.toString()}`;
        navigator.clipboard.writeText(url); // -> 클립보드에 url 을 복사한다.
        // URL을 클립보드에 복사하거나 공유하는 로직
    };

    return (
        <div>
            <h1>Shareable Page</h1>
            <p>This is a shareable page with customizable parameters.</p>
            <button onClick={handleShareButtonClick}>Copy URL to Share</button>
        </div>
    )
}
```
