import { productosDB } from './data.js';


// Variables globales
let productosFiltrados = [...productosDB];
let productosMostrados = 0;
const PRODUCTOS_POR_PAGINA = 10;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    inicializarApp();
});

function inicializarApp() {
    renderizarProductos(productosDB, true);
    configurarFiltros();
    configurarBusqueda();
    configurarMenuMobile();
    configurarNewsletter();
    configurarModal();
}

// Renderizar productos
function renderizarProductos(productos, reiniciar = false) {
    const contenedor = document.getElementById('productos-lista');
    const countElement = document.getElementById('count');
    
    // Si es reinicio, resetear el contador y limpiar el contenedor
    if (reiniciar) {
        productosMostrados = 0;
        contenedor.innerHTML = '';
        // Eliminar botón "Ver más" si existe
        const btnExistente = document.getElementById('btn-ver-mas-productos');
        if (btnExistente) {
            btnExistente.remove();
        }
    }
    
    countElement.textContent = productos.length;
    
    if (productos.length === 0) {
        contenedor.innerHTML = `
            <div class="no-resultados">
                <i class="fas fa-search"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta ajustar los filtros de búsqueda</p>
            </div>
        `;
        return;
    }
    
    // Calcular qué productos mostrar
    const inicio = productosMostrados;
    const fin = Math.min(productosMostrados + PRODUCTOS_POR_PAGINA, productos.length);
    const productosAMostrar = productos.slice(inicio, fin);
    
// En la función renderizarProductos, agregar la marca en el HTML
const nuevosProductosHTML = productosAMostrar.map(producto => `
    <div class="producto-card" data-id="${producto.id}" data-categoria="${producto.categoria}">
        <div class="producto-info-detalle">
            <div>
                <span class="producto-categoria">${producto.categoria === 'belleza' ? 'Belleza' : 'Tecnología'}</span>
                <span class="producto-marca">${producto.marca}</span>
                <h2 class="producto-titulo">${producto.nombre}</h2>
                
                <div class="producto-descripcion">
                    <h3>Descripción</h3>
                    <p>${producto.descripcion}</p>
                </div>
                
                <div class="producto-caracteristicas">
                    ${producto.caracteristicas.map(caract => `
                        <div class="caracteristica-item">
                            <i class="fas fa-check-circle"></i>
                            <span>${caract}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="producto-acciones">
                <button class="btn-ver-mas" data-id="${producto.id}">
                    <i class="fas fa-info-circle"></i>
                    Ver más detalles
                </button>
            </div>
        </div>
        
        <div class="producto-imagen-container">
            <div class="producto-imagen-wrapper">
                <img src="${producto.imagen}" loading="lazy" alt="${producto.nombre}">
            </div>
        </div>
    </div>
`).join('');
    
    contenedor.insertAdjacentHTML('beforeend', nuevosProductosHTML);
    
    // Actualizar contador de productos mostrados
    productosMostrados = fin;
    
    // Agregar o actualizar botón "Ver más"
    gestionarBotonVerMas(productos);
    
    // Agregar eventos a botones "Ver más"
    document.querySelectorAll('.btn-ver-mas').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            mostrarDetalleProducto(id);
        });
    });
    
    // Animación de entrada
    animarProductos();
}

// Gestionar botón "Ver más productos"
function gestionarBotonVerMas(productos) {
    // Buscar si ya existe el botón
    let btnVerMas = document.getElementById('btn-ver-mas-productos');
    
    // Si ya mostramos todos los productos, eliminar el botón
    if (productosMostrados >= productos.length) {
        if (btnVerMas) {
            btnVerMas.remove();
        }
        return;
    }
    
    // Si no existe el botón, crearlo
    if (!btnVerMas) {
        const contenedorCatalogo = document.querySelector('.catalogo-main');
        btnVerMas = document.createElement('div');
        btnVerMas.id = 'btn-ver-mas-productos';
        btnVerMas.className = 'contenedor-ver-mas';
        btnVerMas.innerHTML = `
            <button class="btn-ver-mas-productos">
                <i class="fas fa-chevron-down"></i>
                Ver más productos
                <span class="productos-restantes">(${productos.length - productosMostrados} restantes)</span>
            </button>
        `;
        contenedorCatalogo.appendChild(btnVerMas);
        
        // Agregar evento al botón
        btnVerMas.querySelector('.btn-ver-mas-productos').addEventListener('click', function() {
            cargarMasProductos();
        });
    } else {
        // Actualizar el contador de productos restantes
        const span = btnVerMas.querySelector('.productos-restantes');
        if (span) {
            span.textContent = `(${productos.length - productosMostrados} restantes)`;
        }
    }
}

// Cargar más productos
function cargarMasProductos() {
    renderizarProductos(productosFiltrados, false);
    
    // Scroll suave hacia los nuevos productos
    const todosLosProductos = document.querySelectorAll('.producto-card');
    const ultimoProductoAnterior = todosLosProductos[productosMostrados - PRODUCTOS_POR_PAGINA];
    
    if (ultimoProductoAnterior) {
        setTimeout(() => {
            ultimoProductoAnterior.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

// Configurar filtros
function configurarFiltros() {
    const radios = document.querySelectorAll('input[name="categoria"]');
    
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            filtrarProductos();
        });
    });
    
    // Botón limpiar filtros
    document.querySelector('.btn-limpiar-filtros').addEventListener('click', function() {
        document.querySelector('input[value="todos"]').checked = true;
        document.getElementById('buscar-producto').value = '';
        filtrarProductos();
    });
}

// Configurar búsqueda
function configurarBusqueda() {
    const inputBuscar = document.getElementById('buscar-producto');
    
    inputBuscar.addEventListener('input', function() {
        filtrarProductos();
    });
}

// Filtrar productos
function filtrarProductos() {
    const categoriaSeleccionada = document.querySelector('input[name="categoria"]:checked').value;
    const textoBusqueda = document.getElementById('buscar-producto').value.toLowerCase();
    
    let productos = [...productosDB];
    
    // Filtrar por categoría
    if (categoriaSeleccionada !== 'todos') {
        productos = productos.filter(p => p.categoria === categoriaSeleccionada);
    }
    
    // Filtrar por búsqueda (incluye nombre, marca y descripción)
    if (textoBusqueda) {
        productos = productos.filter(p => 
            p.nombre.toLowerCase().includes(textoBusqueda) ||
            p.marca.toLowerCase().includes(textoBusqueda) ||
            p.descripcion.toLowerCase().includes(textoBusqueda)
        );
    }
    
    productosFiltrados = productos;
    renderizarProductos(productos, true);
}

// Configurar modal
function configurarModal() {
    const modal = document.getElementById('modal-producto');
    const btnCerrar = document.querySelector('.modal-cerrar');
    
    // Cerrar modal al hacer clic en la X
    btnCerrar.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
}

// Mostrar detalle del producto en modal
function mostrarDetalleProducto(id) {
    const producto = productosDB.find(p => p.id === id);
    if (producto) {
        // Actualizar contenido del modal
        document.getElementById('modal-imagen').src = producto.imagen;
        document.getElementById('modal-imagen').alt = producto.nombre;
        document.getElementById('modal-categoria').textContent = 
            producto.categoria === 'belleza' ? 'Belleza' : 'Tecnología';
        document.getElementById('modal-titulo').textContent = producto.nombre;
        document.getElementById('modal-marca').textContent = producto.marca;
        document.getElementById('modal-descripcion').textContent = producto.descripcion;
        
        // Actualizar características
        const caracteristicasContainer = document.getElementById('modal-caracteristicas');
        caracteristicasContainer.innerHTML = producto.caracteristicas.map(caract => `
            <div class="caracteristica-item">
                <i class="fas fa-check-circle"></i>
                <span>${caract}</span>
            </div>
        `).join('');
        
        // Configurar botón de comprar con información del producto actual
        const btnComprar = document.getElementById('btn-comprar');
        btnComprar.onclick = function() {
            const numero = '50689523778';
            const mensaje = encodeURIComponent(
                `¡Hola! Estoy interesado en el siguiente producto:\n\n` +
                `📦 *${producto.nombre}*\n` +
                `🏷️ Marca: ${producto.marca}\n` +
                `📂 Categoría: ${producto.categoria === 'belleza' ? 'Belleza' : 'Tecnología'}\n\n` +
                `¿Me podrías dar más información? 😊`
            );
            const url = `https://wa.me/${numero}?text=${mensaje}`;
            window.open(url, '_blank');
        };
        
        // Configurar botón de cerrar usando la CLASE
        const btnCerrar = document.querySelector('.modal-cerrar');
        if (btnCerrar) {
            btnCerrar.onclick = function() {
                document.getElementById('modal-producto').style.display = 'none';
            };
        }
        
        // Mostrar modal
        document.getElementById('modal-producto').style.display = 'block';
    }
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById('modal-producto').style.display = 'none';
}

// Agregar evento al botón de cerrar
document.getElementById('modal-cerrar').addEventListener('click', cerrarModal);

// Opcional: Cerrar modal al hacer clic fuera de él
document.getElementById('modal-producto').addEventListener('click', function(e) {
    if (e.target === this) {
        cerrarModal();
    }
});

// Animación de productos
function animarProductos() {
    const productos = document.querySelectorAll('.producto-card');
    
    productos.forEach((producto, index) => {
        producto.style.opacity = '0';
        producto.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            producto.style.transition = 'opacity 0.6s, transform 0.6s';
            producto.style.opacity = '1';
            producto.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Menú móvil
function configurarMenuMobile() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Newsletter
// function configurarNewsletter() {
//     const form = document.querySelector('.newsletter-form');
//     if (form) {
//         form.addEventListener('submit', function(e) {
//             e.preventDefault();
//             const email = this.querySelector('input[type="email"]').value;
//             alert(`¡Gracias por suscribirte con el email: ${email}!`);
//             this.reset();
//         });
//     }
// }

// Cambiar estilo del header al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if(window.scrollY > 100) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.08)';
    }
});