import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Theme } from '../../contexts/Theme';
import './styles.css';

//Card
const Item = ({product}) => {

  const navigate = useNavigate()

  const {themeColor} = useContext(Theme);

  const navigateDetail = () => {
    navigate(`/detail/${product.id}`)
  }

  return (
    <div onClick={navigateDetail} className={themeColor === "light" ? 'card-detail' : 'card-detail-dark'}>
      <img src={product.image} alt={product.name} width={300}/>
      <h2 key={product.id}>{product.name}</h2>
      <h5>${product.price}</h5>
    </div>
  )
}

export default Item