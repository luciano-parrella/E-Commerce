import React from 'react';
import './itemCount.css';

const ItemCount = ({initial, stock, onAdd}) => {
    let [cantidad, setCantidad] = React.useState(initial);

    const aumentarCantidad = () => {
        setCantidad(cantidad + 1);
    };
    
    const disminuirCantidad = () => {
        setCantidad(cantidad - 1);
    };
    
    React.useEffect(() => {}, []);

  return (
    <div className="counter">
        <section>
            <button disabled={cantidad <= 1} onClick={disminuirCantidad}>-</button>
            <span>{cantidad}</span>
            <button disabled={cantidad >= stock} onClick={aumentarCantidad}>+</button>
        </section>
        <div>
            <button disabled={stock <= 0} onClick={() => onAdd(cantidad)}>Agregar al carrito</button>
        </div>
    </div>
  )
}

export default ItemCount