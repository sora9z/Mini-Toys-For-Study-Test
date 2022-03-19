import React,{useState} from "react"


function Amount(props:any){

    return (    
        <div className="bottom-messages">
          <span className="botton-display-statemsg">{props.message}</span>
          <span className="botton-display-amountmsg">잔액확인 : {props.amount} </span>
        </div>

    )
}

export default Amount;