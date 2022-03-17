import { types } from 'types'
import React from 'react';

function Item({id,name,cost,quantity}:types.Product){
    return (
        <button className={name}>
                <img src="../../coke.jpeg" alt={name}></img>
                <span>제품 번호 : {id}</span>
                <strong>제품명 : {name}</strong>
                <span>가격 ; {cost} 원</span>
                <span>재고 : {quantity} 개</span>
        </button>
    )
}


export default Item;


