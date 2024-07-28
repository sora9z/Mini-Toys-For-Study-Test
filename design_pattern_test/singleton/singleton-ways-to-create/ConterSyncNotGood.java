// 두 개의 쓰레드에서 counter변수를 동시에 증가시키려고 한다
// Thread.sleep()을 사용하여 Thread 실행을 지연시킨다.
// 이와중에 다른 Thread가 실행되어 counter변수를 변경한다.
// 결과를 보면 coutner 값이 올발바르게 증가하지 않는다. 중복되거나 순서대로 증가하지 않는다.
//! Thread safe하지 않다.
// javac ConterSync.java && java ConterSync
/** 출력 예시 
NotGood
Thread-0 : 1
Thread-1 : 1
Thread-0 : 2
Thread-1 : 2
Thread-1 : 3
Thread-1 : 4
Thread-0 : 3
Thread-1 : 5
Thread-0 : 4
Thread-1 : 6
Thread-0 : 5
Thread-0 : 6
Thread-1 : 7
Thread-0 : 7
Thread-1 : 8
Thread-0 : 8
Thread-1 : 9
Thread-0 : 9
Thread-1 : 10
Thread-0 : 10
 */
public class ConterSyncNotGood{
    private static int counter = 0;
    public static void main(String[] args){
        ConterSyncNotGood counterSync = new ConterSyncNotGood();

        // Thread1 : increment the counter
        new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                counterSync.increment();
            }
        }).start();

        // Thread2 : increment  the counter
        new Thread(()->{
            for(int i = 0; i<10; i++){
                counterSync.increment();

            }
        }).start();
    }

    public void increment(){
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