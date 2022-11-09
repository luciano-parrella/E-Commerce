import React from 'react';
import './styles.css';
import ItemCount from '../ItemCount';

const onAdd = (quantity) => {
        console.log(`Compraste ${quantity} unidades`);
    }

const ItemDetail = ({itemDetail}) => {
  console.log(itemDetail);
  return (
    <div className='item-detail'>
      <img src={itemDetail.image} alt={itemDetail.name} width={300}/>
      <div>
        <h1>{itemDetail.name}</h1>
        <p>{itemDetail.description}</p>
        <ItemCount initial={1} stock={itemDetail.stock} onAdd={onAdd}/>
      </div>
    </div>
  )
}

export default ItemDetail