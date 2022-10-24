let carrito = JSON.parse(localStorage.getItem("carrito"))||[];
let dolarVenta;
let productosJSON = [];

//Función para obtener el valor del dólar en tiempo real
function obtenerValorDolar(){
    const URLGET = "https://api.bluelytics.com.ar/v2/latest";
    fetch(URLGET)
        .then(resultado => resultado.json())
        .then(valor => {
            dolarVenta = valor.blue.value_sell;
            obtenerJsonLocal();
        })
}

obtenerValorDolar();

//GETJSONLOCAL
function obtenerJsonLocal(){
    const URLJSON="../productos.json";
    fetch(URLJSON)
        .then( respuesta => respuesta.json())
        .then( productos => {
            productosJSON = productos;
            dibujarCatalogoProductos();
                    })
}

obtenerJsonLocal();

class ElementoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

const elementosCarrito = [];

const contenedorProductos = 
    document.getElementById('contenedor-productos').getElementsByClassName('row');

const rowContenedorProductos = contenedorProductos[0];

const contenedorCarritoCompras = document.querySelector("#items");

const contenedorFooterCarrito = document.getElementById("footerModal");

let cantidadCarrito = document.getElementById("cantidadCarrito");

function dibujarCarrito() {

    let sumaCarrito = 0;
    contenedorCarritoCompras.innerHTML = "";

    elementosCarrito.forEach(
        (elemento) => {
            let renglonesCarrito= document.createElement("tr");
            
            renglonesCarrito.innerHTML = `
                <td>${elemento.producto.id}</td>
                <td>${elemento.producto.nombre}</td>
                <td><input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="100" step="1" style="width: 50px;"/></td>
                <td>$ ${Math.round(elemento.producto.precio*dolarVenta)}</td>
                <td>$ ${Math.round((elemento.producto.precio*dolarVenta)*elemento.cantidad)}</td>
                <td><button id="eliminar-producto-${elemento.producto.id}" type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button></td>
            `;

            contenedorCarritoCompras.append(renglonesCarrito);

            sumaCarrito+=elemento.cantidad*Math.round(elemento.producto.precio*dolarVenta);

            cantidadCarrito.innerText = elementosCarrito.length;

            //Agregamos evento a carrito
            let cantidadProductos = document.getElementById(`cantidad-producto-${elemento.producto.id}`);
            
            cantidadProductos.addEventListener("change", (e) => {
                let nuevaCantidad = e.target.value;
                elemento.cantidad = nuevaCantidad;
                dibujarCarrito();
            });

            let borrarProducto = document.getElementById(`eliminar-producto-${elemento.producto.id}`);

            borrarProducto.addEventListener("click", (e) => {
                removerProductoCarrito(elemento);
                dibujarCarrito();
                cantidadCarrito.innerText = elementosCarrito.length;
            });

        }
    );
    
    if(elementosCarrito.length == 0) {
        contenedorFooterCarrito.innerHTML = `
            <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `;
    } else {
        contenedorFooterCarrito.innerHTML = `
            <th scope="row" colspan="5">Total de la compra: $${(sumaCarrito)}</th>
        `;
    }

}

function removerProductoCarrito(elementoAEliminar) {
    const elementosAMantener = elementosCarrito.filter((elemento) => elementoAEliminar.producto.id != elemento.producto.id);
    elementosCarrito.length = 0;

    elementosAMantener.forEach((elemento) => elementosCarrito.push(elemento));
}

function crearCard(producto) {
    //Botón
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-dark";
    botonAgregar.innerText = "Agregar";

    //Card body
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body text-center";
    cuerpoCarta.innerHTML = `
        <h5>${producto.nombre}</h5>
        <p>$ ${Math.round(producto.precio*dolarVenta)}</p>
    `;
    cuerpoCarta.append(botonAgregar);

    //Imagen
    let imagen = document.createElement("img");
    imagen.src = producto.foto;
    imagen.className = "card-img-top";
    imagen.alt = producto.nombre;

    //Card
    let carta = document.createElement("div");
    carta.className = "card";
    carta.style = "width: 12rem";
    carta.append(imagen);
    carta.append(cuerpoCarta);

    //Contenedor Card
    let contenedorCarta = document.createElement("div");
    contenedorCarta.className = "col-xs-6 col-sm-3 col-md-2";
    contenedorCarta.append(carta);

    //Agregar algunos eventos
    botonAgregar.onclick = () => {
        Swal.fire({
            title: '¡Producto agregado!',
            icon: 'success',
            text: producto.nombre + ' agregado al carrito de compras',
            showCloseButton: true,
            confirmButtonText: 'Ir al carrito'
          })
          .then((result) => {

                if(result.isConfirmed) {
                    const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {keyboard: true});
                    const modalToggle = document.getElementById('toggleMyModal'); 
                    myModal.show(modalToggle);
    
                }
            });

        let elementoExistente = elementosCarrito.find((elemento) => elemento.producto.id == producto.id);

        if(elementoExistente) {
            elementoExistente.cantidad+=1;
        } else {
            let elementoCarrito = new ElementoCarrito(producto, 1);
            elementosCarrito.push(elementoCarrito);
        }

        dibujarCarrito();

        //Almacenamiento en Local Storage
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));

    } 
    
    return contenedorCarta;

}

function dibujarCatalogoProductos() {
    rowContenedorProductos.innerHTML = "";
    obtenerValorDolar();
    
    productosJSON.forEach(
        (producto) => {
            let contenedorCarta = crearCard(producto);
            rowContenedorProductos.append(contenedorCarta);
        }
    );
}

let botonTerminarCompra = document.getElementById("botonTerminarCompra");
botonTerminarCompra.onclick = () => {
    if (elementosCarrito.length===0){
        Swal.fire({
            icon: 'error',
            title: 'No hay productos añadidos',
            text: 'Para finalizar la compra tiene que agregar algún producto'
          })
    } else {
        Swal.fire({
            icon: 'success',
            text: 'Para poder avanzar con la compra necesitamos sus datos',
            footer: '<a href="../secciones/contacto.html">Continuar</a>',
            showConfirmButton: false,
            showCloseButton: true,
          })
    }
}