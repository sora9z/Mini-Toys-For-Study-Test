import express from "express";
import { IoCContainer } from "../container";

// express 애플리케이션에 컨트롤러 등록 및 컨트롤러의 메서드를 라우트 핸들러로 등록하는 함수
// sudo
// controller list를 인자로 받고 순회한다
// 컨트롤러의 인스턴스 생성 또는 가져온다. IoC 컨테이너에서 컨트롤러를 가져온다.
// controller 클래스의 메타데이터에서 라우트 정보를 가져온다.
// 이 메타데이터는 Get 데코레이터를 통해 설정된다.
// 라우트로 순회하면서 라우드를 설정한다
// route의 handleName(메서드이름)을 사용해서 instance에 바인딩한다. 핸들러가 올바른 this 컨텍스트를 유지하도록함
// 라우드틔 HTTP 메서드에 따라 app.get 또는 app.post 등의 메서드를 호출한다.

export function setupController(
  app: express.Express,
  controllers: any[]
): void {
  controllers.forEach((controller) => {
    const instance = IoCContainer.resolve(controller) as any;
    const routes = Reflect.getMetadata("routes", controller); // Get decorator에 의해 설정됨
    routes.forEach((route: any) => {
      const handler = instance[route.handleName].bind(instance);
      switch (route.method) {
        case "get":
          app.get(route.path, handler);
          break;
        // post등 추가시 여기에 추가
        default:
          break;
      }
    });
  });
}
