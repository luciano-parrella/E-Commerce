import React, { useState } from 'react';
import './styles.css';
import ItemCount from '../ItemCount';
import { useContext } from 'react';
import { Shop } from '../../contexts/Shop';
import { useNavigate } from 'react-router-dom';
import { Theme } from '../../contexts/Theme';

const ItemDetail = ({itemDetail}) => {

  const {addProduct} = useContext(Shop);
  const {themeColor} = useContext(Theme)

  const [quantityItemDetail, setQuantityItemDetail] = useState(0);

  const navigate = useNavigate();

  const onAdd = (quantity) => {
        addProduct({...itemDetail, quantity})
        setQuantityItemDetail(quantity)
    }

  const handleNavigate = () => {
    navigate('/cart')

  }

  return (
    <div className={themeColor === "dark" ? "item-detail-dark" : "item-detail"}>
      <img src={itemDetail.image} alt={itemDetail.name} width={300}/>
      <div className="texts">
        <h1>{itemDetail.name}</h1>
        <h3>${itemDetail.price}</h3>
        {quantityItemDetail ? <button onClick={handleNavigate}>Go cart</button> : <ItemCount initial={1} stock={itemDetail.stock} onAdd={onAdd}/>}
      </div>
    </div>
  )
}

export default ItemDetail