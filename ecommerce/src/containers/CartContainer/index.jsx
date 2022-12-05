import React from 'react'
import { useContext } from 'react'
import CartItem from '../../components/CartItem'
import { Shop } from '../../contexts/Shop'
import { useNavigate } from 'react-router-dom'
import './styles.css';

//Deberíamos ver el desglose de todo el carrito
const CartContainer = () => {

  const navigate = useNavigate()

  const goToCheckout = () => {
    navigate(`/checkout`)
  }

  const { products, totalItemsCart } = useContext(Shop)

  return (
    <div className="cart-container">
      {products.map(product => {
        return <CartItem key={product.id} item={product} />
      })}
      {totalItemsCart() !== 0 ?
      <button className='btn btn-success p-3' onClick={goToCheckout}>Confirmar compra</button>
      : <p className="h1 m-5">No hay productos agregados en el carrito</p>
    }
    </div>
  );
};

export default CartContainer