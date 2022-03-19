import React, { useState } from 'react';
import './App.css';
import ItemListContainer from './page/ItemLIstContainer'
import { VendingMachineImple } from 'classes';
import { productList } from 'assets/productlist';
import { types } from 'types';
import Amount from "./componsnt/Amount"
import Input from 'componsnt/Input';



const items=productList.items

// display amount


// return cash or card



function App() {  
  // make Vending machine
  const olbVendingMachine=new VendingMachineImple(productList.items)
  const [message,setMessage]=useState("Empty")
  const [amount,setAmount]=useState(0)

  function enterPayment(userInput:types.Input, cardlimit?:number){

    if(typeof userInput==="number"){    
       const pay:types.Payment={
        name:"cash",
        amount:userInput    
      }
      const updateAmount:number|types.Err= olbVendingMachine.enterCashOrCard(pay) 
      console.log("update",updateAmount);
       
      
      getAmount() // amount state update  
      return updateAmount
    }
  
   if(cardlimit){
    const pay:types.Payment={
        name:"card",
        serial:userInput,
        amount:cardlimit
      }
      const amount:number|types.Err= olbVendingMachine.enterCashOrCard(pay)
      getAmount() // amount state update
      return amount
    } 
  
    // Err라면
    if(typeof userInput==="string"){
      
      setMessage(userInput)
  
    }
  }

  // select product
const selectProductHandler=(id:number)=>{  
  const returnItem:types.Product|types.Err= olbVendingMachine.selectProduct(id)
  // error라면
  if(typeof returnItem==="string"){
    setMessage(returnItem)
  }
  else
  getAmount() // amount state update
}

  const getAmount=()=>{
      const amount:number=olbVendingMachine.amount
      setAmount(amount)   
  }
  
  return (
    <div className="App">
      <header className="App-header">
      Vending Machine
      </header>
      <div className="wrapper">
        <div className="top-container">
          <div className="machine-display">
            <ItemListContainer products={items} selectProductHandler={selectProductHandler} />
          </div>
        </div>      
        <div className="bottom-container">
          <div className="bottom-display">
            <Amount message={message} amount={amount}/>
            <button type="button" className="btn-return">거스름돈 반환</button>
          </div>
          <div className="bottom-input">
            <div className="message">
            Card 또는 Cash결제만 가능합니다
            </div>
            <Input enterPayment={enterPayment} />
          </div>
          <div className="bottom-output">
           
          </div>
        </div>
        </div>
    </div>
  
      
  );
}

export default App;
