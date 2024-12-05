const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
  nav.classList.add("visible");
});
cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
});


// // --------------------------------
// // // Json


const productos = [
  {
    id: 1,
    nombre: "Croton",
    precio: 400,
    imagen: "card-1.com.png",
    descripcion:
      "Estas plantas son originarias principalmente del sur de la India,",
    categoria: "Interior",
    stock: 15,
  },

  {
    id: 2,
    nombre: "Cactus",
    precio: 500,
    imagen: "card-2.com.png",
    descripcion:
      "Los cactus son plantas que se caracterizan por soportar temperaturas y almacenar agua",
    categoria: "Exterior",
    stock: 7,
  },

  {
    id: 3,
    nombre: "Violeta",
    precio: 850,
    imagen: "card-3.com.png",
    descripcion:
      "Estas son ideales para dar vida a cualquier rincón de tu hogar.",
    categoria: "Exterior",
    stock: 20,
  },

  {
    id: 4,
    nombre: "Dieffenbachia",
    precio: 900,
    imagen: "card-4.com.png",
    descripcion: "La diefembaquia es una especie nativa del sur de México,",
    categoria: "Interior",
    stock: 50,
  },

  {
    id: 5,
    nombre: "violeta de los alpes",
    precio: 500,
    imagen: "card-5.com.png",
    descripcion:
      "Esta planta brota en otoño y florece durante el invierno y la primavera",
    categoria: "Exterior",
    stock: 5,
  },

  {
    id: 6,
    nombre: "potus",
    precio: 2000,
    imagen: "card-6.com.png",
    descripcion:
      "Planta de interior que se caracteriza por su follaje variegado",
    categoria: "Interior",
    stock: 21,
  },

  {
    id: 7,
    nombre: "Suculentas",
    precio: 1000,
    imagen: "card-7.com.png",
    descripcion:
      "Las suculentas son plantas que se adaptan a diferentes climas",
    categoria: "Exterior",
    stock: 15,
  },

  {
    id: 8,
    nombre: "hortensias",
    precio: 4000,
    imagen: "card-8.com.png",
    descripcion: "Plantas ornamentales nativas del sur y este de Asia",
    categoria: "Exterior",
    stock: 12,
  },

  {
    id: 9,
    nombre: "jazmin",
    precio: 3000,
    imagen: "card-9.com.png",
    descripcion: "Árbol es nativo del oeste de África.",
    categoria: "Exterior",
    stock: 20,
  },
];

// Función para guardar los productos en localStorage  
function guardarProductosEnStorage() {  
    localStorage.setItem('productos', JSON.stringify(productos));  
}  

// Función para agregar contenido a un artículo específico  
function agregarContenido(articuloId, producto) {  
    const articulo = document.getElementById(articuloId);  

    // Agregar contenido al artículo  
    articulo.innerHTML = `  
        <figure>  
          <img src="./img/${producto.imagen}" alt="${producto.nombre}" />           
        </figure>   
        <h3 class="subtitulo-card">${producto.nombre}</h3>  
        <p class="descripcion-card">${producto.descripcion}</p>  
        <p class="precio-producto-card">Precio: $${producto.precio.toFixed(2)}</p>  
     <input type="number" id="cantidad-${producto.id}" value="1" min="1" max="${producto.stock}" />   
        <button class="boton-productos" onclick="añadirAlCarrito(${producto.id})">Añadir al carrito</button>  
    `;  
}  

// Función para añadir un producto al carrito  
function añadirAlCarrito(productId) {  
    const producto = productos.find(item => item.id === productId);  
    const cantidadInput = document.getElementById(`cantidad-${productId}`);  
    const cantidad = parseInt(cantidadInput.value);  

    // Verificar que la cantidad sea válida  
    if (cantidad < 1 || cantidad > producto.stock) {  
        alert("Por favor, ingresa una cantidad válida.");  
        return;  
    }  

    // Obtener el carrito del localStorage o inicializar uno vacío  
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];  

    // Verificar si el producto ya está en el carrito  
    const productoExistente = carrito.find(item => item.id === producto.id);  
    if (productoExistente) {  
        // Actualizar la cantidad  
        if ((productoExistente.cantidad + cantidad) <= producto.stock) {  
            productoExistente.cantidad += cantidad;  
        } else {  
            alert("No hay suficiente stock para agregar esta cantidad.");  
            return;  
        }  
    } else {  
        // Si no existe, agregarlo al carrito  
        carrito.push({ ...producto, cantidad: cantidad });  
    }  

    // Guardar el carrito actualizado en localStorage  
    localStorage.setItem('carrito', JSON.stringify(carrito));  
    mostrarCarrito();  
}  

