import React from 'react';
import './styles.css';
import { useEffect, useState } from 'react';
import ItemList from '../../components/ItemList';
import { useParams } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config';

export default function ItemListContainer () {

    const [products, setProducts] = useState([])

    const {categoryId} = useParams()

    useEffect(()=> {
        ( async ()=> {
            try {
            let q;
            if (categoryId) {
                q = query(collection(db, "products"), where("category", "==", categoryId))
            } else {
                q = query(collection(db, "products"));
            }
            const querySnapshot = await getDocs(q);
            const productosFirebase = [];
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            productosFirebase.push({...doc.data(), id: doc.id})
            });
            setProducts(productosFirebase);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [categoryId])

    return (
         <div className = 'item-list-container'>
            {products.length ? <ItemList products={products}/> : <MoonLoader/>}
         </div>
    )
}

