TAXONOMY
===

## 🔫 (docs)

- 보통 글 리스트나 포스트 보기 등, 콘텐츠 중심 구조가 들어가 있다.

### 🪜 **공부 진입 루트 추천**

| 순서 | 할 일 | 이유 |
| --- | --- | --- |
| 1 | `(docs)` 폴더 열어보기 | 보통 글 리스트나 포스트 보기 등 **콘텐츠 중심 구조**가 들어가 있어 |
| 2 | 그 안의 `page.tsx`, `layout.tsx`, `loading.tsx` 등 분석 | FSD 구조에서 실제 화면이 어떻게 조립되는지 이해 가능 |
| 3 | 그 화면에서 어떤 `components/`, `widgets/`, `features/`, `entities/`를 사용하는지 따라가보기 | 데이터 → 로직 → UI 흐름 파악 |
| 4 | 하나하나 `tsx` 열면서 `props`, import, hook 흐름 관찰 | “아 이렇게 구성하면 되겠구나” 감 잡기 |

---

## 🔫  docs/layout.tsx

**문서 페이지 전체에 공통적으로 적용되는 레이아웃**을 담당하고 있고,

FSD 아키텍처 구조에서**“외부 UI 묶음 + 탐색 메뉴 + 검색 + 푸터까지”를 제공하는 핵심 레이아웃**

---

## 🔫  Config Folder 란

Config란 configuration(환경 설정)을 줄인 말이다.

**프로그램의 매개 변수가 초기 설정 등을 구성하는 데 사용하기 때문에, 설정이나 프로그램의 실행 일부 등을 저장해 둔 파일**이다.

config 파일은 주로 XML이나 JSON으로 저장

---

> config란 "구조, 설정, 구성 데이터를 정의한 객체"야.
> 
> 
> 그게 환경 설정이든, UI 구성 정보든, **코드에서 하드코딩하지 않고 외부로 뺀 정보**를 config라고 해.
> 

**🧠 2가지 의미로 나뉘는 “Config”**

| 구분 | 설명 | 예시 |
| --- | --- | --- |
| 1. **환경 설정용 config** | 시스템 환경, 비밀키 등을 담는 설정 | `.env`, `next.config.js`, `tsconfig.json`, `tailwind.config.js` |
| 2. **앱 구성 정보(config 객체)** | UI, 메뉴, 페이지 구성 정보를 담는 데이터 | `docsConfig.ts`, `siteConfig.ts`, `navConfig.ts` 등 |

---

### 프로퍼티(property)란

 **프로그래밍 언어에서 객체의 속성을 나타내는 용어**

프로퍼티는 "키(key)" : "값(value)" 형식으로 표현된다.

 

### React.ReactNode란

React에서 컴포넌트가 받을 수 있는 모든 종류의 자식 요소(children)를 의미하는 타입(type). 쉽게 말하면, **JSX 안에 넣을 수 있는 거의 모든 것**을 포함한다.

![image.png](attachment:2d22fd1c-c3a8-4a9a-bb48-395e172081d3:image.png)

### useSelectedLayoutSegment()란

```tsx
const segment = useSelectedLayoutSegment()
```