// Función para mostrar los productos en el carrito  
function mostrarCarrito() {  
    const cartList = document.getElementById('cartList');  
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];  

    // Limpiar la lista de carrito antes de mostrar productos  
    cartList.innerHTML = '';  

    if (carrito.length === 0) {  
        cartList.innerHTML = '<p>El carrito está vacío.</p>';  
    } else {  
        carrito.forEach(producto => {  
            const div = document.createElement('div');  
            div.className = 'product-item';  
            div.textContent = `${producto.nombre} - Precio: $${producto.precio}, Cantidad: ${producto.cantidad}`;  
            cartList.appendChild(div);  
        });  
    }  
}  

// Agregar contenido a cada artículo  
productos.forEach((producto) => {  
    agregarContenido(`card-${producto.id}`, producto);  
});  

// Guardar productos en localStorage al cargar la página  
document.addEventListener('DOMContentLoaded', () => {  
    guardarProductosEnStorage();  
    mostrarCarrito(); // Mostrar el carrito  
}); 


// // validar formulario

document.querySelector('.form-contacto').addEventListener('submit', function(event) {  
    event.preventDefault(); // Evita el envío automático del formulario  

    // Limpiar mensajes de error previos  
    document.getElementById('name-error').textContent = '';  
    document.getElementById('apellido-error').textContent = '';  
    document.getElementById('mail-error').textContent = '';  
    document.getElementById('mensaje-error').textContent = '';  

    // Obtener los valores de los campos  
    const nombre = document.getElementById('nombre').value.trim();  
    const apellido = document.getElementById('apellido').value.trim();  
    const correo = document.getElementById('correo').value.trim();  
    const mensaje = document.getElementById('textarea').value.trim();  

    let esValido = true; // Variable para rastrear la validez del formulario  

    // Validar nombre  
    if (nombre === '') {  
        document.getElementById('name-error').textContent = 'Por favor ingresa tu nombre.';  
        esValido = false;  
    }  

    // Validar apellido  
    if (apellido === '') {  
        document.getElementById('apellido-error').textContent = 'Por favor ingresa tu apellido.';  
        esValido = false;  
    }  

    // Validar correo electrónico  
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  
    if (correo === '' || !emailRegex.test(correo)) {  
        document.getElementById('mail-error').textContent = 'Por favor ingresa un correo electrónico válido.';  
        esValido = false;  
    }  

    // Validar mensaje  
    if (mensaje === '') {  
        document.getElementById('mensaje-error').textContent = 'Por favor ingresa un comentario.';  
        esValido = false;  
    }  

    // Si todos los campos son válidos, enviar el formulario  
    if (esValido) {  
        alert('Formulario enviado con éxito.');  
        this.submit(); // Enviar el formulario  
    }  
});  
   

// Inicializar y renderizar el carrito al cargar la página  
document.addEventListener('DOMContentLoaded', () => {  
    mostrarProductos();  
    renderizarCarrito(); // Mostrar el carrito almacenado en localStorage  
});  

// Manejo de eventos para agregar productos al carrito  
document.body.addEventListener('click', function(event) {  
    if (event.target.classList.contains('boton-productos')) {  
        const productoId = event.target.getAttribute('data-id');  
        const producto = productos.find(p => p.id == productoId);  
        agregarAlCarrito(producto); // Agrega el producto al carrito  

        // Mensaje de confirmación (opcional)  
        alert(`${producto.nombre} se ha agregado al carrito.`);  
    }  
});  

// Manejo de eventos para eliminar un producto del carrito  
carroContainer.addEventListener('click', function(event) {  
    if (event.target.classList.contains('remove')) {  
        const productoId = event.target.getAttribute('data-id');  
        let carrito = obtenerCarrito();  
        carrito = carrito.filter(p => p.id != productoId); // Filtrar el carrito para eliminar el producto  
        guardarCarrito(carrito); // Guardar carrito actualizado en localStorage  
        renderizarCarrito(); // Renderizar el carrito después de eliminar  
    }  
});  

