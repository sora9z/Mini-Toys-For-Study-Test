/**
 * .d.ts는 c의 .h같이 선언만 해주는 경우 사용
 */

declare module "types" {
  export namespace types {
    type Product = {
      id: number;
      name: string;
      cost: number;
      quantity: number;
    };
    type Cash = {
      name: "cash";
      amount: number;
    };
    type Card = {
      name: "card";
      serial: string;
      amount: number;
    };

    type Input = 100 | 500 | 1000 | 5000 | 10000 | 0 | string;

    type Payment = Card | Cash | { name: null; amount: 0 };
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
  }
}
