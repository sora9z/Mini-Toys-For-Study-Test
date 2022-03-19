import React, { useState } from 'react';
import { types } from 'types'
import Item from '../componsnt/Item'
import {productList} from '../assets/productlist'


function ItemListContainer(props:any){
    
    const [items,setItems]=useState(props.products)
    
    return(
        <div className="item-list-container">
            <div className="item-list-body">
                {items.map((item:types.Product,index:number)=>{
                    return <Item id={item.id} name={item.name} cost={item.cost} quantity={item.quantity} key={index} selectProductHandler={props.selectProductHandler} />
                })}
            </div>
        </div>
        )
}

export default ItemListContainer