package design_pattern_test.singleton.singleton_with_di;

public class Client {
    private Service service;
    // Dependency Injection
    public Client(Service service) {
        this.service = service;
    }

    public void execute() {
        service.doSomething();
    }

}
