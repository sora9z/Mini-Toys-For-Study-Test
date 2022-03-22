import Input from 'componsnt/Input'
import { types } from 'types';
import {useState}from 'react';

function InputContainer(props:any){ 
  const [cardSerial,setSerialNum]=useState("")
  const cashList:types.Input[]=[100,500,1000,5000,10000]

  
  const cashHandleClick=(input:types.Input)=>{
    const value:types.Input=input
    props.enterCash(value)    
  }
  // 2022-03-22 Card handle function add
  const cardSerialHandller=(e:React.ChangeEvent<HTMLInputElement>)=>{    
      setSerialNum(e.target.value)
  }
  const cardHandller=(e:React.MouseEvent<HTMLButtonElement>)=>{        
    props.enterCard(cardSerial)
}


    return (        
        <div className="input-cash-card">
        < div className="input-cash">
            <div className="input-cash-message">허용 단위 : 100,500,1,000,5,000,10,000</div>
            <div className="btn-cash-put">
            {cashList.map((cash:types.Input,index:number)=>{
              return <Input key={index} coin={cash} cashHandleClick={()=>{cashHandleClick(cash)}}/>})}
            </div>
            <div className="input-card">
              <input name="cash-input" type="text" className="in-put" value={cardSerial}  onChange={cardSerialHandller} placeholder="Serial number 입력 '-' 제외"/>
               <button className="btn-card-put" onClick={cardHandller}>입력완료</button>
            </div>
        </div>  
       </div>
    )
}

export default InputContainer