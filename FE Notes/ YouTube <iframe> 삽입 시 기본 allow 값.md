 YouTube `<iframe>` 삽입 시 기본 allow 값
===

## 📌 YouTube `<iframe>` 삽입 시 기본 allow 값

```html

allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowFullScreen

```

✔ 유튜브 영상 기능 제대로 작동하려면 이걸 그냥 **복붙**해서 쓰면 됨

✔ 특히 **autoplay**, **picture-in-picture**, **전체화면 전환**을 위해 필요함

---

## ✅ 언제 그냥 복붙해도 되나?

- 개인 프로젝트나 포트폴리오
- 유튜브 영상 그냥 잘 나오게 하고 싶을 때

👉 그냥 복붙해서 써도 **거의 문제 없음**

---

## ❗언제 수정하거나 조절할까?

- 보안이 중요한 **회사/팀 프로젝트**
- autoplay, 센서 같은 기능이 **필요 없는 경우**
- 유튜브가 아닌 **다른 서비스**를 iframe으로 넣을 때

---

## 💡 기억해두기

- `allow`는 iframe 안에서 어떤 기능을 쓸 수 있는지 브라우저에 **허락해주는 것**
- `allowFullScreen` 없으면 유튜브 영상 **전체화면 버튼이 안 먹힘!**

---
