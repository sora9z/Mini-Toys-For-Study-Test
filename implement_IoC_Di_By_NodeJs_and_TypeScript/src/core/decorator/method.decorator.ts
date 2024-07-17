// 해당 데코레이터가 적용된 HTTP 메서드의 정보를 메타데이터로 저장한다.
// 이 정보는 나중에 Express 서버 설정시 사용되며 라우트를 등록하도록 사용된다.
export function Get(path: string): MethodDecorator {
  // MethodDecorator : HTTP 요청을 처리 할 메서드를 데코레이트 하기 위해 사용
  return (
    target: any, // 데코레이터가 적용된 클래스의 프로토타입을 가리킨다.
    propertyKey: string | symbol, // 데코레이터가 적용된 메서드의 이름이다.
    descriptor: PropertyDescriptor
  ) => {
    // 만약 routes 라는 메타데이터 키가 없다면 빈 배열을 메타 데이터로 설정한다.
    // 라우트의 정보를 저장하기 위한 배열임
    if (!Reflect.hasMetadata("routes", target.constructor)) {
      Reflect.defineMetadata("routes", [], target.constructor);
    }
    const routes = Reflect.getMetadata("routes", target.constructor);
    // routes 메타데이터를 가져와서 배열에 새로운 라우드 정보를 추가한다.
    routes.push({
      method: "get",
      path,
      handleName: propertyKey,
    });
    // 수정된 routes 배열을 다시 메타데이터로 설정한다.
    Reflect.defineMetadata("routes", routes, target.constructor);
  };
}
