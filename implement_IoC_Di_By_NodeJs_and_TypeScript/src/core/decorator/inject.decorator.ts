// 클래스의 생성자 매개변수에 종속성을 주입하는 데코레이터
export function Inject(type: any): ParameterDecorator {
  return (
    target: any,
    propertyKey: string | symbol | undefined,
    parameterIndex: number
  ) => {
    const existingInjectedParams =
      Reflect.getMetadata("custom:inject", target) || [];
    existingInjectedParams.push({ index: parameterIndex, type });
    // 데코레이터는 매개변수의 인덱스와 타입을 메타데이터로 저장
    Reflect.defineMetadata("custom:inject", existingInjectedParams, target);
  };
}
