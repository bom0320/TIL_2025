# transition 애니메이션과 같이 사용되는 transition 속성 전환

transition은 애니메이션 효과를 적용할 때 애니메이션 효과가 일정 시간에 걸쳐서 다양한 방법으로 진행 되도록 하는 것이다.

기본 형식은 아래와 같다.

```
transition : property duration timingfunction delay;
```

## transition 속성

### 📍 transition-property

원하는 애니메이션 시킬 속성을 입력한다. (color, background-color, border-radius, position...)

### 📍 transition-duration

애니메이션 효과가 몇초동안 실행될지, 시작해서 끝날때까지 시간을 밀리초(ms) 초(s) 단위로 설정한다.

### 📍 transition-timingfunction

애니메이션이 적용되는 속도를 지정한다. (linear, ease(기본값), ease-in, ease-out, ease-in-out)

### 📍 transition-duration

애니메이션 효과가 몇초 지난 후 작동 할지 설정한다.

## timing-function

**transition-timing-function: linear;** -> 등속

**transition-timing-function: ease;** -> 느리게 시작했다가 빨라졌다가 다시 느려짐

**transition-timing-function: ease-in;** -> 점점 빨라짐

**transition-timing-function: ease-in-out;** -> 처음과 끝이 느림

**transition-timing-function: ease-out;** -> 점점 느려짐

---

[출저](https://carina16.tistory.com/50)
