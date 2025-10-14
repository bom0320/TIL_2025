# Animated API DeepDive_01

## Animated API 란?

Animated API 란 React Native의 **다양한 애니메이션 및 상호작용 패턴을 효율적으로 구현하기 위해 제공되는 내장 라이브러리**이다.

> 즉 내장 라이브러리이기 때문에 React Native 프로젝트를 생성할 때 이미 기본으로 포함되어 있는기능이기에, 별로도 설치가 필요 없다.

선언적인 방식을 사용하여 애니메이션을 표현하며, 애니메이션 동작을 제어하는 핵심적인 기능을 담당한다.

## 몇가지 규칙

Animated API 를 효율적으로 사용하기 위해 몇 가지 규칙이 있다.

### 첫번째, Animated API 를 통해서만 값을 수정하고 초기화 한다.

즉, useState 혹은 임의 변수를 담아서 직접 수정, 초기화하지 않는다.

**값을 선언하는 두 가지 유형**

- Animated.Value() → single Value
- Animated.ValueXY() → vector Value

`Animated.Value()` 는 단일값에(예: $100)을, `Animated.ValueXY()` 는 두 개의 값(x와 y좌표)를 가진 벡터 값을 관리하는데 사용 된다. `Animated.Value` 는 단일 속성(예: 투명도, 크기)을 애니메이션할 때 사용되며, `Animated.ValueXY` 는 두 축으로 움직이는 애니메이션(예: 패닝, 드래그)을 위해 사용된다.

**Animated 세 가지 유형의 애니메이션**

- Animated.spring()
  - 스프링처럼 통통 튀는 물리적 형태의 애니메이션
- Animated.decay()
  - 초기 속도에서 시작하며 천천히 정지하는 형태의 애니메이션
- Animated.timing()
  - 가장 많이 사용되는 애니메이션, 시간에 따라 값을 천천히 업데이트하여 적용하는 애니메이션

```ts
const singlePosition = new Animated.Value(0);
const vectorPosition = new Animated.ValueXY({ x: 0, y: 0 });

const singleAnimated = () => {
  // start() 속성을 호출하여 애니메이션 시작.
  Animated.timing(singlePosition, {
    // 애니메이션 최종 값
    toValue: 200,
    useNativeDriver: true,
  }).start();
};

const vectorAnimated = () => {
  // start() 속성을 호출하여 애니메이션 시작
  Animated.timing(vectorPosition, {
    toValue: {
      x: 200,
      y: 150,
    },
    useNativeDriver: true,
  }).start();
};
```

### 두 번째, useRef Hook과 함께 사용

useState와 함께 사용시, state값이 초기화 되면 React는 re-render가 일어나는데, 이때 Component의 life time 동안은 value 값을 다시 초기화하지 않고 유지하게 해준다. (current 속성으로 지정된 인수로 초기화하고, Component의 life time 동안 유지)

예제 코드

```ts
const [isFinish, setIsFinish] = useState(false);
// 기존 선언 방식은 "setIsFinish" 를 통해 state 가 변경되면, React는 re-render되어,
// 다시 선언 코드를 실행하는 문제점이 있다.
// const singlePosition = new Animated.Value(0);
const singlePosition = useRef(new Animated.Value(0)).current;

const singleAnimated = () => {
    // start() 속성을 호출하여 애니메이션 시작
    Animated.timing(singlePosition, {
        toValue: 200,
        useNativeDriver: true
    }).start(({finish} => {
        // 애니메이션이 끝나면 호출되는 callback 예시
        // state 변경
        setIsFinish(true);
    }));
}
```

### 세 번째 Animatable Components 로만 애니메이션 효과를 넣을 수 있다.

흔히 사용하는 View 나 FlatList 같은 일반 components 로는 애니메이션 효과를 넣을 수 없다.

**Animatable components**

- Animated.Image
- Animated.ScrollView
- Animated.Text
- Animated.View
- Animated.FlatList
- Animated.SectionList

위 목록 외에 다른 component로 애니메이션 효과를 넣고 싶다면, Animated. createAnimatedComponent() 를 이용하여 Animatable component 로 만들 수 있다.

Example Code (with styled-component)

```ts
// createAnimatedComponent 를 호출하여 Animatable Component 로 선언.
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

// createAnimatedComponent 를 호출하여 Animatable component 로 선언 (with styled-component)
const Box = styled.View`
  flex: 1,
  justify-content: center;
  align-items: center;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  return (
    {/*Animatable Component 사용*/}
    <Animated.View>
      <Text>예제 코드</Text>
    </Animated.View>

    <AnimatedTouchableOpacity />

  <Box />
  )
}
```

## +Animated API 의 한계와 Reanimated

기존 Animated API 는 간단한 애니메이션에는 효과적이지만, 복잡한 제스처 기반 애니메이션이나 동기화된 애니메이션을 구현하는 데에는 한계가 있다.

이러한 한계점을 극복하기 위해 **`react-native-reanimated`** 와 같은 외부 라이브러리가 등장했다.

`react-native-reanimated` 는 Animate API 의 모든 기능을 지원면서, JS 스레드와 UI 스레드 간의 통신 오버헤드르 줄여 더 부드럽고 강력한 애니메이션을 구현할 수 있도록 한다. 현재 대부분의 복잡한 애니메이션 작업에는 `react-native-reanimated` 가 권장된다고 한다.
