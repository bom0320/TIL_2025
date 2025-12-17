# useId를 간단하게 알아보자

```js
const id = useId();
```

- useId 훅은 매개변수는 사용하지 않는다.
- 고유 ID 문자열을 반환한다.
- useId는 컴포넌트 최상단 혹은 훅에서만 호출이 가능하다.
- 리스트의 key로 사용하면 안된다.

## useId 사용해보기

```js
import { useId } from "react";

const Input = ({ labelText }) => {
  return (
    <div>
      <label htmlFor="inputId">{labelText}</label>
      <input id="inputId" type="text" />
    </div>
  );
};

export default function Form() {
  return (
    <form>
      <Input labelText={"User Name: "} />
      <Input labelText={"User Email: "} />
      <Input labelText={"User PassWord: "} />
    </form>
  );
}
```

- Input 컴포넌트에서 label과 Input 을 연결시켜 사용하려고 id를 동일하게 설정했다.
- 하지만 Input 컴포넌트를 여러 개 사용하게 된다면 한 컴포넌트 안에 동일한 id를 가진 컴포넌트가 여러 개가 되고, 아래 그림과 같이 label을 눌러도 첫 번째 label 과 연결된 input에만 focus가 잡히게 된다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FXFPHG%2FbtsrcrduETe%2FAAAAAAAAAAAAAAAAAAAAAHKJlJG89z_vPLJhknG3tMlvfGoZKtkq2OK285vCh6qY%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3D%252FcKo8VhV6qasxsGaFj2qBMKAMjI%253D)
userId를 사용하지 않았을 때

```js
import { useId } from "react";

const Input = ({ labelText }) => {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{labelText}</label>
      <input id={id} type="text" />
      {id}
    </div>
  );
};

export default function Form() {
  return (
    <form>
      <Input labelText={"User Name: "} />
      <Input labelText={"User Email: "} />
      <Input labelText={"User PassWord: "} />
    </form>
  );
}
```

문제를 해결하기 위해 useId를 사용해서 만들어진 고유한 id를 htmlFor(레이블을 특정 입력 필드에 연결해주는 속성)와 id 속성에 넣었다.

이젠 다른 label을 눌러도 이어져 있는 옆 input에 정확하게 focus가 잡히게 된다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fl7bJ3%2Fbtsrcu2nIxH%2FAAAAAAAAAAAAAAAAAAAAAAQ76X-vSMRfc3hN818ILlzf3bPjXJPEbRf2HfMGggdd%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3D7pRZaES4fpDTHJW9jNC8UIWm6Zo%253D)
