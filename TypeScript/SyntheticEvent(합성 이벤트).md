SyntheticEvent(합성 이벤트)
===

### ✅ 1. **SyntheticEvent란?**

React에서는 브라우저의 기본 이벤트 객체(native event object)를 **감싸는 형태의 래퍼(wrapper)**로 `SyntheticEvent`를 사용해.

즉, **브라우저 간의 차이를 없애고 동일한 방식으로 이벤트를 처리할 수 있게 해주는 통일된 이벤트 객체**야.

> 이걸 사용하는 이유는?
> 
- 크로스 브라우징 문제를 해결하기 위해
- React에서 이벤트를 **버블링(전파)** 방식으로 처리하기 위해
- React가 이벤트를 내부적으로 효율적으로 관리하기 위해

---

### ✅ 2. **SyntheticEvent의 특징**

- React가 자체적으로 만든 일종의 이벤트 "껍데기" 객체
- `e.preventDefault()`, `e.stopPropagation()` 등 일반 DOM 이벤트처럼 사용 가능
- 모든 이벤트 핸들러 함수에서 첫 번째 인자로 받게 됨:
    
    ```tsx
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault(); // 정상적으로 동작함
    };
    
    ```
    

---

### ✅ 3. **React 이벤트 종류**

React는 DOM의 여러 이벤트들을 대응하는 props 형태로 제공해. 대표적인 이벤트들을 분류해볼게:

### 🎹 Keyboard Events

키보드를 누를 때 발생하는 이벤트들

- `onKeyDown`: 키가 눌릴 때
- `onKeyPress`: (거의 안 씀. 이제는 deprecated됨)
- `onKeyUp`: 키에서 손을 뗄 때

### 🧠 Focus Events

포커스가 생기거나 사라질 때

- `onFocus`: 요소가 포커스를 얻을 때
- `onBlur`: 요소가 포커스를 잃을 때

> input, button, textarea 등에서 자주 사용됨
> 

### 📝 Form Events

폼 관련 이벤트들

- `onChange`: 값이 바뀔 때 (input, select 등)
- `onInput`: 입력이 일어날 때
- `onSubmit`: 폼 제출 시
- `onReset`: 폼 리셋 시
- `onInvalid`: 폼 유효성 검사 실패 시

### 📦 Generic Events

그 외 자주 쓰이는 이벤트들

- `onClick`: 클릭할 때
- `onLoad`: 요소 로딩 완료 시 (예: 이미지 로드)
- `onError`: 로딩 중 오류 발생 시

---

### ✅ 4. 사용 예시

```tsx

function MyForm() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value); // input의 현재 값
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼의 기본 제출 동작 방지
    console.log("Form submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

```

---

### ✅ 5. React 이벤트 vs 브라우저 이벤트

| 항목 | React SyntheticEvent | 브라우저 DOM Event |
| --- | --- | --- |
| 일관성 | 있음 (크로스 브라우징) | 없음 (브라우저마다 다름) |
| 퍼포먼스 | React 내부에서 관리 | 직접 브라우저에 이벤트 바인딩 |
| 메모리 관리 | 자동으로 풀림 (event pooling)* | 직접 관리 필요 |

> * event pooling은 최신 React에서는 제거됨 (v17부터). 걱정 안 해도 됨.
>