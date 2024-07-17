import "reflect-metadata";

function Injectable(): ClassDecorator {
  return (target: any) => {
    // Optional: IoCContainer.register(target);
  };
}

@Injectable()
class TestService {
  constructor() {}

  getTest() {
    return "test";
  }
}

@Injectable()
class TestClass {
  constructor(private testService: TestService) {}

  getTest() {
    return this.testService.getTest();
  }
}

const paramTypes = Reflect.getMetadata("design:paramtypes", TestClass) || [];
console.log(paramTypes); // Should log [ [Function: TestService] ]

// To verify the output
paramTypes.forEach((param: any) => console.log(param.name));
