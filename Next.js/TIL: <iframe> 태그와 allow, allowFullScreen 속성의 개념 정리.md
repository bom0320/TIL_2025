TIL: `<iframe>` 태그와 allow, allowFullScreen 속성의 개념 정리
===


### 1. 📺 `<iframe>` 태그란?

> <iframe>은 다른 웹페이지나 콘텐츠(예: 유튜브 영상, 지도 등)를 내 웹페이지 안에 삽입할 수 있는 HTML 태그이다.
> 

iframe = **inline frame**

쉽게 말해, 내 웹페이지 안에 **‘작은 창문’을 만들어 다른 웹페이지를 끼워 넣는 느낌**!

```html
<iframe src="https://example.com" width="600" height="400"></iframe>
```

이 코드는 내 웹사이트 안에 `https://example.com` 페이지를 **600x400 사이즈**의 박스로 띄운다.

---

### 2. 🛡️ `allow` 속성 – iframe 안에서 허용할 기능들

> 보안상의 이유로 브라우저는 iframe 안에서 자동재생, 센서 접근, 클립보드 등 일부 기능을 기본적으로 차단한다.
> 
> 
> `allow` 속성은 **이런 기능들을 명시적으로 허용해주는 속성**이다.
> 

### ✅ 자주 쓰이는 기능들

| 옵션 | 설명 |
| --- | --- |
| `autoplay` | 영상 자동 재생 허용 |
| `clipboard-write` | 클립보드 복사/붙여넣기 허용 |
| `picture-in-picture` | PIP 모드 (작은 화면 모드) 허용 |
| `encrypted-media` | DRM 보호 콘텐츠 사용 허용 |
| `accelerometer` | 가속도 센서 허용 |
| `gyroscope` | 자이로스코프 센서 허용 |

```html
<iframe src="https://youtube.com/embed/abc123"
  allow="autoplay; clipboard-write; picture-in-picture"
></iframe>
```

---

### 3. 🔲 `allowFullScreen` 속성 – 전체 화면 허용

> 기본적으로 <iframe>은 전체화면 모드를 허용하지 않음.
> 
> 
> 전체화면 전환을 가능하게 하려면 `allowFullScreen` 속성을 명시적으로 추가해야 한다.
> 

```html
<iframe src="https://youtube.com/embed/abc123"
  allowFullScreen
></iframe>
```

---

### 4. ❌ 만약 `allow`, `allowFullScreen`을 안 쓰면?

- 유튜브 영상이 자동재생 ❌
- 전체 화면 버튼 작동안 함 ❌
- 작은 화면으로 띄우기(PIP 모드) ❌
- 클립보드 기능 제한 ❌
    
    → 사용자 경험이 **크게 저하됨**
    

---

### 5. ✅ 실제 예시

```tsx
<iframe
  key={video.id}
  src={`https://youtube.com/embed/${video.key}`}
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  title={video.name}
/>
```

---

## 🧠 요약

- `<iframe>`은 외부 콘텐츠를 삽입하는 HTML 태그
- `allow`는 보안상의 이유로 차단된 기능들을 허용
- `allowFullScreen`은 전체화면 전환 허용
- 유튜브, 지도, 게임 등 외부 콘텐츠를 넣을 때 필수적으로 사용됨

---