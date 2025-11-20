## 클래스(Class)란

**객체를 만드는 틀(설계도)**다.

비유를 하면, 붕어빵 틀이 클래스, 틀로 찍혀나온 붕어빵이 객체(인스턴스)라고 할 수 있다.

### ex.

```tsx
// 클래스 (설계도)

class Cat {
  name: string; // Cat이라는 설계도가 가진 속성중 하나
  // 이 Cat으로부터 만들어질 모든 고양이는 name이라는 문자열 속성을 가진다.

  // 고양이를 만들 때 실행되는 함수 -> 초기값 설정하는 구간
  constructor(name: string) {
    this.name = name;
    // this.name : 이 객체가 가진 name 속성
    // name : constructor의 매개변수
  }

  // 메서드
  // meow()가 실행되면 작동
  meow() {
    console.log(this.name + "says meow!");
  }
}
```

```tsx
const cat1 = new Cat"나비");
const cat2 = new Cat("보리");

cat1.meow(); // 나비 says meow!
cat2.meow(); // 보리 says meow;
```

- **class Cat**
  - 고양이가 어떤 속성을 가지고 어떤 행동을 하는지를 정의하는 설계도
- **new Cat(”나비”)**
  - 설계도로 “나비”라는 고양이 객체를 찍어낸 것

## 기억 하자

1. class
   - 설계도
2. **constructor()**
   - 객체가 만들어 질 때 실행되는 함수
   - 여기에서 초기 값 지정
3. 속성(property)
   - 고양이가 가진 정보
4. **메서드(method)**
   - 클래스가 가진 기능 (행동)
   - 고양이가 할 수 있는 행동 (`meow()`)
