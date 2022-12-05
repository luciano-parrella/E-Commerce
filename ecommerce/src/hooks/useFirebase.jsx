import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase/config'

const useFirebase = (categoryId) => {

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

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
            console.log(doc.id, " => ", doc.data());
            productosFirebase.push({...doc.data(), id: doc.id})
            });
            setData(productosFirebase);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false)
            }
        })()
    }, [categoryId])
    
  return [data, error, loading]
}

export default useFirebase