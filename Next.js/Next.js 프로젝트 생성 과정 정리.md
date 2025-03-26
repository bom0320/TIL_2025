Next.js 프로젝트 생성 과정 정리
===


GitHub에 올릴 Next.js 프로젝트를 처음부터 설정하려면 다음 과정을 따르면 된다.

## 1. 프로젝트 폴더 만들기 & 초기화
```sh
mkdir learn-nextjs14
cd learn-nextjs14
npm init -y
```

## 2. 라이센스 변경 (선택 사항)
`package.json`에서 아래와 같이 변경한다.
```json
"license": "MIT"
```

## 3. Next.js 설치
```sh
npm install react@latest next@latest react-dom@latest
```

## 4. 기본 페이지 파일 만들기
```sh
mkdir app
touch app/page.tsx  # page.jsx를 사용할 수도 있음
```

## 5. package.json 수정
`package.json`의 `scripts` 항목을 아래와 같이 추가한다.
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

## 6. Next.js 실행
```sh
npm run dev
```

---

# GitHub에 푸시하는 방법
Next.js 프로젝트를 GitHub에 올릴 때 `node_modules/` 폴더가 너무 많아 푸시가 안 되는 문제를 방지하기 위해 `.gitignore` 파일을 설정해야 한다.

## 1. `.gitignore` 파일 만들기
```sh
echo "node_modules/
.next/" >> .gitignore
```

## 2. Git 초기화 및 커밋
```sh
git init
git add .
git commit -m "Initialize Next.js project"
```

## 3. GitHub 원격 저장소 연결 및 푸시
GitHub에서 새로운 레포지토리를 만든 후 아래 명령어를 실행한다.
```sh
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

이제 GitHub에 Next.js 프로젝트가 정상적으로 푸시됨!
