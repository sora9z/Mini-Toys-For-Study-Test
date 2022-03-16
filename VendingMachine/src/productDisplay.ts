import { Product } from "./interfaces/VendingMachinen";

const itemListBody = document.getElementById("item-list-body");

const products: Product[] = [
  { id: 1, name: "coke", cost: 1100, quantity: 10 },
  { id: 2, name: "water", cost: 600, quantity: 10 },
  { id: 3, name: "coffee", cost: 700, quantity: 10 },
];

for (let product of products) {
  const itemObj = {
    itemBtn: document.createElement("button"),
    itemImg: document.createElement("img"),
    itemName: document.createElement("strong"),
    itemPrice: document.createElement("span"),
  };

  itemObj.itemImg.src = "./img/coke.jpeg";
  itemObj.itemName.textContent = product.name;
  itemObj.itemPrice.textContent = String(product.cost);

  itemObj.itemBtn.appendChild(itemObj.itemImg);
  itemObj.itemBtn.appendChild(itemObj.itemName);
  itemObj.itemBtn.appendChild(itemObj.itemPrice);

  itemListBody?.appendChild(itemObj.itemBtn);
}
