// PRODUCTOS
const productos = [
    // seccion 1
    {
        id: "diseño-1",
        titulo: "Diseño marmol",
        imagen: "./img/diseño/diseño1.jpg",
        categoria: {
            nombre: "Diseños",
            id: "diseños"
        },
        precio: 1000
    },
    {
        id: "diseño-2",
        titulo: "Diseño llama",
        imagen: "./img/diseño/diseño2.jpg",
        categoria: {
            nombre: "Diseños",
            id: "diseños"
        },
        precio: 1000
    },
    {
        id: "diseño-3",
        titulo: "Diseño buho dona",
        imagen: "./img/diseño/diseño3.jpg",
        categoria: {
            nombre: "Diseños",
            id: "diseños"
        },
        precio: 1000
    },
    {
        id: "diseño-4",
        titulo: "Diseño mapa mundi",
        imagen: "./img/diseño/diseño4.jpg",
        categoria: {
            nombre: "Diseños",
            id: "diseños"
        },
        precio: 1000
    },
    {
        id: "diseño-5",
        titulo: "Diseño anteojos",
        imagen: "./img/diseño/diseño5.jpg",
        categoria: {
            nombre: "Diseños",
            id: "diseños"
        },
        precio: 1000
    },
    {
        id: "diseño-6",
        titulo: "Diseño bailarina",
        imagen: "./img/diseño/diseño6.jpg",
        categoria: {
            nombre: "Diseños",
            id: "diseños"
        },
        precio: 1000
    },
    {
        id: "diseño-7",
        titulo: "Diseño cosas boas",
        imagen: "./img/diseño/diseño7.jpg",
        categoria: {
            nombre: "Diseños",
            id: "diseños"
        },
        precio: 1000
    },
    // seccion 2
    {
        id: "mini-1",
        titulo: "Bolsillo cuero",
        imagen: "./img/mini/bolsillo1.jpg",
        categoria: {
            nombre: "Bolsillo",
            id: "mini"
        },
        precio: 1000
    },
    {
        id: "mini-2",
        titulo: "Bolsillo marfil",
        imagen: "./img/mini/bolsillo2.jpg",
        categoria: {
            nombre: "Bolsillo",
            id: "mini"
        },
        precio: 1000
    },
    {
        id: "mini-3",
        titulo: "Bolsillo mini L",
        imagen: "./img/mini/bolsillo3.jpg",
        categoria: {
            nombre: "Bolsillo",
            id: "mini"
        },
        precio: 1000
    },
    {
        id: "mini-4",
        titulo: "Bolsillo mini V",
        imagen: "./img/mini/bolsillo4.jpg",
        categoria: {
            nombre: "Bolsillo",
            id: "mini"
        },
        precio: 1000
    },
    // seccion 3
    {
        id: "colores-1",
        titulo: "Color morado",
        imagen: "./img/colores/colores1.jpg",
        categoria: {
            nombre: "Colores",
            id: "colores"
        },
        precio: 1000
    },
    {
        id: "colores-2",
        titulo: "Color marfil",
        imagen: "./img/colores/colores2.jpg",
        categoria: {
            nombre: "Colores",
            id: "colores"
        },
        precio: 1000
    },
    {
        id: "colores-3",
        titulo: "Color arcoiris",
        imagen: "./img/colores/colores3.jpg",
        categoria: {
            nombre: "Colores",
            id: "colores"
        },
        precio: 1000
    },
    {
        id: "colores-4",
        titulo: "Colores pastel",
        imagen: "./img/colores/colores4.jpg",
        categoria: {
            nombre: "Colores",
            id: "colores"
        },
        precio: 1000
    },
    {
        id: "colores-5",
        titulo: "Color pastel x2",
        imagen: "./img/colores/colores5.jpg",
        categoria: {
            nombre: "Colores",
            id: "colores"
        },
        precio: 1000
    }
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((ca, producto) => ca + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}