TIL - Controlled vs Uncontrolled Component in React
===

### 🧠 오늘 배운 내용

### 🔹 Controlled Component (제어 컴포넌트)

- **React의 상태(state)가 input 값을 제어하는 방식**.
- 입력값이 `useState` 같은 hook에 의해 관리됨.
- 즉, 사용자가 입력한 값이 컴포넌트의 상태로 저장되고, 이 상태를 기반으로 `input` 요소의 value가 바뀐다.
- 대표 예:
    
    ```jsx
    
    const [value, setValue] = useState("");
    <input value={value} onChange={(e) => setValue(e.target.value)} />
    
    ```
    

### 🔹 Uncontrolled Component (비제어 컴포넌트)

- **DOM 자체가 값을 관리하는 방식**.
- React state가 아닌, `ref`를 통해 DOM에 직접 접근해서 값을 가져온다.
- input의 value를 별도로 state로 저장하지 않기 때문에 코드가 간결할 수 있으나, 제어가 어려움.
- 대표 예:
    
    ```jsx
    
    const inputRef = useRef(null);
    const handleSubmit = () => {
      console.log(inputRef.current.value);
    };
    <input ref={inputRef} />
    
    ```
    

---

### ✅ 내가 이해한 핵심 포인트

- 제어 컴포넌트는 **React 중심**, 비제어 컴포넌트는 **브라우저 DOM 중심**.
- 일반적으로 **제어 컴포넌트 사용이 권장됨**, 특히 폼 검증이나 동기화된 상태 처리가 필요한 경우.
- 단, 간단한 input 처리나 성능 이슈가 있는 경우 비제어 방식도 고려할 수 있음.

---

### 💡 개인적인 느낀 점

React를 쓰면서 아무 생각 없이 `useState`로 input 값을 관리했는데, 이게 제어 컴포넌트였다는 걸 오늘 처음 명확히 알게 됐다. 앞으로 폼 처리할 때 어떤 방식이 더 적합한지 의식적으로 선택할 수 있을 것 같다!