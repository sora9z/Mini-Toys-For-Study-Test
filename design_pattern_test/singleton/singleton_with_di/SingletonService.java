package design_pattern_test.singleton.singleton_with_di;

public class SingletonService implements Service {
    private static SingletonService instance;

    private SingletonService(){} // 초기화를 막기 위해 private으로 선언

    public static SingletonService getInstance(){
        if(instance == null){
            instance = new SingletonService();
        }
        return instance;
    }

    @Override
    public void doSomething() {
        System.out.println("doSomething by SingletonService");
    }

}

