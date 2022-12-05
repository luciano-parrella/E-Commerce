import React, { useContext, useState } from 'react';
import { Shop } from '../../contexts/Shop';
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import Swal from 'sweetalert2';
import generateOrderObject from "../../services/generateOrderObject";

const CheckoutForm = () => {

    const { products, calculateTotal } = useContext(Shop)

    const total = calculateTotal();

    const valorInicial = {
        nombre: '',
        email: '',
        telefono: '',
        products,
        total
    }

    const [user, setUser] = useState(valorInicial)

    const capturarInputs = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }



    const guardarDatos = async(e)=>{
        e.preventDefault();
        
        try {
            // const generatedOrder = generateOrderObject(valorInicial)
            generateOrderObject(valorInicial)
            
            let productOutOfStock = [];
            let productsInFirebase = [];
            //Chequear el stock de los productos en el carrito
            for (const productInCart of products) {
                const docRef = doc(db, "products", productInCart.id);
                const docSnap = await getDoc(docRef);
                const productInFirebase = { ...docSnap.data(), id: docSnap.id }
                productsInFirebase.push(productInFirebase);
                if (productInCart.quantity > productInFirebase.stock)
                    productOutOfStock.push(productInCart);
            }

            if (productOutOfStock.length === 0) {
                //Disminuir el stock existente
    
                for (const productInCart of products) {
                    const productInFirebase = productsInFirebase.find(
                        (product) => product.id === productInCart.id
                    );
                    const productRef = doc(
                        db,
                        "products",
                        productInCart.id
                    );
                    // Actualizo el stock del producto
                    await updateDoc(productRef, {
                        stock:
                            productInFirebase.stock -
                            productInCart.quantity,
                    });
                }
    
                //Generar la orden
                const docRef = await addDoc(
                    collection(db, "orders"),
                    {...user}
                );

                Swal.fire({
                    title: 'Compra confirmada',
                    text: `Se generó la orden correctamente con ID: ${docRef.id}`,
                    icon: 'success',
                    confirmButtonText: 'Ok',
                  })


            } else {
                let mensaje = "";
                for (const product of productOutOfStock) {
                    const productInFirebase = productsInFirebase.find(
                        (productFirebase) => productFirebase.id === product.id
                    );
                    console.log(productInFirebase);
                    mensaje += `${product.name}, stock disponible: ${productInFirebase.stock}, cantidad pedida: ${product.quantity}\n`;
                }
                alert(`Hay producto/s fuera de stock: \n${mensaje}`);
            }
            
        } catch (error) {
            console.log(error)
        }
        setUser({...valorInicial})
    }

  return (
    <>
    <div className="container-sm pt-4 pb-5">
        <div className="h1 text-center py-3">Información de Contacto</div>  
            <form className="row g-3" id="formularioContacto" onSubmit={guardarDatos}>
                <div className="col-md-6">
                    <label for="inputName" className="form-label">Nombre y Apellido</label>
                    <input type="text" name="nombre" className="form-control" id="inputName" required onChange={capturarInputs} value={user.nombre}/>
                </div>
                <div className="col-md-6">
                    <label for="inputEmail4" className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" id="inputEmail4" required onChange={capturarInputs} value={user.email}/>
                </div>
                <div className="col-md-6">
                    <label for="inputPhone" className="form-label">Teléfono</label>
                    <input type="number" name='telefono' className="form-control" id="inputPhone" placeholder="" required onChange={capturarInputs} value={user.telefono}/>
                </div>
                <div className="col-md-6">
                    <label for="inputAddress" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="" required/>
                </div>
                <div className="col-md-6">
                    <label for="inputCiudad" className="form-label">Ciudad</label>
                    <input type="text" className="form-control" id="inputCity" required/>
                </div>
                <div className="col-md-4">
                    <label for="inputProvincia" className="form-label">Provincia</label>
                    <select id="inputState" className="form-select" required>
                        <option selected value="">Seleccionar...</option>
                        <option>Buenos Aires</option>
                        <option>Ciudad Autónoma de Buenos Aires</option>
                        <option>Catamarca</option>
                        <option>Chaco</option>
                        <option>Chubut</option>
                        <option>Córdoba</option>
                        <option>Corrientes</option>
                        <option>Entre Ríos</option>
                        <option>Formosa</option>
                        <option>Jujuy</option>
                        <option>La Pampa</option>
                        <option>La Rioja</option>
                        <option>Mendoza</option>
                        <option>Misiones</option>
                        <option>Neuquén</option>
                        <option>Río Negro</option>
                        <option>Salta</option>
                        <option>San Juan</option>
                        <option>San Luis</option>
                        <option>Santa Cruz</option>
                        <option>Santa Fé</option>
                        <option>Santiago del Estero</option>
                        <option>Tierra del Fuego, Antártida e Islas del Atlántico Sur</option>
                        <option>Tucumán</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label for="inputCodigoPostal" className="form-label">Código Postal</label>
                    <input type="text" className="form-control" id="inputZip" required/>
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required/>
                        <label className="form-check-label" for="invalidCheck2">Acepto los términos y condiciones</label>
                    </div>
                </div>
                <div className="col-12 text-center">
                    <button id="botonFormulario" type="submit" className="btn btn-primary">Confirmar compra</button>
                </div>
            </form>
    </div>
    </>
  )
}

export default CheckoutForm