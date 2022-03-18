import { VendingMachine } from "../interface";
import { types } from "types";

export class VendingMachineImple implements VendingMachine {
  private payment: types.Payment | null;
  private isFinishChoidProduct: boolean;
  private isValidPayment: boolean;

  constructor(private productList: types.Product[]) {
    this.payment = null;
    this.isFinishChoidProduct = false;
    this.isValidPayment = false;
  }

  // class func
  private paymentValidation(pay: types.Payment): boolean {
    if (pay.name === "card") {
      console.log("checking.. card serial number");
      if (pay.serial.length === 10) return true;
      else return false;
    } else {
      console.log("cheking...the cash is valid"); // 일단 cash는 기본적으로 true로 하자
      return true;
    }
  }

  public get amount() {
    return this.payment?.amount;
  }

  private choiceProduct(productId: number): types.Product | types.Err {
    const item = this.productList[productId - 1];
    if (this.payment !== null) {
      if (item.cost > this.payment.amount) {
        return "Insufficient amount";
      }
      if (item.quantity <= 0) return "out of stock";
      return item;
    } else return "Insufficient amount";
  }

  private calculateAmount(item: types.Product) {
    if (this.payment) {
      this.payment.amount -= item.cost;
      this.productList[item.id - 1].quantity -= 1;
    }
  }

  public productOut(item: types.Product): types.Product["name"] {
    return item.name;
  }

  // impletment
  displayProducts(): types.Display {
    if (!this.payment) {
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
    if (this.payment !== null && this.payment.name !== pay.name) {
      return "Try Again"; // 다시 돈을 넣을 때 기존의 psy method를 따라야한다.
    }
    if (!this.paymentValidation(pay)) {
      return "Invalid Payment";
    }
    if (this.payment === null) {
      this.payment = { ...pay };
    } else this.payment.amount += pay.amount;

    return this.payment.amount;
  }

  selectProduct(productId: number): types.Product | types.Err {
    const item = this.choiceProduct(productId);
    if (typeof item === "string") return item;
    this.calculateAmount(item);
    return item;
  }

  displayAmount(): number {
    // this.payment.name==="cash" ? 현재 남은 금액을 보여준다 this.payment.amount

    if (this.payment) return this.payment?.amount;
    else return 0;
  }
  returnCashOrCard(): string | number {
    if (this.payment) {
      if (this.payment.name === "card") {
        const serial = this.payment.serial;
        this.payment = null;
        return serial;
      } else {
        const amount = this.payment.amount;
        this.payment = null;
        return amount;
      }
    }
    return 0;
  }
}
