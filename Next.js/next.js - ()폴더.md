# Nextjs - () 폴더(Parenthesis Notation)

# () 폴더란?

next.js 를 공부하거나 프로젝트를 진행할 때, 소괄호 폴더를 만들어서 사용하는 경우가 몇몇 있다. 뭔가 동적으로 라우팅을 받는거까지만 알고 제대로는 알지 못했다. 따라서 이번에 알아보고 싶어서 제대로 공부 해 보았다.

**() 폴더(Parenthesis Notation) 는 폴더 단위의 라우팅을 의미한다.**

이는 "동적 세그먼트" 또는 "catch-all" 라우트라고도 부른다. 이렇게 함으로써, 동적인 데이터를 처리하거나 복잡한 경로를 처리함에 있어 이점을 가질수 있기 때문에 사용을 한다.

## Ex.

```
app
- (site)
    -- page.tsx
- api
    ...
```

이런식으로 사용하는 경우를 많이 봤을 것이다. 이렇게 하면 **동적으로 경로 세그먼트 처리가 가능하다.**

- 즉 예를 들어 `posts/(folderName)/[slug].tsx` 파일인 경우
  - `posts/my-category/my-post-title` 와 같은 경로에서 **my-category** 부분을 변수로 취급하여 해당 페이지로 동적으로 라우팅할 수 있게 된다.

## [] 폴더(Bracket Notation)와의 차이점

[] 폴더와이 차이점은, **[]은 경로의 일부를 변수로 다루는데 사용하고, ()는 폴더 단위의 동적 라우팅을 처리하는 데 사용된다는 점이다.**

- 예를 들면, `posts/[slug].tsx` 파일 같은 경우, - posts/my-post-title와 같은 경로에서 my-post-title 부분을 변수로 취급하여 해당 페이지로 동적으로 라우팅할 수 있게 된다. - 이런 식으로 라우팅되는 데이터를 해당 페이지의 쿼리 매개변수나 파라미터로 활용한다.
  이러한 차이점이 있으니, Next.js를 공부할 때, 참조하면 좋을 내용이다.

# 실제 예시

조금 더 정확한 예시를 통해 완벽하게
() 폴더와 [] 폴더를 이해해보려고 한다. 실제 URL에 대입하여 진행하면 보다 정확하게 이해를 할 수 있을 것이다.

## 가정

- 블로그 웹 애플리케이션
- **카테고리 :** "technology" , "travel", "food"
- **포스트 :** 각 카테고리별로 여러 개의 포스트가 있다고 가정

## 적용

### 1. 카테고리 목록 페이지:

- URL: /categories
- 폴더: (categories)/page.tsx
  - 파일을 생성하여 카테고리 목록을 보여주는 페이지를 구성
  - 모든 카테고리를 보여줌

### 2. 특정 카테고리 페이지

- URL: /categories/technology
- 폴더 : (categories)/[category]/page.tsx
  - 파일을 생성하여 특정 카테고리의 내용을 보여주는 페이지를 구성. technology 부분은 [category]에 매핑.
  - technology 카테고리의 내용을 보여줌

### 3. 포스트 상세 페이지

- URL: /categories/technology/mt-tech-post
- 폴더: (categories)/[category]/[slug]/page.tsx
  - 파일을 생성하여 특정 카테고리의 특정 포스트의 내용을 보여주는 페이지를 구성
  - technology 부분은 [category]에 매핑, my-tech-post 부분은 [slug] 에 매핑
  - technology 카테고리의 my-tech-post 포스트 내용을 보여줌

이런식으로 next.js 폴더의 매핑과정을 깊게 이해하기 위해서 블로그를 구현해보는 것도 나쁘지 않은 선택인 듯 싶다.

# 정리

() 폴더는 Nextjs에서 동적으로 라우팅을 처리하는 데 사용된다.
여러 수준의 동적 경로를 유연하게 다루며, 사용자 경험을 개선하고 SEO를 향상시키는 데 활용됨을 알게 되었다.
