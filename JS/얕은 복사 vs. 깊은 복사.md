### 얕은 복사(Shallow Copy) vs 깊은 복사(Deep Copy)

객체를 복사할 때 **얕은 복사**는 **한 단계만 복사**하고 내부 객체까지는 복사하지 않아서 여전히 참조가 남는다.

반면 **깊은 복사**는 **중첩된 모든 객체까지 완전히 복사**한다.

```jsx
const original = { info: { name: "봄" } };
const shallow = { ...original };

shallow.info.name = "여름";
console.log(original.info.name); // '여름' (얕은 복사라서 영향 받음)

const deep = structuredClone(original);
deep.info.name = "가을";
console.log(original.info.name); // '여름' (깊은 복사라서 영향 없음)
```

🧠 **추가 팁**:

- `structuredClone()`은 최근 브라우저에서 사용 가능
- 또는 `lodash.cloneDeep()` 사용 가능 (라이브러리)
