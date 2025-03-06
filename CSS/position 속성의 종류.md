# position 속성의 종류

`position` 속성은 요소의 배치 방법을 결정하는 중요한 속성이다. 주요 값으로 `static`, `relative`, `absolute`, `fixed` 등이 있다.

## 1. position: static (기본 값)

- 모든 HTML 요소의 기본값이다.
- 부모 요소의 흐름(문서의 기본 배치 순서)에 따라 배치된다.
- `top`, `left`, `right`, `bottom` 속성이 적용되지 않는다.

**📌 즉, 따로 위치를 조정하지 않는 기본 배치 방식입니다.**

---

## 2. position: relative (상대 위치)

- 자기 자신의 원래 위치를 기준으로 이동한다.
- `top`, `left`, `right`, `bottom` 속성을 사용하여 현재 위치에서 상대적으로 이동 할 수 있다.
- 원래 자리를 차지하고 있으므로, 요소를 이동시켜도 기존 공간은 그대로 유지된다.

#### 📌 사용 예시

```css
.box {
  position: relative;
  top: 20px;
  left: 10px;
}
```

- 원래 자리에서 아래로 20px, 오른쪽으로 10px 이동하지만, 원래 위치의 공간은 그대로 남아 있음.

---

## 3. position: absolute (절대 위치)

- 부모 요소 중 가장 가까운 `position: relative`` 를 가진 요소를 기준으로 위치를 결정한다.
- 만약 `relative` 부모가 없다면 `body` 를 기준으로 한다.
- `top`, `left`, `right`, `bottom` 속성을 사용하여 정확한 위치를 설정할 수 있다.
- 문서의 흐름에서 제거되므로, 원래 있던 공간 차지 X

#### 📌 사용 예시

```css
.container {
  position: relative;
  width: 300px;
  height: 300px;
}

.box {
  position: absolute;
  top: 50px;
  left: 30px;
}
```

- `box`는 `container`를 기준으로 `top: 50px, left: 30px` 위치에 배치된다.

---

## 4. position: fixed (고정 위치)

- 뷰포트(브라우저 창)을 기준으로 고정된다.
- 스크롤을 해도 위치가 변하지 않는다.
- `top`, `left`, `right`, `bottom` 속성을 사용하여 위치를 결정한다.

#### 📌 사용 예시

```css
.box {
  position: fixed;
  top: 0;
  right: 0;
  width: 100px;
  height: 50px;
  background-color: red;
}
```

- 화면의 오른쪽 상단에 고정되어 스크롤을 내려도 계속 같은 위치에 머문다.

---

## **📌 `relative` vs `absolute` 정리**

| 속성       | 기준                                        | 원래 공간 유지 여부 | 주요 사용 예                               |
| ---------- | ------------------------------------------- | ------------------- | ------------------------------------------ |
| `relative` | 자기 자신의 원래 위치                       | **유지됨**          | 요소의 위치를 약간 조정할 때               |
| `absolute` | 가장 가까운 `relative` 부모 (없으면 `body`) | **유지되지 않음**   | 특정 부모 안에서 요소를 자유롭게 배치할 때 |

✅ **`relative`는 원래 자리를 차지하지만, `absolute`는 문서의 흐름에서 제거된다.**

---

### **📝 요약**

- `static`: 기본값 (위치 조정 불가)
- `relative`: 원래 위치를 기준으로 이동 (공간 유지됨)
- `absolute`: `relative` 부모를 기준으로 배치 (공간 제거됨)
- `fixed`: 화면(뷰포트)에 고정 (스크롤 영향 없음)

💡 `relative`와 `absolute`가 가장 자주 사용되며, 특히 `absolute`는 **레이아웃을 정밀하게 조정할 때 필수적**이다.
