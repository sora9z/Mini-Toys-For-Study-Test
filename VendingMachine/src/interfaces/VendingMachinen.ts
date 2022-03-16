/**
 * 1. resister a container (UI)
 * 2. create a render method to render a new 'li' to the container
 */
/**
 * vending machine에 들어갈 제품의 type
 */
export type Product = {
  id: number;
  name: string;
  cost: number;
  quantity: number;
};
/**
 * vending machine의 결제 수단. Cash와 Card가 있다.
 */
type Cash = {
  name: "cash";
  amount: 100 | 500 | 1000 | 5000 | 10000;
};
type Card = {
  name: "card";
  serial: string;
  amount: number;
};
type Payment = Card | Cash;
/**
 * 종료를 나타내는 type
 */
type Finish = "finish";
/**
 * Error type
 */
type Err =
  | "Insufficient amount"
  | "Invalid Payment"
  | "out of stock"
  | Finish
  | "Try Again";

/**
 * display type
 */
type Display = {
  product: Product[];
  message: string;
};
export interface VendingMachine {
  displayProducts(): Display; // 선택 가능한 제품을 보여준다
  enterCashOrCard(pay: Payment): number | Err; // 금액 또는 카드를 입력 받고 받은 금액을 출력한다.
  selectProduct(productId: number): Product | Err; // 제품을 선택한다.
  displayAmount(): number; // 남은 잔액을 보여준다
  returnCashOrCard(): string | number; // 잔돈 또는 카드를 반환한다.
}
