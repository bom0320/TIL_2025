# npm ci 실행 시 lockfile 버전 불일치 오류 해결

### 💡 **상황**

- GitHub Actions에서 `npm ci` 실행 중 에러 발생
- 로그에 다음과 같은 오류 메시지가 출력됨:

```vbnet

npm error Invalid: lock file's @next/swc-*@15.3.4 does not satisfy @next/swc-*@15.3.5
Error: Process completed with exit code 1

```

---

### 🔎 **원인**

- `package.json`과 `package-lock.json` 간의 의존성 버전 불일치
- `npm ci`는 `package-lock.json`과 `package.json`이 **완전히 일치**해야 하는데, 일부 패키지(@next/swc-\*) 버전이 달라서 실패한 것.

---

### 🛠 **해결 방법**

1. 기존 lockfile과 node_modules 제거

   ```bash

   rm -rf node_modules package-lock.json

   ```

2. 다시 설치

   ```bash

   npm install

   ```

3. 필요 시 새로 생성된 lockfile을 커밋

   ```bash

   git add package-lock.json
   git commit -m "chore: regenerate package-lock.json"

   ```

---

### ✨ **배운 점**

- `npm ci`는 lockfile과 package.json이 불일치하면 설치를 거부한다.

- lockfile 문제 발생 시 **`package-lock.json` 삭제 후 `npm install`**로 재생성하면 해결 가능하다.

- 이런 수정은 기능 변경이 아닌 빌드 환경 정리에 해당하므로 커밋 메시지는 `chore`로 작성한다.

예) `chore: regenerate package-lock.json`
