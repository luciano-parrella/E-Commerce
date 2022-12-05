import React, { useEffect, useState } from "react";
import ItemDetail from "../../components/ItemDetail";
import { useParams } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const ItemDetailContainer = () => {

    const {id} = useParams()

    const [itemDetail, setItemDetail] = useState(null)

useEffect(()=> {
    ( async ()=> {
        try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setItemDetail({...docSnap.data(), id: docSnap.id})
        } else {
        // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        } catch (error) {
            console.log(error);
        }
    })()
}, [id])

return (itemDetail ? <ItemDetail itemDetail={itemDetail}/> : <MoonLoader/>)
};

export default ItemDetailContainer;