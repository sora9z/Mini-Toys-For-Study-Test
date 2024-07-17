- NodeJs의 Express frameworkf와 Typescript를 사용하여 IoC 컨테이너와 DI를 구현한 프로젝트

- IoC container는 종속성을 주입하는데 사용된다.
- 이를 위한 핵심 컴포넌트는 아래와 같다

  - IoC Container class
  - Injectable decorator : 클래스를 IoC Container에 등록하는 역할을 한다.
  - Inject decorator : 클래스의 생성자 매개변수에 종속성을 주입하는 역할을 한다.
    ```typescript
    constructor(@Inject(LoggerService) private loggerService: LoggerService) {}
    ```
  - Get decorator
    - HTTP 메서드의 정보를 메타데이터로 저장하는 데코레이터
  - setupController 메서드
    - 서버 초기화시 Controller들을 app에 등록하고 컨트롤러의 메서드들을 라우트 핸들러로 등록하는 초기화 메서드

- 구현 하기 위해 reflect-metadata를 사용

  - 데코레이터를 사용하여 객에의 정보를 메타데이터로 등록하고 이를 이용하여 DIㄹ 구현한다. 이를 위해 reflect-metadata 패키지를 사용한다.
  - Object와 Reflect는 **이미 정의된 속성**을 다루기 위한 API를 제공해주지만 reflect-metadata는 이미 정의돈 프로퍼티 뿐 아니라 추가적인 **메타데이터**를 **추가**하기 위해 제안된 개념이다.
  - [ECMAScript 제안서](https://rbuckton.github.io/reflect-metadata/)
  - Reflect-Metadata 패키지는 내장된 Reflect Api를 확장한다. 참고로 Reflect Api는 ES6 표준으로 객체의 프로퍼티를 다루는 메서드를 제공한다. 그리고 Reflect-Metadata는 이 Reflect 네임스페이스를 확장하여 메타데이터 관리 기능을 추가한다.
  - typescript는 컴파일 타임에 자동으로 메타데이터를 생성하고 Reflect.defineMetadat 를 통해 저장한다.

- Module decorator도 구형해야 하지만 TODO로 남겨둔다.
- 초기화시 route 등록할 때 Contoller 들을 router에 등록하는 메서드를 구현한다.

- 기타 지식

  - Reflectin metadata에 등록되어있는 표준 메타데이터키
    - design:paramtypes
      - 클래스 생성자 또는 메서드의 매개변수 타입 정보를 나타내는 메타데이터 키이다. typescript 컴파일러는 이 키를 이용하여 매개변수 타입 배열을 저장한다.
      - 이 배열은 생성자의 각 매개변수에 대한 타입 정보를 포함한다.
    - tsconfig.json 에서 아래의 옵션을 활성화해야 한다.
      ```json
      "emitDecoratorMetadata": true, // TypeScript 컴파일러는 emitDecoratorMetadata 옵션을 사용하여 생성자 매개변수 타입 정보를 자동으로 메타데이터로 생성한다.
      "experimentalDecorators": true
      ```
  - ClassDecorator

    ```typescript
    declare type ClassDecorator = <TFunction extends Function>(
      target: TFunction
    ) => TFunction | void;
    ```

    - 클래스에 적용되는 데코레이터의 타입
    - target은 데코레이터가 적용된 클래스의 생성자 함수이다.

  - PropertyDecorator

    ```typescript
    declare type PropertyDecorator = (
      target: Object,
      propertyKey: string | symbol
    ) => void;
    ```

    - 클래스 속성에 적용되는 데코레이터 타입이다.
    - target은 데코레이터가 적용된 객체이다.
    - propertyKey는 데코레이터가 적용된 속성의 이름이다.

  - MethodDecorator

    ```typescript
    declare type MethodDecorator = <T>(
      target: Object,
      propertyKey: string | symbol,
      descriptor: TypedPropertyDescriptor<T>
    ) => TypedPropertyDescriptor<T> | void;
    ```

    - 클래스 메서드에 적용되는 데코레이터 타입이다.
    - target은 데코레이터가 적용된 객체이다.
    - propertyKey는 데코레이터가 적용된 메서드의 이름이다.
    - descriptor는 데코레이터가 적용된 메서드의 프로퍼티 디스크립터이다.(메서드 속성 설명자)
      - 속성 설명자란 메서드의 속성을 설명하는 객체이다. 이 객체는 메서드의 속성을 나타내는 다양한 속성을 가지고 있다.

  - ParameterDecorator

    ```typescript
    declare type ParameterDecorator = (
      target: Object,
      propertyKey: string | symbol | undefined,
      parameterIndex: number
    ) => void;
    ```

    - 클래스 생성자 또는 메서드의 매개변수에 적용되는 데코레이터 타입이다.
    - target은 데코레이터가 적용된 객체이다.
    - propertyKey는 데코레이터가 적용된 메서드의 이름이다. 생성자의 경우 undefined일 수 있다.
    - parameterIndex는 데코레이터가 적용된 매개변수의 인덱스이다.

- 구현 방법

  1. IoC 컨테이너 구현
  2. Injectable 데코레이터 구현
  3. Inject 데코레이터 구현
  4. Get 데코레이터 구현
  5. setupController 메서드 구현

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
- Get decorator 구현
  - HTTP 메서드의 정보를 메타데이터로 저장하는 데코레이터
  - "routes" 라는 키로 메타데이터를 가져온다. 없다면 생성하고 라우트 정보를 추가한다.

3. STEP4: setupController 메서드 구현

- 서버 초기화시 Controller들을 app에 등록하고 컨트롤러의 메서드들을 라우트 핸들러로 등록하는 초기화 메서드
- 서버 시작시 클래스 정의시 데코레이터에 의해 등록된 IoC인스턴스를 가져와서 라우트를 등록한다.
- 없다면 IoC 컨테이너에 등록한다.

4. 실행

- 서버가 실행되면 클래스가 정의되므로 데코레이터가 이때 실행이 된다. 그리고 각 데코레이터는 각자의 역할을 하면서 메타에터를 등록하고 DI를 한다.
- 그 후 서버가 시작되면 setupController 메서드가 실행되면서 라우트를 등록한다.
