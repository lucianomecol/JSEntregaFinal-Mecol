const productos = document.querySelector("#prueba__contenedor");


fetch('../productos.json')
    .then((resp)=> resp.json())
    .then(stockProductos => {
        stockProductos.cocina.forEach(productoDeCocina => {
            const {id, nombre, desc, descripcion, precio, precioDesc, img} = productoDeCocina;
            prueba__contenedor.innerHTML += `
            <div class="prueba__productos">
                <span class="prueba__descuento">-${desc}%</span>
                <div class="imagen">
                    <img src="${img}" alt="${descripcion}">
                    <div class="iconos">
                        <button onclick="agregarProducto(${id})" id="boton" class="fa-solid fa-cart-shopping"></button>
                    </div>
                </div>
                <div class="contenido">
                    <h2>${nombre}</h2>
                    <div class="prueba__precio">$${precioDesc} <span>$${precio}</span> </div>
                </div>
            </div>
    `
        });
    })
    .catch((err)=> console.log("error inesperado", err))