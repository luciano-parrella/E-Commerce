//Agregado Storage
let atletas =[];
if(localStorage.getItem("atletas")!=null){
    atletas=JSON.parse(localStorage.getItem("atletas"));
}

let campoAtleta = document.getElementById("atleta");
let campoPesoLevantado = document.getElementById("pesoLevantado");
let campoCantidadDeRepeticiones = document.getElementById("cantidadDeRepeticiones");
let campoRmEstimada = document.getElementById("rmEstimada");
let botonCalcular = document.getElementById("calcular");

let atleta;
campoAtleta.onchange=()=>{
    atleta=campoAtleta.value.toUpperCase();

    //Almacenamiento en Local Storage
    atletas.push(atleta);
    localStorage.setItem("atletas",JSON.stringify(atletas));
}

let pesoLevantado;
campoPesoLevantado.onchange=()=>{
    pesoLevantado=campoPesoLevantado.value;
}

let cantidadDeRepeticiones;
campoCantidadDeRepeticiones.onchange=()=>{
    cantidadDeRepeticiones=campoCantidadDeRepeticiones.value;
}

let tablaCalculadora=document.createElement("table");
tablaCalculadora.className="table table-dark table-striped table-hover";
let tablaCalculadoraBody = document.createElement("tbody");
let seccionTablaCalculadora = document.getElementById("seccionTablaCalculadora");
seccionTablaCalculadora.append(tablaCalculadora);
tablaCalculadora.innerHTML=`
    <thead>
        <tr>
            <th scope="col">Porcentajes</th>
            <th scope="col">95%</th>
            <th scope="col">90%</th>
            <th scope="col">85%</th>
            <th scope="col">80%</th>
            <th scope="col">75%</th>
            <th scope="col">70%</th>
            <th scope="col">65%</th>
            <th scope="col">60%</th>
        </tr>
    </thead>
    `;

let resultado;
botonCalcular.onclick=()=>{
    campoRmEstimada.value = Math.round(pesoLevantado/(1.0278-(0.0278*cantidadDeRepeticiones)));
    resultado=campoRmEstimada.value;
    tablaCalculadoraBody.innerHTML+=`
            <tr>
                <th scope="row">${atleta}</th>
                <td>${Math.round(resultado*0.95)}</td>
                <td>${Math.round(resultado*0.90)}</td>
                <td>${Math.round(resultado*0.85)}</td>
                <td>${Math.round(resultado*0.80)}</td>
                <td>${Math.round(resultado*0.75)}</td>
                <td>${Math.round(resultado*0.70)}</td>
                <td>${Math.round(resultado*0.65)}</td>
                <td>${Math.round(resultado*0.60)}</td>
            </tr>
    `;  
    tablaCalculadora.append(tablaCalculadoraBody);

    Swal.fire({
        icon: 'success',
        title: '¡Atleta agregado/a!',
        text: atleta + ' agregado/a a la tabla'
      })
}
