import React, { useState } from 'react';
import './App.css';
import ItemListContainer from './page/ItemLIstContainer'
import { VendingMachineImple } from 'classes';
import { productList } from 'assets/productlist';
import { types } from 'types';
import Amount from "./componsnt/Amount"
import Input from 'componsnt/Input';
import InputContainer from 'page/inputContainer';



const items=productList.items


// display amount


// return cash or card



function App() {  
  // make Vending machine
  const olbVendingMachine=new VendingMachineImple(productList.items)
  const [message,setMessage]=useState("Empty")
  const [amount,setAmount]=useState(0)

  // 22.03.20 추가. cash, card 결제 method분리
  function enterCash<K extends keyof types.Input>(userInput:K){
    
    if(typeof userInput ==='number'){
      const pay:types.Payment={
        name:"cash",
        amount:userInput
      }   
      let newAmont:number|types.Err=olbVendingMachine.enterCashOrCard(pay)
        // 사실장 validation만 하면 된다.

      if(typeof newAmont==="string"){
        setMessage(newAmont)
      }
      else
      getAmount(newAmont+amount) // amount state update
    }
  }

  function enterPayment(userInput:types.Input, cardlimit?:number){

    if(typeof userInput==="number"){    
       const pay:types.Payment={
        name:"cash",
        amount:userInput    
      }
      const updateAmount:number|types.Err= olbVendingMachine.enterCashOrCard(pay) 
      console.log("update",updateAmount);
       
      
      // getAmount() // amount state update  
      return updateAmount
    }
  
   if(cardlimit){
    const pay:types.Payment={
        name:"card",
        serial:userInput,
        amount:cardlimit
      }
      const amount:number|types.Err= olbVendingMachine.enterCashOrCard(pay)
      // getAmount() // amount state update
      return amount
    } 
  
    // Err라면
    if(typeof userInput==="string"){
      
      setMessage(userInput)
  
    }
  }

  // select product
const selectProductHandler=(id:number)=>{ 
  console.log("before",amount);
   
  const newAmount:number|types.Err= olbVendingMachine.selectProduct(id,amount)
  console.log("after",newAmount);
  
  // error라면
  if(typeof newAmount==="string"){
    setMessage(newAmount)
  }
  else
  getAmount(newAmount) // amount state update
}

  const getAmount=(newAmount:number)=>{
      setAmount(newAmount)   
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
              <InputContainer enterPayment={enterCash}/>
          </div>
          <div className="bottom-output">
           
          </div>
        </div>
        </div>
    </div>
  
      
  );
}

export default App;
