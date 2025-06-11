TIL – 모바일 vs 데스크탑에서의 Navigation 구현 방식 정리
===

## 개요
React + Tailwind 기반의 `main-nav.tsx` 컴포넌트에서, 모바일과 데스크탑은 서로 다른 방식으로 Navigation UI 를 구현하고 있다. 
그리고 그 차이와 이유를 명확이 이해하고자 다음과 같은 포스터를 작성하였다.

## 💻 데스크탑 nav 구현 방식

### 사용 구조

```tsx
{items?.length ? (
  <nav className="hidden gap-6 md:flex">
    {items.map((item) => (
      <Link href={item.href}>...</Link>
    ))}
  </nav>
) : null}
```

### 해석
- `md:flex` 는 데스크탑(medium ≥ 768px) 이상일 때만 메뉴 보이게 함
- `hidden` : 기본은 숨김 (모바일에서는 안 보이도록)
- 메뉴 항목은 `<Link>` 컴포넌트로 직접 나열
- 별도 state 관리 없이 항상 보이는 수평 메뉴

---

## 📱 모바일 nav 구현 방식

### 사용 구조

```tsx
<button className="md:hidden" onClick={...}>
  {showMobileMenu ? <Icons.close /> : <Icons.logo />}
  <span>Menu</span>
</button>

{showMobileMenu && items && (
  <MobileNav items={items}>{children}</MobileNav>
)}
```

### 해석
- `md: hidden` : 데스크탑에서는 버튼 안 보이고, 모바일에서만 보임
- 햄버거 버튼 클릭 시 `showMobileMenu` 상태를 토글
- `showMobileMenu === true` 일 때만 `<MobileNav>` 렌더링
- `<MobileNav />` 는 전체 화면을 덮는 오버레이 메뉴

## 📊 비교 요약

| 항목 | 💻 데스크탑 | 📱 모바일 |
| --- | --- | --- |
| 렌더링 방식 | `<nav>` + `<Link>` | `<button>` + `<MobileNav>` |
| 상태 관리 | ❌ 없음 (항상 보임) | ✅ 있음 (`useState`) |
| 표시 조건 | `md:flex` 이상 | `md:hidden` 이하 |
| UI 형태 | 수평 메뉴바 | 오버레이(전체화면) 메뉴 |
| 사용자 조작 | 별도 조작 없음 | 햄버거 버튼 클릭 필요 |

---

## 🎯 결론

> 반응형 디자인에서 Navigation은 단순히 숨기고 보이는 걸 넘어서,
> 
> 
> **기기 환경에 맞는 UX 구조 자체를 바꿔야 한다.**
> 
> 데스크탑은 공간이 넓으므로 메뉴를 펼쳐두고,
> 
> 모바일은 공간이 좁기 때문에 **토글 기반의 오버레이 메뉴**로 구현하는 것이 표준 패턴이다.
>