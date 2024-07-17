import { IoCContainer } from "../container";

// Class를 IoC Conrainer에 등록하기 위한 Decorator
// ClassDecorator 를 반환하는 함수이며 class에 적용될 떄 호출된다.
export function Injectable(): ClassDecorator {
  return (target: any) => {
    IoCContainer.register(target);
  };
}
