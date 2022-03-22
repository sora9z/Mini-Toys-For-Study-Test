import { useState } from 'react';
import './App.css';
import ItemListContainer from './page/ItemLIstContainer'
import { VendingMachineImple } from 'classes';
import { productList } from 'assets/productlist';
import { types } from 'types';
import Amount from "./componsnt/Amount"
import InputContainer from 'page/inputContainer';



const items=productList.items

function App() {  
  // make Vending machine
  const olbVendingMachine=new VendingMachineImple(productList.items)
  const [message,setMessage]=useState("Empty")
  const [amount,setAmount]=useState(0)
  const [payment,setPayment]=useState("")

  // 22.03.20 추가. cash, card 결제 method분리
  function enterCash<K extends keyof types.Cash>(userInput:K){
    // 2022-03-22 이미 결제수단이 있다면 다른 결제수단 사용
    if(payment==="cash"||payment===""){
      setPayment("cash") // 2022-03-22 결제수단 설정
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
    else setMessage("다른 결제수단을 사용해주세요")
  }

  // 2022.03.22 card 삽입 handlingfunction추가됨.
  function enterCard<K extends keyof types.Card>(userInput:K){
     // 2022-03-22 이미 결제수단이 있다면 다른 결제수단 사용
    if(payment==="card" || payment===""){// 2022-03-22 결제수단 설정
      setPayment("card")
      if(typeof userInput ==='string'){
        const pay:types.Card={
          name:"card",
          amount:10000000, // card 한도는 카드사를 통해야 하므로 임시로 설정
          serial:userInput
        }   
        let newAmont:number|types.Err=olbVendingMachine.enterCashOrCard(pay)
        
        if(typeof newAmont==="string"){
          setMessage(newAmont)
        }
        else
        getAmount(newAmont) // amount state update
      }
     
    } else setMessage("다른 결제수단을 사용해주세요") 
  }

  // select product
const selectProductHandler=(id:number)=>{ 
  const newAmount:number|types.Err= olbVendingMachine.selectProduct(id,amount)
  // error라면
  if(typeof newAmount==="string"){
    setMessage(newAmount)
  }
  else
  getAmount(newAmount) // amount state update
}

// 22.03.20 인자로 받은 newamount로 현재 React state변경
  const getAmount=(newAmount:number)=>{
      setAmount(newAmount)   
  }

// 22.03.20 거스름돈반환 handler추가

  const returnChange=()=>{
    if(payment==="cash")
    {
      setMessage(`거스름돈 ${amount}원이 반환되었습니다`)
      getAmount(0)
      setPayment("")
      setTimeout(()=>{
      setMessage(`Empty`)
      },1000)
     
    }
    else{
      setMessage(`Card가 카드 투입구에서 반환되었습니다`)
      getAmount(0)
      setPayment("")
      setTimeout(()=>{
        setMessage(`Empty`)
        },1000)
      
    }

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
            <button type="button" className="btn-return" onClick={returnChange}>거스름돈 반환</button>
          </div>
          <div className="bottom-input">
            <div className="message">
            Card 또는 Cash결제만 가능합니다
            </div>            
              <InputContainer enterCash={enterCash} enterCard={enterCard}/>
          </div>
          <div className="bottom-output">
           
          </div>
        </div>
        </div>
    </div>
  
      
  );
}

export default App;
