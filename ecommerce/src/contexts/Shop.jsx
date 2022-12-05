import React from 'react';
import { createContext, useState } from "react";

export const Shop = createContext({});

const ShopProvider = ({children}) => {

    const [products, setProducts] = useState([]);

    const addProduct = (productToAdd) => {
        const flagRepeated = isProductRepeated(productToAdd.id)
        if (flagRepeated) {
            const productoRepetidoModificado = products.find(productInCart => productInCart.id === productToAdd.id)
            productoRepetidoModificado.quantity = productoRepetidoModificado.quantity + productToAdd.quantity
            const productosCartSinRepetido = products.filter(productsInCart => productsInCart.id !== productToAdd.id)
            setProducts({...productosCartSinRepetido, productoRepetidoModificado})
        } else {
            setProducts([...products, productToAdd])
        } 
    }

    const isProductRepeated = (id) => {
        return products.some(product => product.id === id);
    }

    const removeProduct = (id) => {
        const productosCart = products.filter(productsInCart => productsInCart.id !== id)
        setProducts(productosCart)
    }

    const emptyCart = () => {
        setProducts([]);
    }

    const calculateTotal = () => {
        const total = products.reduce((acc, productoActual) => acc += productoActual.quantity * productoActual.price, 0)
        return total
    }

    const totalItemsCart = () => {
        let total = 0
        products.forEach(product => total += product.quantity)
        return total
    }
    
  return (
    <Shop.Provider 
        value = {{
            products, 
            addProduct, 
            removeProduct, 
            emptyCart, 
            calculateTotal, 
            totalItemsCart
        }}
    >
        {children}
    </Shop.Provider>
  )
}

export default ShopProvider