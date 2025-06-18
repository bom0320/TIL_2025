파일 읽기: readFile, readFileSync 차이
===

Node.js 에서 **파일을 읽는 함수** 는 `readFile`, `readFileSync` 가 있다. 기능은 같지만 비동기식/동기식 이라는 점에서 차이가 있다.

## readFile

비동기식이다.
`fs: readfile(파일명(파일 경로), 옵션, 콜백함수)`

- 콜백 함수는 파일 전체를 읽은 후 실행될 함수이다.
- `fs (File System)` : Node.js 가 기본적으로 제공하는 모듈 
    - 파일을 쉽게 가져오게 함

```js
const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        // 파일을 읽는 중에 오류가 발생하면 `err`인자로 에러 객체가 전달된다.
        console.error(err);
        return;
    }
    // 파일 읽기에 성공하면 `data`로 파일의 내용이 전달된다.
    console.log(data);
});
```

## readFileSync

동기식이다.
`fs.readFileSync( 파일명(파일 경로), 옵션 )`

```js
const fs = require('fs');

try {
  const data = fs.readFileSync('input.txt', 'utf8');
  console.log(data);
} catch (err) {
  // 파일 읽는 중에 오류가 발생했을 때 실행
  console.error(err);
}
```