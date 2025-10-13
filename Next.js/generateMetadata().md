# Next.js generateMetadata() 정리

## generateMetadata 란

generateMetadata() 는 페이지 제목(title), 설명(description), 미리보기 섬네일 등을 자동으로 생성해주는
**Next.js App Router 전용 함수** 이다.

예를 들어 생각해보자.
내 사이트를 카카오톡이나 인스타에 공유하면 제목/설명/ 썸네일 이미지가 자동으로 보인다.

- 그리고 이걸 설정하는 정보가 바로 Metadata,
- 그리고 그걸 페이지마다 다르게 자동 생성해주는 게 generateMetadata() 이다.

---

### 왜 필요한가?

Next.js에서는 **페이지마다 내용이 다르기 때문에** 검색엔진(SEO)이나 SNS 공유시에도 각 페이지에 맞는 정보를 보여줄 필요가 있다.

| 페이지      | 제목       | 설명                             |
| ----------- | ---------- | -------------------------------- |
| `/about`    | "소개"     | "DOMA 서비스 소개 페이지입니다." |
| `/notice/3` | "3번 공지" | "업데이트 안내 공지입니다."      |

이걸 페이지마다 자동으로 만들어주는 게 `generateMetadata()`이다.

---

## 기본 사용 방법

generateMetadata()는 각 `page.tsx` 파일 안에서 export 하는 함수이다.

```tsx
// app/about/page.tsx

import { Metadata } from "next";

// 간단한 정적 메타데이터
export const metadata: Metadata = {
  title: "소개 | DOMA",
  description: "DOMA 서비스 소개 페이지입니다.",
};
```

혹은 데이터에 따라 바꿔야 한다면 `generateMetadata()` 로

```tsx
// app/notice/[id]/page.tsx

import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const notice = await fetch(`https://example.com/notice/${params.id}`).then(
    (res) => res.json()
  );

  return {
    title: `${notice.title} | DOMA`,
    description: notice.summary,
  };
}

export default function NoticePage() {
  return <h1>공지 상세 페이지</h1>;
}
```

이렇게 하면 URL이 `/notice/1` , `/notice/2` 로 바뀔때 마다 SEO 제목과 설명도 자동으로 바뀐다.

## 전역 메타데이터 - `app/layout.tsx`

모든 페이지에 공통으로 들어갈 정보는 전역 layout.tsx 파일에서 `export const metadata` 로 정의한다.

```tsx
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "DOMA | Developer Portfolio",
    template: "%s | DOMA", // 각 페이지 타이틀에 자동으로 붙음
  },
  description: "프론트엔드 개발자 김봄의 포트폴리오",
  openGraph: {
    siteName: "DOMA",
    type: "website",
    images: ["/og-default.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};
```

이후 페이지의 `generateMetadata()` 가 있으면 이 기본값을 덮어쓴다.

## FSD(Feature-Sliced Designed) 구조에서의 위치

보통 이렇게 구조화한다:

```
app/
 ┗ (routes)/
    ┣ home/
    ┃ ┗ page.tsx
    ┣ about/
    ┃ ┗ page.tsx
    ┗ project/
       ┣ page.tsx
       ┗ [id]/
          ┗ page.tsx
entities/
 ┗ project/
    ┗ api/
       ┗ getProject.ts
shared/
 ┗ seo/
    ┗ metadata.ts

```

구조 요약

- `app/layout.tsx` -> 전체 사이트 공통 메타
- `page.tsx` -> 페이지별 메타 (정적 or 동적)
- `shared/seo/metadata.ts` -> 공통 메타 생성 헬퍼 함수
- `entities/api` -> API 데이터 요청 로직

## 동적 예시(프로젝트 상세 페이지)

```tsx
// app/(project)/[id]/page.tsx
import { getProject } from "@/entities/project/api/getProject";
import { baseMetadata } from "@/shared/seo/metadata";

export async function generateMetadata({ params }) {
  const project = await getProject(params.id);
  return baseMetadata(project.name, project.summary);
}

export default function ProjectDetailPage() {
  return <div>프로젝트 상세 페이지</div>;
}
```

### entities/project/api/getProject.ts

```ts
export default function getProject(id: string) {
  const rew = await fetch(`https://api.example.com/project/${id}`);
  return res.json();
}
```

### shared/seo/metadata.ts

```ts
import type { Metadata } from "next";

export function baseMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}
```

이렇게 하면 코드 중복도 줄고, 페이지마다 필요한 데이터만 관리할 수 있다.

## 실행 시점

- generateMetadata() 는 서버에서 페이지 렌더링 전에 실행됨
- 즉, 클라에서 직접 실행되는 게 아니라 SSR(Server-Side Rendering) 단게에서 `<head>` 안에 포함된다.
- 그래서 클라이언트 컴포넌트에선 사용할 수 없다.

## 자주 하는 실수

- 클라이언트 컴포넌트에서 사용
  - 서버 컴포넌트 전용 함수
- layout과 page 둘 다 같은 key 정의
  - 충돌 가능 (하나만)
- metadataBase 빠짐
  - 이미지 경로가 절대경로로 인식 아됨
- fetch 를 클라로 착각
  - SSR 시점에서 실행됨 (API 호출은 안전함)

## 한 줄 요약

- generateMetadata()는 "Next.js에서 페이지별로 자동으로 제목, 설명, OG 이미지 등을 설정해주는 서버 전용 함수"

- 전역 기본값은 `layout.tsx` , 개별 설정은 `page.tsx`의 `generateMetadata()` 로 관리하한다.

  - 정적이면 `export const metadata`
  - 동적이면 `export  async function generateMetadata()`
