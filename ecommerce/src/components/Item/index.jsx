import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

//Card
const Item = ({product}) => {

  const navigate = useNavigate()

  const navigateDetail = () => {
    //Navegar hacia el detalle del producto
    navigate(`/detail/${product.id}`)
  }

  return (
    <div onClick={navigateDetail} className='card-detail'>
      <img src={product.image} alt={product.name} width={300}/>
      <h3 key={product.id}>{product.name}</h3>
      <p>Stock: {product.stock}</p>
    </div>
  )
}

export default Item