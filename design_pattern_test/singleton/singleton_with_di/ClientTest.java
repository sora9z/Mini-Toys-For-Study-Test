package design_pattern_test.singleton.singleton_with_di;

public class ClientTest {
    public static void main(String[] args){
        // 실제 싱글톤 instance
        Service realService = SingletonService.getInstance();
        Client clientWithRealService = new Client(realService);
        clientWithRealService.execute();

        // mock service for teset
        Service mockService = new Service() {
            @Override
            public void doSomething() {
                System.out.println("doSomething by mockService");
            }
        };
        Client clientWithMockService = new Client(mockService);
        clientWithMockService.execute();
        }
    }
    
