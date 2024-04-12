const form = document.getElementById('formRegistroCartas');
const cont_card_img = document.querySelector('#section_cartas');

// carga del fetch
document.addEventListener("DOMContentLoaded", () => {
    fetch("../json/data.json")
        .then((response) => response.json())
        .then((data) => procesar_cartas(data.data))
        .catch((error) => console.error("Error al cargar las cartas:", error));
});

// funcion para cargar las cartas
let procesar_cartas = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
    data.forEach((item) => {
        crearCarta(item.numero, item.carta);
    });
};

// se escucha los eventos de la from
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const numero = document.querySelector("#numeroCarta").value;
    const carta = document.querySelector("#nombreCarta").value;
    if (numero >= 1 && numero <= 13) {
        actualizarLocaleStorage(numero, carta);
    } else {
        alert("No se puede agregar la carta");
        document.querySelector("#numeroCarta").value = "";
        document.querySelector("#nombreCarta").value = "";
    }
})

// se escucha los eventos de las cartas
cont_card_img.addEventListener('click', function (event) {
    if (event.target.closest('button')) {
        const button = event.target.closest('button');
        const numeroCarta = button.getAttribute('numero');
        const carta = button.getAttribute('carta');
        actualizarLocaleStorage(numeroCarta, carta);
    }
});

// agregamos la carta al localStorage
const actualizarLocaleStorage = (numero, carta) => {
    let cartas = JSON.parse(localStorage.getItem("data")) || [];
    let index = cartas.findIndex((c) => c.numero === numero);

    if (index !== -1) {
        cartas[index].valor++;
    } else {
        crearCarta(numero, carta);
        cartas.push({ numero, carta, valor: 1 });
    }
    localStorage.setItem("data", JSON.stringify(cartas));
    actualizarTablaCartas();
};

// funcion para crear las cartas
let crearCarta = (numero, carta) => {
    let section_cartas = document.querySelector("#section_cartas");
    const card_content = document.createElement("button");
    card_content.classList.add("w-1/2", "md:w-1/3", "lg:w-1/4", "p-2");
    card_content.setAttribute("numero", numero);
    card_content.setAttribute("carta", carta);

    const card = document.createElement("img");
    card.src = `../images/${numero}.png`;
    card.classList.add("w-full", "h-auto", "object-cover", "rounded-lg");

    card_content.appendChild(card);
    section_cartas.appendChild(card_content);

};

// se cargan en la tabla
const actualizarTablaCartas = () => {
    const cartas = JSON.parse(localStorage.getItem("data")) || [];
    const tbody = document.querySelector("#tablaCartas");
    tbody.innerHTML = "";
    cartas.sort((a, b) => b.valor - a.valor);
    cartas.forEach((carta, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td class="border px-4 py-2">${index + 1}
        </td><td class="border px-4 py-2">${carta.carta}
        </td><td class="border px-4 py-2">${carta.valor}</td>`;
        tbody.appendChild(tr);
    });
};