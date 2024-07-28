// synchronized를 사용하면 increment 메서드를 동기화 하면서
// 동시에 여러 쓰레드가 counter변수를 수정할 수 없도록 보장한다.
// ! Thread safe하다.
/** 출력 결과
 * javac ConterSyncGood.java && java ConterSyncGood     
Thread-0 : 1
Thread-0 : 2
Thread-0 : 3
Thread-0 : 4
Thread-0 : 5
Thread-0 : 6
Thread-0 : 7
Thread-0 : 8
Thread-0 : 9
Thread-0 : 10
Thread-1 : 11
Thread-1 : 12
Thread-1 : 13
Thread-1 : 14
Thread-1 : 15
Thread-1 : 16
Thread-1 : 17
Thread-1 : 18
Thread-1 : 19
Thread-1 : 20
 */

 /**
  * sychronized 키워드
  - synchronized 키워드는 메서드나 블록에 사용할 수 있다.
  - 자바에서 동기화된 메서드 또는 블록을 생성하여 멀티스레드 환경에서 여러 쓰레드가 동일한 자원에 동시에 접근하여 발생할 수 있는 문제를 해결하기 위해 사용된다.
  - 특정 코드블록 또는 메서드를 한 번에 하나의 스레드만 실행할 수 있도록 보장한다.
  - 동작원리
    - 모니터 락(Monitor Lock) : 자바에서 각 객체는 모니터락을 갖고있다
    - 다른 쓰레드가 이 모니터락을 갖고있다면 해제될 떄까지 대기한다.
    - 하지만 락을 획득하고 해제하는 과정에서 오버헤드가 발생할 수 있다.
  */

public class ConterSyncGood{
    private static int counter = 0;
    public static void main(String[] args){
        ConterSyncGood counterSyncGood = new ConterSyncGood();

        // Thread1 : increment the counter
        new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                counterSyncGood.increment();
            }
        }).start();

        // Thread2 : increment  the counter
        new Thread(()->{
            for(int i = 0; i<10; i++){
                counterSyncGood.increment();

            }

        }).start();
    }

    public synchronized void increment(){
        int temp = counter;
        try{
            // random sleep
            long sleep = (long)(Math.random()*10);
            Thread.sleep(sleep);
        }catch(InterruptedException e){
            e.printStackTrace();
        }
        counter = temp +1;
        System.out.println(Thread.currentThread().getName() + " : " + counter);
    }
}