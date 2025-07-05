# 제너릭이란 (Generic)

제너릭은 **“데이터 타입을 나중에 결정할 수 있는 함수나 타입”**이다.

```tsx
function identifity<T>(value: T) : {
	return value;
}

identity<number>(123); // number로 동작
identity<string>("hello"); // string 으로 동작
```

**Dispatch<T>**

어떤 값을 “보낸다(전달한다)”는 의미의 제너릭 타입 함수

**SetStateAction<T>**

상태를 어떻게 바꿀지 정의하는 타입 (값 자체 or 이전 값 기반 함수)
