- NodeJs의 Express frameworkf와 Typescript를 사용하여 IoC 컨테이너와 DI를 구현한 프로젝트

- IoC container는 종속성을 주입하는 데 사용된다.
- 이를 위한 핵심 컴포넌트는 아래와 같다

  - IoC Container class
  - Injectable decorator : 클래스를 IoC Container에 등록하는 역할을 한다.
  - Inject decorator : 클래스의 생성자 매개변수에 종속성을 주입하는 역할을 한다.
    ```typescript
    constructor(@Inject(LoggerService) private loggerService: LoggerService) {}
    ```
  - Get decorator
    - HTTP 메서드

- 구현 하기 위해 reflect-metadata를 사용한다

  - Object와 Reflect는 **이미 정의된 속성**을 다루기 위한 API를 제공해주지만 reflect-metadata는 이미 정의돈 프로퍼티 뿐 아니라 추가적인 **메타데이터**를 **추가**하기 위해 제안된 개념이다.
  - [ECMAScript 제안서](https://rbuckton.github.io/reflect-metadata/)
  - Reflect-Metadata 패키지는 내장된 Reflect Api를 확장한다. 참고로 Reflect Api는 ES6 표준으로 객체의 프로퍼티를 다루는 메서드를 제공한다. 그리고 Reflect-Metadata는 이 Reflect 네임스페이스를 확장하여 메타데이터 관리 기능을 추가한다.
  - typescript는 컴파일 타임에 자동으로 메타데이터를 생성하고 Reflect.defineMetadat 를 통해 저장한다.

- Controller, Module decorator도 구형해야 하지만 TODO로 남겨둔다.
- 초기화시 route 등록할 때 Contoller 들을 router에 등록하는 메서드를 구현한다.

- 기타 지식
  - design:paramtypes
    - 클래스 생성자 또는 메서드의 매개변수 타입 정보를 나타내는 메타데이터 키이다. typescript 컴파일러는 이 키를 이용하여 매개변수 타입 배열을 저장한다.
    - 이 배열은 생성자의 각 매개변수에 대한 타입 정보를 포함한다.
  - tsconfig.json 에서 아래의 옵션을 활성화해야 한다.
    ```json
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
    ```
  - ClassDecorator
  - ParameterDecorator
- 구현 방법

  1. IoC 컨테이너 구현
  2. Injectable 데코레이터 구현
  3. Inject 데코레이터 구현
  4. IoC 컨테이너 사용

1. STEP1: IoC 컨테이너 구성

- IoC container Class : 싱글톤으로 구현되며 클래스 인스턴스를 관리한다.
- instances

  - injectable 데코레이터가 들어간 의존성 Instance들을 넣는 배열

  - register

    - class 생성자를 받아서 그 매개변수들을 사용하여 인스턴스를 생성하고 instances에 저장하는 메서드

  - resolve
    - 생성자를 인자로 받아서 이를 이용하여 생성자에 해당하는 인스턴스를 반환하는 메서드
    - 없다면 register를 하고 instance를 반환한다.

2. SETP2 : 데코레이터 구현

- Injectable decorator 구현
  - 클래스가 IoC 컨테이너에 의해 관리될 수 있도록 한다.
  - IoC Container의 register 메서드를 이용하여 클래스를 등록한다.
- Inject decorator 구현
  - 클래스의 생성자 매개변수에 종속성을 주입한다.
  - Reflect.defineMetadata를 사용하여 생성자 매개변수의 인덱스와 타입을 메타데이터로 저장한다.
