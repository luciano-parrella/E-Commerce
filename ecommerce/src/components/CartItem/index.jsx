import React, { useContext } from 'react'
import { Shop } from '../../contexts/Shop'
import TrashCanIcon from '../TrashCanIcon'

const CartItem = ({item}) => {

  const {removeProduct} = useContext(Shop)
  
  const onRemove = () => {
    removeProduct(item.id)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 30,
      gap: 40,
      alignItems: 'center'
    }}>
        <img src={item.image} alt={item.name} width={150} />
        <h3>{item.name}</h3>
        <h4>Cantidad: {item.quantity}</h4>
        <h4>Total: ${item.price*item.quantity}</h4>
        <div style={{width: 20}} onClick={onRemove}>
          <TrashCanIcon />
        </div>  
    </div>
  )
}

export default CartItem