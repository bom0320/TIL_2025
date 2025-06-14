Mount, Update, Unmount
===

| 단계 | 의미 | 예시 코드 |
| --- | --- | --- |
| Mount | 처음 컴포넌트가 나타날 때 | `useEffect(() => {}, [])` |
| Update | 상태나 props가 바뀔 때 | `useEffect(() => {}, [deps])` |
| Unmount | 컴포넌트가 제거될 때 | `useEffect(() => return () => {}, [])` |