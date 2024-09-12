// //Forma tradicionas de hacer solicitudes HTTP
// const xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://api.example.com/data');
// xhr.onload = () => {
//     if (xhr.status === 200) {
//         console.log(xhr.responseText);
//     } else {
//         console.error('Error al realizar la solicitud');
//     }
// };
// xhr.send();
const Protocolo = "http://localhost:3000"//"https"
const Dominio = "mediapi"
const Subdominio = "usuarios"

const url = `${Protocolo}/${Dominio}/${Subdominio}`;


function MandarDatos(params) {
    
    // Datos a enviar en el cuerpo de la solicitud (formato JSON)
    const data = {
        "_id": "123456789122222222222222222222222222", // Identificador único del usuario.
        "nombre": "ElPepe", // Nombre completo del usuario.
        "email": "ElPepe@Email.com", // Correo electrónico del usuario.
        "contraseña": "AAAAAAAAAAAAAAAAAAAAAAa", // Contraseña del usuario (al guardarse se encriptara automaticamente).
        "rol": "admin",
        "fecha_creacion": "December 25, 1995", // Fecha de creación del usuario en el sistema.
        "ultima_sesion": "December 12, 2023", // Última vez que el usuario accedió al sistema.
    };


    fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => console.log("Success:", response));
}

function BorrarDatos(params) {

    const Method = {
        method: 'DELETE', // Method itself
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        // No need to have body, because we don't send nothing to the server.
    }

    // Make the HTTP Delete call using fetch api
    fetch(url, Method)
        .then(response => response.json())
        .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
        .catch(err => console.log(err)) // Do something with the error
}

MandarDatos()
// BorrarDatos()
//Forma Moderna de hacer solicitudes HTTP
fetch(`${url}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

const Response = fetch(`${url}/id:66e345f3c136e7af41461e27`)
const Data = Response.json

let InformacionDetallada = Data;
console.log(`InformacionDetallada: ${InformacionDetallada}`)
//Test: node TestHTTP.js