- **좀 더 자세하게**
    
    `useSelectedLayoutSegment`는 **Next.js 13 이상(app 디렉토리 기반)**에서 사용되는 훅(Hook)으로, **현재 선택된 레이아웃의 URL 경로 세그먼트를 가져오는 데 사용**됩니다.
    
    ---
    
    ## ✅ 핵심 요약
    
    | 항목 | 설명 |
    | --- | --- |
    | 역할 | 현재 URL에서 선택된 layout segment(세그먼트)를 반환 |
    | 사용 대상 | `app/` 디렉토리 기반 프로젝트 |
    | 사용 예 | 탭 활성화 여부 판단, 현재 위치 기반 UI 표시 |
    
    ---
    
    ## 🧩 세그먼트(Segment)란?
    
    Next.js의 `app/` 디렉토리에서는 URL 경로의 각 부분을 **세그먼트(segment)**라고 부릅니다.
    
    예를 들어:
    
    ```
    bash
    복사편집
    /dashboard/settings
    
    ```
    
    - `dashboard` → 첫 번째 세그먼트
    - `settings` → 두 번째 세그먼트
    
    ---
    
    ## 📦 예시 코드
    
    ```tsx
    tsx
    복사편집
    'use client'
    import { useSelectedLayoutSegment } from 'next/navigation'
    
    export function MyTabs() {
      const segment = useSelectedLayoutSegment()
    
      return (
        <div>
          <button className={segment === null ? 'active' : ''}>홈</button>
          <button className={segment === 'profile' ? 'active' : ''}>프로필</button>
          <button className={segment === 'settings' ? 'active' : ''}>설정</button>
        </div>
      )
    }
    
    ```
    
    ### 🔍 설명:
    
    - `segment`는 현재 URL에서 선택된 세그먼트 값입니다.
    - `/dashboard/profile` → `segment`는 `'profile'`
    - `/dashboard` → `segment`는 `null`
    - 이걸 활용해 어떤 탭이 현재 활성화 상태인지 판단할 수 있습니다.
    
    ---
    
    ## 🧠 언제 사용하나요?
    
    - 레이아웃 내부에서 **현재 어떤 페이지가 활성화되었는지 구분**할 때
    - **탭형 UI**, **사이드바**, **헤더 네비게이션**에서 현재 위치 표시
    - 동적으로 스타일이나 렌더링을 조절할 때
    
    ---
    
    ## 🔄 관련 훅
    
    | 훅 | 설명 |
    | --- | --- |
    | `useSelectedLayoutSegments()` | 다중 세그먼트 배열을 반환 (`['dashboard', 'settings']` 등) |
    | `useParams()` | 현재 동적 라우팅 파라미터(`slug`, `id` 등)를 가져옴 |
    | `usePathname()` | 전체 경로(`/dashboard/settings`)를 문자열로 가져옴 |
    
    ---
    
    ## ❗주의사항
    
    - **Client Component**에서만 사용할 수 있어요. (`'use client'` 필요)
    - `useSelectedLayoutSegment`는 **레이아웃 구조에 따라 달라질 수 있는 값**이라 레이아웃의 하위 컴포넌트에서 쓰는 것이 일반적입니다.
    
    ---
    

### 유틸 함수란

**여러 곳에서 자주 쓰이는 간단한 기능을 따로 빼놓은 함수**이다.

- 즉, 반복적으로 쓰이는 **작은 도구(tool)** 같은 거라고 생각하면 된다.
- 어떤 특정한 화면이나 컴포넌트에만 쓰이는 게 아니라, 어디서든 필요하면 갖다 쓸 수 있는 보조 함수들이다.

### cn() 함수란

Tailwind CSS를 쓸 때 정말 자주 사용하는 유틸 함수

- **About clsx and twMerge**
    
    ## ✅ 1. `clsx` — className을 조건에 따라 **깔끔하게 합치기**
    
    ### 📌 하는 일
    
    - 문자열, 배열, 객체, 조건 등을 받아서 **className을 문자열로 정리**해줌
    - `false`, `null`, `undefined`는 자동으로 **무시**됨
    
    ### 📎 예시
    
    ```tsx
    
    clsx("a", false && "b", "c") // 결과: "a c"
    clsx("a", { b: true, c: false }) // 결과: "a b"
    clsx(["a", "b", false, null]) // 결과: "a b"
    
    ```
    
    ### 🔥 왜 좋아?
    
    조건 따라 className 넣을 때 `"${isActive ? 'active' : ''}"` 이런 거 안 써도 돼서 **깔끔**함
    
    ---
    
    ## ✅ 2. `twMerge` — Tailwind class끼리 **충돌 해결**
    
    ### 📌 하는 일
    
    - `Tailwind CSS` class가 겹칠 때, **나중에 있는 걸 살리고 앞의 걸 제거**해줌
    - 예를 들어 `p-2`랑 `p-4` 같이 있으면 → `p-4`만 남김
    
    ### 📎 예시
    
    ```tsx
    
    twMerge("p-2 p-4") // 결과: "p-4"
    twMerge("text-sm text-lg") // 결과: "text-lg"
    twMerge("bg-white bg-black") // 결과: "bg-black"
    
    ```
    
    ---
    
    ## ✅ 왜 둘을 같이 쓰는가?
    
    `clsx`는 조건부 class 정리만 해줄 뿐이고,
    
    **Tailwind에서 충돌나는 class는 그냥 다 남겨둬.**
    
    그래서 이걸 `twMerge`로 한번 더 정리해줘야 깔끔해지는 거야.
    
    ---
    
    ## ✅ 최종 예시
    
    ```tsx
    
    cn("p-2", isActive && "bg-blue-500", "p-4")
    
    ```
    
    ### 내부적으로는 이렇게 작동:
    
    1. `clsx(...)` → `"p-2 bg-blue-500 p-4"`
    2. `twMerge(...)` → `"bg-blue-500 p-4"` ← `p-2`는 충돌이라 제거됨
    
    ---
    
    ## 🔁 요약 비교
    
    | 항목 | clsx | twMerge |
    | --- | --- | --- |
    | 핵심 기능 | 조건부 class 병합 | Tailwind class 충돌 정리 |
    | 예시 | `clsx("a", isActive && "b") → "a b"` | `twMerge("p-2 p-4") → "p-4"` |
    | 역할 | 로직 중심 | Tailwind 스타일 정리 중심 |

