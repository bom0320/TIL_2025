Query 관련 개념 정리
===

### QueryCache

위에서 살펴본 QueryClient 객체 안에서는 QueryCache가 존재한다. 그리고 이 QueryCache는 JS의 객체이다.

우리가 Query인스턴스를 생성하면, QueryHash를 객체의 key로, query인스턴스를 값으로 넣어준다.

그리고 queries 라는 배열에 query인스턴스를 추가한다.

여기서 queryHash는 query  key 를 stringify한 값이다. 

따라서 우리는 query 생성시 반드시 query key로 유니크한 값을 지정해줘야한다.

### Query

QueryCache의 value 로 Query 객체 안에는 Query의 모든 정보들이 들어있다.

또한 Cache에 자신이 위치한 QueryCache 정보를 가지고 있으며, observers 라는 배열도 가지고 있다. 이 observers에는 QueryObserver가 담긴다. Query 는 observer를 통해 누가 자신을 구독했는지 알고, Observer 를 통해 모든 변경사항을 알릴 수 있다.

### QueryObserver

useQuery 호출 시, `Observer` 가 생성된다. 이 Observer를 통해 query 와 컴포넌트(useQuery)가 연결된다. 

> 다시 말해, Query의 상태가 바뀌면 → 컴포넌트를 다시 렌더링 시킬지 말지를 판단해주는 똑똑한 중간 관리자이다.
> 

Observer에는 QueryClient객체를 비롯하여 현재 Query, 랜더링 유발 여부를 파악하기 위한 현재 결과값 등이 담겨있다.