import React, { useState } from 'react';
import { types } from 'types'
import Item from '../componsnt/Item'
import {productList} from '../assets/productlist'


function ItemListContainer(){
    const [items,setItems]=useState(productList.items)
    
    return(
        <div className="item-list-container">
            <div className="item-list-body">
                {items.map((item:types.Product,index)=>{
                    return <Item id={item.id} name={item.name} cost={item.cost} quantity={item.quantity} key={index}/>
                })}
            </div>
        </div>    )
}

export default ItemListContainer