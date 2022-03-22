function Input(props:any){
    return (            
            <div className="btn-cash-put">               
                <button className={props.cash} key={props.index} onClick={(e)=>props.cashHandleClick(props.coin)}>{props.coin}</button>                    
            </div>   
    )
}

export default Input