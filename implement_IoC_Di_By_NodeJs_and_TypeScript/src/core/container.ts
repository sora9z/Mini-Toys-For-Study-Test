import "reflect-metadata";
import { ClassType } from "./types/class.type";

// SingleTone Pattern 적용
export class IoCContainer {
  // 인스턴스를 저장하기 위한 Map 객체
  private static instances = new Map<string, any>(); // string: key, any: value (instance)

  // class 생성자를 받아서 그 매개변수들을 사용하여 인스턴스를 생성하고 instances에 저장
  static register<T>(constructor: ClassType<T>): void {
    // sudo code
    // const paramTypes : constructor의 parameter types를 가져온다
    // dependencies : paramTypes 반복문을 돌려서 의존성을 찾고 instances 에서 instance를 가져온다.
    // resolve메서드를 사용하여 instance를 가져온다. 없다면 생성해서 가져온다.
    // resolve메서드를 에서는 없는 경우 register를 사용하므로 재귀적으로 호출된다.
    // dependencies들을 모두 넣고 constructor 인스턴스를 생성하여 instances에 저장한다. key는 constructor.name을 사용한다.
    const paramTypes =
      Reflect.getMetadata("design:paramtypes", constructor) || [];
    const dependencies = paramTypes.map((paramType: any) =>
      IoCContainer.resolve(paramType)
    );
    IoCContainer.instances.set(
      constructor.name,
      new constructor(...dependencies)
    );
  }

  //생성자를 인자로 받아서 이를 이용하여 생성자에 해당하는 인스턴스를 반환하는 메서드
  //없다면 register를 하고 instance를 반환한다.
  static resolve<T>(constructor: ClassType<T>): T {
    // sudo code
    // constructor의 이름을 key로 하여 instances에서 instance를 가져온다.
    // 없다면 IOCCOntainer.register(constructor)를 실행하고 instance를 return 한다.
    // 있담면 instance를 return 한다.

    const instance = IoCContainer.instances.get(constructor.name);
    if (!instance) {
      IoCContainer.register(constructor);
      return IoCContainer.instances.get(constructor.name);
    }
    return instance;
  }
}
