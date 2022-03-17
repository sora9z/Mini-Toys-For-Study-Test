## Mini Toy Project - Vending Machine

- Simple 3-tier architecture Project

## Requirement

- The **vending machine** display **items**, **price** and **quantity**
- The **vending machine** ask the user to enter **cash or insert a card**
  and the cash accepted are 100, 500, 1,000, 5,000, 10,000
- The user can enter **cash** multiple times
- The user can select **items** multiple times
- The vending machine calculates total money inserted
- The vending machine display the **change amount** to the user
- The vending machine calculate the change amount
- The vending machine return the change amount or the card inserted
- The vending machine provide the item selected with the user
- Multiple vending machine administrators can be registered
- A single administrator can manage multiple items
- There is only one administrator per item

---

## DB schema

peoducts : administrator = N : 1

---

## Diagram

### 1. Total Flow Chart

![1_Vending_Machine_all](./img/1_Vending_Machine_all.png)

---

### 2. Display Products

![2_Display](./img/2_Display.png)

### 3. Enter Cash Or Card

![3_Enter_Cach_Card](./img/3_Enter_Cach_Card.png)

### 3-1 Validate Payment

![3-1_Validate_Pyment](./img/3-1_Validate_Pyment.png)

### 4. Select Product

![4_Select_Product.png](./img/4_Select_Product.png)

### 4-1 Choice Product

![4-1_Choice_Product.png](./img/4-1_Choice_Product.png)

### 4-2 Calculate Amount Qty

![4-2_Calculate_Amount_Qty.png](./img/4-2_Calculate_Amount_Qty.png)

### Display Amount

![5_Display_amount.png](./img/5_Display_amount.png)

### Return Cash or Card

![6_Return_Cash_Card.png](./img/6_Return_Cash_Card.png)
