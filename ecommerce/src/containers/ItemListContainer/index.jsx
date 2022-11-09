import React from 'react';
import './styles.css';
import rawProducts from '../../data/products';
import { useEffect, useState } from 'react';
import ItemList from '../../components/ItemList';
import { useParams } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

export default function ItemListContainer ({greeting}) {

    const [products, setProducts] = useState([])

    const {categoryId} = useParams()

    console.log(categoryId);

    useEffect(()=> {
        ( async ()=> {

            const obtenerProductos = () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(rawProducts);
                    }, 1000);
                });
            }

            let response = await obtenerProductos();
            console.log(response);

            try {
                console.log(categoryId);
                if (categoryId) {
                    response = response.filter(product => product.category === `${categoryId}`);
                } else {
                    response = await obtenerProductos();
                }
                console.log(response);
                setProducts(response)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [categoryId])

    return (
         <div className = 'item-list-container'>
            <h2>{greeting}</h2>
            {products.length ? <ItemList products={products}/> : <MoonLoader/>}
         </div>
    )
}

