import { VendingMachine } from "../interface";
import { types } from "types";

export class VendingMachineImple implements VendingMachine {
  private payment: types.Payment; // payment의 역할 변경 -> React state로 amount를 관리하므로 사실상 필요 없다.
  private isFinishChoidProduct: boolean;
  private isValidPayment: boolean;

  constructor(private productList: types.Product[]) {
    this.payment = { name: null, amount: 0 };
    this.isFinishChoidProduct = false;
    this.isValidPayment = false;
  }

  // class func

  public get amount() {
    return this.payment.amount;
  }

  private calculateAmount(
    item: types.Product,
    amount: number
  ): number | types.Err {
    // 인자 추가 -> React상태로 관리중인 amount, quantity
    if (amount) {
      // 22.03.20 this.payment.name!==nuill  -> amount 0 여부 확인으로 임시 변경 (추후 react에서 결제 수단으로 변경 예정)

      const updateAmount = amount - item.cost;

      this.productList[item.id - 1].quantity -= 1;
      return updateAmount; // 22.03.20 계산된 amount반환
    } else return "Invalid Payment";
  }

  public productOut(item: types.Product): types.Product["name"] {
    return item.name;
  }

  // impletment
  displayProducts(): types.Display {
    if (!this.payment.name) {
      return {
        product: this.productList,
        message: "Enter Cash or Card",
      };
    } else
      return {
        product: this.productList,
        message: "Select Products",
      };
  }
  enterCashOrCard(pay: types.Payment): number | types.Err {
    // 2022-03-22 조건절 삭제 : Intance의 payment상태가 저장되지 않기 때문에 이 조건문은 있으나 마나. 이불 방법 또한 react state로 관리 돠어야 한다.

    if (!this.paymentValidation(pay)) {
      return "Invalid Payment";
    }

    this.payment.name = pay.name;
    return pay.amount;

    // 22.03.20 React에서 클라이언트 구현할 때  사실상 아래의 과정은 필요없다. 내부적으로 Validation만 하면 된다.
    // -> 참고 https://stackoverflow.com/questions/62262385/react-context-not-updating-for-class-as-value

    // this.payment.amount += pay.amount;
  }

  private paymentValidation(pay: types.Payment): boolean {
    if (pay.name === "card") {
      console.log("checking.. card serial number");
      if (pay.serial.length === 10) return true;
      else {
        console.log("card serial number length must  10");
        return false;
      }
    } else {
      console.log("cheking...the cash is valid"); // 일단 cash는 기본적으로 true로 하자
      return true;
    }
  }

  // 22.03.20 변경사항 React의 amount를 이자로 받고 선택한 item의 가격을 뺀 금액 출력 (추후 Iteme도 출력하는 것으로 변경 예정)
  selectProduct(productId: number, amount: number): number | types.Err {
    const item = this.choiceProduct(productId, amount);

    if (typeof item === "string") return item;
    // Error message
    else {
      const updateAmount: number | types.Err = this.calculateAmount(
        item,
        amount
      );
      return updateAmount;
    }
  }

  private choiceProduct(
    productId: number,
    amount: number
  ): types.Product | types.Err {
    const item = this.productList[productId - 1];

    if (amount) {
      // 22.03.20 - this.payment.name!==nuill  -> amount 0 여부 확인으로 임시 변경 (추후 react에서 결제 수단으로 변경 예정)
      if (item.cost > amount) {
        return "Insufficient amount";
      }
      if (item.quantity <= 0) return "out of stock";
      return item;
    } else return "Insufficient amount";
  }

  // React에서 상태를 관리하므로 필요없는 기능
  displayAmount(): number {
    // this.payment.name==="cash" ? 현재 남은 금액을 보여준다 this.payment.amount

    if (this.payment) return this.payment?.amount;
    else return 0;
  }

  // React에서 상태를 관리하므로 필요없는 기능
  returnCashOrCard(): string | number {
    if (this.payment) {
      if (this.payment.name === "card") {
        const serial = this.payment.serial;
        this.payment = { name: null, amount: 0 };
        return serial;
      } else {
        const amount = this.payment.amount;
        this.payment = { name: null, amount: 0 };
        return amount;
      }
    }
    return 0;
  }
}
