import React,{useState} from "react"

function Input(props:any){

    const [cardSerial,setSerialNum]=useState("")

    const cardSerialHandller=(e:React.ChangeEvent<HTMLInputElement>)=>{    
        setSerialNum(e.target.value)
    }

    // const cardHandller=(e:React.MouseEvent<HTMLButtonElement>)=>{        
    //     props.enterPayment(cardSerial,cardLimit)
    // }

    return (            
            <div className="btn-cash-put">               
                <button className={props.cash} key={props.index} onClick={(e)=>props.cashHandleClick(props.coin)}>{props.coin}</button>                    
            </div>   
    )
}

export default Input