### shadcn이란

Tailwind 기반의 Next.js UI 컴포넌트 템플릿을 내 프로젝트에 직접 복사해서 사용할 수 있도록 해주는 도구

[Build your Component Library - shadcn/ui](https://ui.shadcn.com/)

[shadcn](https://ui.shadcn.com/docs/cli)

```bash
 npx shadcn@latest init
```

---

## 🔫  main_nav의 UI 관련 유틸/컴포넌트

- **자세히**
    
    ## ✅ 1. `siteConfig.ts`
    
    ```tsx
    
    export const siteConfig = {
      name: "Taxonomy",
      description: "...",
      url: "...",
      links: {
        twitter: "...",
        github: "..."
      }
    }
    
    ```
    
    ### 📌 역할:
    
    - 사이트의 **메타 정보**를 담은 설정(config) 객체
    - `MainNav`, `Footer`, `SEO`, `head` 메타태그 등에 사용됨
    
    ### 📍 MainNav에서 사용된 부분:
    
    ```tsx
    
    <span>{siteConfig.name}</span>
    
    ```
    
    → `사이트 이름`을 UI에 표시
    
    ---
    
    ## ✅ 2. `cn` 유틸 함수 (utils.ts)
    
    ```tsx
    
    import { clsx } from "clsx"
    import { twMerge } from "tailwind-merge"
    
    export function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs))
    }
    
    ```
    
    ### 📌 역할:
    
    - 여러 `className`들을 조건에 따라 깔끔하게 조합해주는 유틸
    - Tailwind CSS와 함께 쓰기 최적화됨
    
    ### 예시:
    
    ```tsx
    
    className={cn("base-class", condition && "active", "text-sm")}
    
    ```
    
    - `condition`이 `true`면 `"active"` 클래스 포함
    - `false`면 생략됨
    
    → 결국 `cn()`은 `classnames` + `tailwind-merge` = **깔끔한 class 병합 도구**
    
    ---
    
    ## ✅ 3. `Icons` 객체 (icons.ts)
    
    ```tsx
    
    export const Icons = {
      logo: Command,
      close: X,
      gitHub: (props) => <svg ... {...props} />
    }
    
    ```
    
    ### 📌 역할:
    
    - 여러 **아이콘 컴포넌트를 키(key) 형태로 정리**
    - 사용 시 `Icons.logo`, `Icons.gitHub` 등으로 간편하게 접근 가능
    
    ### MainNav에서 이렇게 사용됨:
    
    ```tsx
    
    <Icons.logo />
    <Icons.gitHub />
    
    ```
    
    → 원하는 아이콘을 코드에서 일관되게 쓸 수 있도록 도와줌
    
    ---
    
    ## ✅ 4. `MobileNav.tsx`
    
    ### 📌 역할:
    
    - **모바일 화면에서 메뉴를 슬라이드 형태로 보여주는 컴포넌트**
    - props로 받은 `items` (MainNavItem[])을 map으로 렌더링
    
    ### 주요 코드 설명:
    
    ```tsx
    
    useLockBody()
    
    ```
    
    - 메뉴가 열릴 때, **배경 스크롤 잠금** (스크롤 막힘)
    
    ```tsx
    
    className="fixed inset-0 top-16 z-50 ..."
    
    ```
    
    - 메뉴는 화면에 고정되어 뜸
    - `slide-in-from-bottom-80`: 애니메이션 효과
    
    ```tsx
    tsx
    복사편집
    {items.map(...) => <Link>{item.title}</Link>}
    
    ```
    
    - `MainNavItem[]` 리스트를 세로로 렌더링
    
    ```tsx
    tsx
    복사편집
    {children}
    
    ```
    
    - 예: `<MainNav>...</MainNav>` 내부에 `<DocsSidebarNav />`를 넣으면 이 자리에서 함께 렌더링됨
    
    ---
    
    ## 🧩 연결된 흐름 정리
    
    ```tsx
    tsx
    복사편집
    // layout.tsx
    <MainNav items={docsConfig.mainNav}>
      <DocsSidebarNav items={docsConfig.sidebarNav} />
    </MainNav>
    
    ```
    
    ↓
    
    ```tsx
    tsx
    복사편집
    // MainNav.tsx
    <MobileNav items={items}>{children}</MobileNav>
    
    ```
    
    ↓
    
    ```tsx
    tsx
    복사편집
    // MobileNav.tsx
    {items.map(...)}, {children} 그대로 렌더링
    
    ```
    
    ---
    
    ## ✅ 마무리 요약
    
    | 파일명 | 역할 | MainNav에서의 쓰임 |
    | --- | --- | --- |
    | `siteConfig.ts` | 사이트 전역 정보 | 사이트 이름, 링크 |
    | `utils.ts` | class 병합 유틸 | Tailwind class 조합 |
    | `icons.ts` | 아이콘 모음 객체 | 로고, 메뉴 아이콘 |
    | `MobileNav.tsx` | 모바일용 메뉴 UI | 모바일에서 메뉴 출력 |
    
    ---
    

---

### lucide란

lucide는 feather-icons 기반으로 만들어진 **오픈소스 SVG 아이콘 라이브러리**이며, `lucide-react`는 이걸 React 컴포넌트로 사용할 수 있게 만든 버전이다.

아이콘 하나하나가 `React` 컴포넌트로 제공되기 때문에, `size`, `strokeWidth`, `className`, `color` 등 다양한 props로 커스터마이징이 가능하고, **Tree-shaking이 적용되어 사용한 아이콘만 번들에 포함되므로 성능도 좋다.**

`lucide-react`는 shadcn/ui, Tailwind 같은 최신 프레임워크와도 잘 어울린다.

---

## icons.tsx

lucid-react 라이브러리를 사용해, 여러 아이콘 컴포넌트를 키(key) 형태로 정리

- **자세히**
    
    ## ✅ 1. `lucide-react`에서 아이콘 가져오기
    
    ```tsx
    
    import {
      AlertTriangle,
      ArrowRight,
      Check,
      ChevronLeft,
      ChevronRight,
      Command,
      CreditCard,
      File,
      FileText,
      HelpCircle,
      Image,
      Laptop,
      Loader2,
      LucideProps,
      Moon,
      MoreVertical,
      Pizza,
      Plus,
      Settings,
      SunMedium,
      Trash,
      Twitter,
      User,
      X,
      type Icon as LucideIcon,
    } from "lucide-react"
    
    ```
    
    - `lucide-react` 패키지에서 다양한 아이콘을 가져오는 구문이야.
    - 아이콘들은 SVG를 React 컴포넌트로 감싼 형태로, `<ChevronLeft />` 이런 식으로 사용 가능해.
    - `type Icon as LucideIcon`: `Icon`이라는 타입을 `LucideIcon`이라는 이름으로 재정의해서 아래에서 타입으로 써먹기 좋게 한 거야.
    
    ---
    
    ## ✅ 2. 타입 선언
    
    ```tsx
    
    export type Icon = LucideIcon
    
    ```
    
    - 위에서 가져온 `LucideIcon` 타입을 `Icon`이라는 이름으로 사용하겠다는 뜻이야.
    - 이 타입은 `lucide-react` 아이콘 컴포넌트들의 공통 타입이야.
    
    ---
    
    ## ✅ 3. `Icons` 객체 생성
    
    ```tsx
    
    export const Icons = {
      logo: Command,
      close: X,
      spinner: Loader2,
      ...
      check: Check,
    }
    
    ```
    
    - 이 `Icons` 객체는 여러 아이콘들을 key-value 쌍으로 모아둔 거야.
    - `logo: Command`는 `Icons.logo`로 `Command` 아이콘을 사용할 수 있게 해주는 거야.
    - 즉, 아이콘 이름을 일관되게 정하고 재사용을 쉽게 만들기 위한 구조야.
    
    예시:
    
    ```tsx
    
    import { Icons } from "@/components/icons"
    
    <Icons.close className="w-6 h-6 text-red-500" />
    
    ```
    
    ---
    
    ## ✅ 4. 특이한 부분: `gitHub` 아이콘
    
    ```tsx
    
    gitHub: ({ ...props }: LucideProps) => (
      <svg ... {...props}>
        <path ...></path>
      </svg>
    ),
    
    ```
    
    - `lucide-react`에는 깃허브 아이콘이 없기 때문에, **직접 만든 SVG**를 `gitHub` 키에 함수형 컴포넌트로 넣은 거야.
    - `props`는 React에서 전달받은 `className`, `size`, `color` 같은 걸 전달받아 적용하기 위한 것.
    - 이렇게 하면 `lucide-react`의 아이콘처럼 사용 가능:
    
    ```tsx
    
    <Icons.gitHub className="w-5 h-5" />
    
    ```
    
    ---
    
    ## ✅ 요약하면
    
    - `lucide-react`에서 다양한 아이콘을 가져와 `Icons`라는 객체에 모아둠
    - 프로젝트 전체에서 `Icons.[이름]`으로 통일된 방식으로 아이콘을 사용 가능
    - 없는 아이콘(`GitHub`)은 직접 SVG 작성하여 대응

---