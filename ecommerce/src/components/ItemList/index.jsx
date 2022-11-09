import React from 'react';
import Item from '../Item';
import './styles.css';

//Se va a encargar de hacer el map con los productos
const ItemList = ({products}) => {
  return (
    <div className='item-list-container'>
    {products.map(product => {
        return <Item key={product.id} product={product}/>
     })}
    </div>
  )
}

export default ItemList