let carrito = []
let producto;
let productoDescomp = [];


const carritoContenedor = document.getElementById("carritoContenedor");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const precioTotal = document.getElementById("precioTotal");
const buton = document.getElementById("boton");
const procesarCompra = document.getElementById("procesarCompra");


if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
        if (carrito.length === 0) {
            Swal.fire({
                title: "¡Tu carrito está vacio!",
                text: "Compra algo para continuar con la compra",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        } else {
            location.href = "https://www.mercadopago.com/";
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || []
    mostrarCarrito()
})

vaciarCarrito.addEventListener('click', () => {
    carrito.length = []
    mostrarCarrito()
})

fetch('../productos.json')
    .then((resp) => resp.json())
    .then(stockProductos => {
        producto = Object.values(stockProductos);
        producto.forEach(articulo => {
            articulo.forEach(articulos => {
                productoDescomp.push(articulos);
            })
        })
    })
    .catch((err) => console.log("error inesperado", err))


function agregarProducto(id) {
    const siExiste = carrito.some(prod => prod.id === id)
    if (siExiste) {
        const prod = carrito.map(prod => {
            if (prod.id === id) {
                prod.cantidad++
            }
        })
    }
    else {
        const item = productoDescomp.find((prod) => prod.id === id)
        carrito.push(item)
    }
    mostrarCarrito()
}

const mostrarCarrito = () => {
    const productoCarrito = document.querySelector('.modal .modal-body')

    productoCarrito.innerHTML = ''
    carrito.forEach((prod) => {
        const { id, nombre, cantidad, precioDesc, img } = prod
        productoCarrito.innerHTML += `
            <div class="modal-contenedor">
                <div class="contenedor-img">
                    <img class="img-fluid img-carrito" src="${img}"/>
                </div>
                <div>
                    <p>Producto: ${nombre}</p>
                    <p>Precio: ${precioDesc}</p>
                    <p>Cantidad: ${cantidad}</p>
                    <button onclick="eliminarProducto(${id})" class="btn btn-danger">Eliminar producto</button>
                </div>
            `
    })

    precioTotal.innerHTML = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precioDesc, 0)

    carritoContenedor.textContent = carrito.length
    guardarLocalStorage()
}

function eliminarProducto(id) {
    const muebleId = id
    carrito = carrito.filter((mueble) => mueble.id !== muebleId)
    mostrarCarrito()
}

function guardarLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}
