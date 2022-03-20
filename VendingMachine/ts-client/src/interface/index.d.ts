import { types } from "types";

export interface VendingMachine {
  displayProducts(): types.Display; // 선택 가능한 제품을 보여준다
  enterCashOrCard(pay: types.Payment): number | types.Err;
  // 금액 또는 카드를 입력 받고 받은 금액을 출력한다.
  selectProduct(productId: number, amount: number): number | types.Err; // 제품을 선택한다.
  displayAmount(): number; // 남은 잔액을 보여준다
  returnCashOrCard(): string | number; // 잔돈 또는 카드를 반환한다.
}
