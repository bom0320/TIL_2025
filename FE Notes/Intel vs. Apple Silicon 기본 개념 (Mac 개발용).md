# 💡 Mac 개발을 위해 이해해야 할 Intel vs. Apple Silicon 개념 정리

내가 맥으로 개발하면서 알아야할 기본적인 개념만을 정리했다.

## 1. Mac의 CPU 아키텍처 종류

Mac 에는 두 가지 CPU 아키텍처가 있다.

- **Intel Mac** (`x86_64` 아키텍처) → 2020년 이전 모델
- **Apple Silicon Mac** (`arm64` 아키텍처) → M1/ M2/ M3 칩이 들어간 최신 Mac

**📌 네 Mac은 arm64 (Apple Silicon, M1/M2/M3) 모델!**

→ Apple Silicon 전용 프로그램을 설치해야 함.

---

## 2. 프로그램 설치할 때의 차이점

**💻 Mac 앱을 다운로드할 때 "Intel vs. Apple Silicon" 선택지가 있는 경우**

- Apple Silicon (M1 / M2 / M3) 버전을 선택해야 함! (예: Android Studio.java, Docker 등)
- **🚫 Intel용(x86_64) 프로그램을 설치하면 오류가 날 수 있음.**

#### 🛠 해결 방법:

- `uname -m` -> `arm64` -> Apple Silicon Mac 이므로, **"Apple Silicon" 버전 설치**
- 공식 사이트에서 다운로드 할 때 "Mac (Apple Silicon)"을 선택

---

## 3. Homebrew 사용 시 차이점

Homebrew 는 Mac 에서 패키지를 설치하는 툴인ㄷ, Apple Silicon 과 Intel Mac 에서 설치 경로가 다름

- **Intel Mac (`x86_64`)** -> `/usr/local/`
- **Apple Silicon (`arm64`)** -> `/opt/homebrew/`

**✅ 내 Mac은 Apple Silicon이니까, Homebrew 패키지를 /opt/homebrew에 설치함!**

(그래서 brew install을 실행할 때 이 경로가 자동으로 사용됨.)

---

## 4. 터미널에서 JDK(자바) 설정할 때 차이점

Java JDK 를 설치할 때도 **Apple Silicon 용(`arm64`)버전**을 설치해야 함

**✅ M1/M2/M3 Mac에서는 Zulu JDK 17을 이렇게 설정:**

```bash
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
source ~/.zshrc
```

(이렇게 해야 `java -version`이 정상 작동함)

**🚫 Intel용 JDK(`x86_64`)를 설치하면 Android Studio 실행 시 오류 발생!**

---

## 💡 결론: 내가 꼭 알아야 할 것

1. **내 Mac이 Apple Silicon(M1/M2/M3)인지 확인하는 방법**
   - `uname -m` → `arm64`면 Apple Silicon Mac
2. **프로그램 다운로드할 때 "Apple Silicon" 버전 선택**
   - Android Studio, Java, Docker 등 **"Mac (Apple Silicon)" 버전** 설치
3. **Homebrew가 Apple Silicon 전용 경로(`/opt/homebrew/`)에 설치됨**
   - Intel Mac과 설치 경로가 다름 (이건 그냥 참고하면 됨)
4. **Java JDK 설치할 때도 Apple Silicon용(`arm64`) 버전 설치해야 함**
   - `zulu@17`을 설치하고 `JAVA_HOME` 환경 변수 설정 필수
