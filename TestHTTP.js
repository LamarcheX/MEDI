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

const Link = Protocolo + "/" + Dominio

//Forma Moderna de hacer solicitudes HTTP
fetch(`${Link}/Pacientes`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// Datos a enviar en el cuerpo de la solicitud (formato JSON)
const data = {
    name: 'John Doe',
    email: 'johndoe@example.com'
};

// Convertir los datos a formato JSON
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
};

// Realizar la solicitud POST
fetch(`${Link}/Pacientes`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA");

//Test: node TestHTTP.js