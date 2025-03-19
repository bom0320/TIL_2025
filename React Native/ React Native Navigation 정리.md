React Native Navigation 정리
===

1. **React Native의 모든 화면 컴포넌트에는 `navigation`이라는 프롭스가 자동으로 전달됨.**
    - 이를 통해 다른 화면으로 이동할 수 있음.
2. **`navigation.navigate('스크린명')`을 사용하여 화면 전환 가능.**
    
    ```jsx
    
    function AuthHomeScreen({ navigation }) {
        return (
            <View>
                <Buttontitle="로그인 화면으로 이동"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
        );
    }
    
    ```
    
3. **하지만 `AuthHomeScreen`을 직접 사용하면 네비게이션 기능이 정상적으로 동작하지 않을 수 있음.**
    - 네비게이션 기능을 사용하려면 `AuthStackNavigator`(스택 네비게이터)를 앱에 적용해야 함.
4. **해결 방법:**
    - `<AuthHomeScreen />`을 직접 렌더링하는 것이 아니라,**AuthStackNavigator**를 앱의 네비게이션 구조로 사용해야 함.
    
    ```jsx
    <AuthStackNavigator />
    ```
    
    - 이를 통해 `AuthHomeScreen`이 네비게이션 컨텍스트 내에서 정상적으로 동작함.

**결론**

화면 이동을 위해 `navigation` 프롭스를 사용해야 하지만,

네비게이션 기능을 올바르게 작동시키려면 `Stack Navigator`를 올바르게 설정하고 사용해야 한다.