import React,{useState} from "react"

function Input(props:any){

    const [cardSerial,setSerialNum]=useState("")
    const cardLimit:number=1000000 

    const cardSerialHandller=(e:React.ChangeEvent<HTMLInputElement>)=>{    
        setSerialNum(e.target.value)
    }

    const cardHandller=(e:React.MouseEvent<HTMLButtonElement>)=>{        
        props.enterPayment(cardSerial,cardLimit)
    }

    const cashHandller=(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const button:HTMLButtonElement=e.currentTarget  
        const value=Number(button.value)      
        props.enterPayment(value)
        
    }

    const cashList:number[]=[100,500,1000,5000,10000]


    return (        
        <div className="input-cash-card">
        <div className="input-cash">
            <div className="input-cash-message">허용 단위 : 100,500,1,000,5,000,10,000</div>
            <div className="btn-cash-put">
                {cashList.map((coin)=>{
                    const string=String(coin)
                    return  <button className={string} value={coin} onClick={cashHandller}>{coin}</button>
                })}            
            </div>
        </div>
        <div className="input-card">
          <input name="cash-input" type="text" className="in-put" value={cardSerial} onChange={cardSerialHandller} placeholder="Serial number 입력 '-' 제외"/>
          <button className="btn-card-put" onClick={cardHandller}>입력완료</button>
        </div>
      </div>
    )
}

export default Input