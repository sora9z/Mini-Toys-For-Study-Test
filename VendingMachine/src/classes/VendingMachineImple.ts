import { VendingMachine } from "../interfaces/VendingMachinen";

/**
 * vending machine에 들어갈 제품의 type
 */
type Product = { id: number; name: string; cost: number; quantity: number };
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

export class VendingMachineImple implements VendingMachine {
  private payment: Payment | null;
  private isFinishChoidProduct: boolean;
  private isValidPayment: boolean;

  constructor(private productList: Product[]) {
    this.payment = null;
    this.isFinishChoidProduct = false;
    this.isValidPayment = false;
  }

  // class func
  private paymentValidation(pay: Payment): boolean {
    if (pay.name === "card") {
      console.log("checking.. card serial number");
      if (pay.serial.length === 10) return true;
      else return false;
    } else {
      console.log("cheking...the cash is valid"); // 일단 cash는 기본적으로 true로 하자
      return true;
    }
  }

  private choiceProduct(productId: number): Product | Err {
    const item = this.productList[productId - 1];
    if (this.payment) {
      if (item.cost > this.payment.amount) {
        return "Insufficient amount";
      }
      if (item.quantity <= 0) return "out of stock";
      return item;
    } else return "Insufficient amount";
  }

  private calculateAmount(item: Product) {
    if (this.payment) {
      this.payment.amount -= item.cost;
      this.productList[item.id - 1].quantity -= 1;
    }
  }

  private productOut(item: Product): Product["name"] {
    return item.name;
  }

  // impletment
  displayProducts(): Display {
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
  enterCashOrCard(pay: Payment): number | Err {
    if (this.payment !== null && this.payment.name !== pay.name) {
      return "Try Again"; // 다시 돈을 넣을 때 기존의 psy method를 따라야한다.
    }
    if (!this.paymentValidation(pay)) {
      return "Invalid Payment";
    }
    if (this.payment) {
      this.payment.amount += pay.amount;
    } else this.payment = { ...pay };

    return this.payment.amount;
  }

  selectProduct(productId: number): Product | Err {
    const item = this.choiceProduct(productId);
    if (typeof item === "string") return item;
    this.calculateAmount(item);
    this.productOut(item);
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
