import React, { useEffect, useState } from "react";
import ItemDetail from "../../components/ItemDetail";
import { useParams } from 'react-router-dom';
import rawProducts from '../../data/products';
import { MoonLoader } from 'react-spinners';

const ItemDetailContainer = () => {

    const {id} = useParams()

    const [itemDetail, setItemDetail] = useState(null)

    // console.log(id);

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
        let itemDetail;
        
        try {
            itemDetail = response.find(product => product.id === parseInt(`${id}`));
            setItemDetail(itemDetail)
        } catch (error) {
            console.log(error);
        }
    })()
}, [id])

return (itemDetail ? <ItemDetail itemDetail={itemDetail}/> : <MoonLoader/>)
};

export default ItemDetailContainer;