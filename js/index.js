import { productosDB } from './data.js';

// Función para obtener productos aleatorios
function obtenerProductosAleatorios(array, cantidad) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, cantidad);
}

// Obtener 6 productos aleatorios al cargar la página
const productosAleatorios = obtenerProductosAleatorios(productosDB, 6);

// Función para renderizar productos en el grid
function renderizarProductos() {
    const productosGrid = document.querySelector('.productos-grid');
    if (!productosGrid) return;
    
    productosGrid.innerHTML = '';
    
    productosAleatorios.forEach((producto, index) => {
        const badges = ['Nuevo', 'Más vendido', 'Oferta', ''];
        const badgeAleatorio = badges[Math.floor(Math.random() * badges.length)];
        
        const productoHTML = `
            <div class="producto" data-id="${producto.id}">
                <div class="producto-img">
                    
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="producto-info">
                    <h3>${producto.marca}</h3>
                    <p class="producto-desc">${producto.descripcion.substring(0, 100)}...</p>
                    <div class="producto-detalles">
                        ${producto.precio ? `<span class="precio">$${producto.precio}</span>` : ''}
                    </div>
                    <button class="btn-producto">Ver detalles</button>
                </div>
            </div>
        `;
        
        productosGrid.innerHTML += productoHTML;
    });
    
    // Re-aplicar event listeners después de renderizar
    aplicarEventListenersProductos();
}

// Menu móvil
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar productos aleatorios
    renderizarProductos();
    
    const mobileMenu = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Cerrar menú móvil si está abierto
                if (navMenu) navMenu.classList.remove('active');
                if (mobileMenu) mobileMenu.classList.remove('active');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if(header) {
            if(window.scrollY > 100) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '15px 0';
                header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.08)';
            }
        }
    });
    
    // Animación al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.producto, .nosotros-content').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
    
    // Actualizar contador de productos
    const productos_totales = document.getElementsByClassName('stat-number')[0];
    if (productos_totales) {
        productos_totales.textContent = `+${productosDB.length}`;
    }
});

// Función para aplicar event listeners a productos
function aplicarEventListenersProductos() {
    const modal = document.getElementById('modal-producto');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');
    const productButtons = document.querySelectorAll('.btn-producto');
    
    if (!modal || !closeModal || !modalBody) return;
    
    // Abrir modal con información del producto
    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.closest('.producto').dataset.id);
            const producto = productosDB.find(p => p.id === productId);
            
            if(producto) {
                modalBody.innerHTML = `
                    <div class="modal-producto">
                        <div class="modal-producto-header">
                            <h2>${producto.nombre}</h2>
                        </div>
                        <div class="modal-producto-content">
                            <div class="modal-producto-img">
                                <img src="${producto.imagen}" alt="${producto.nombre}">
                            </div>
                            <div class="modal-producto-info">
                                <div class="producto-tipo-badge">${producto.categoria}</div>
                                <p class="modal-desc">${producto.descripcion}</p>
                                
                                <div class="modal-details">
                                    ${producto.marca ? `
                                    <div class="modal-section">
                                        <h3><i class="fas fa-tag"></i>Nombre</h3>
                                        <p>${producto.nombre}</p>
                                    </div>
                                    ` : ''}
                                    
                                    ${producto.volumen ? `
                                    <div class="modal-section">
                                        <h3><i class="fas fa-weight-hanging"></i> Presentación</h3>
                                        <p>${producto.volumen}</p>
                                    </div>
                                    ` : ''}
                                    
                                    ${producto.uso ? `
                                    <div class="modal-section">
                                        <h3><i class="fas fa-info-circle"></i> Modo de uso</h3>
                                        <p>${producto.uso}</p>
                                    </div>
                                    ` : ''}
                                    
                                    ${producto.ingredientes ? `
                                    <div class="modal-section">
                                        <h3><i class="fas fa-flask"></i> Ingredientes principales</h3>
                                        <p>${producto.ingredientes}</p>
                                    </div>
                                    ` : ''}
                                    
                                    ${producto.beneficios ? `
                                    <div class="modal-section">
                                        <h3><i class="fas fa-star"></i> Beneficios</h3>
                                        <p>${producto.beneficios}</p>
                                    </div>
                                    ` : ''}
                                    
                                    ${producto.precio ? `
                                    <div class="modal-section precio-section">
                                        <h3><i class="fas fa-dollar-sign"></i> Precio</h3>
                                        <p class="precio-grande">$${producto.precio}</p>
                                    </div>
                                    ` : ''}
                                </div>
                                
                                <div class="modal-actions">
                                    <button class="btn-comprar" data-producto='${JSON.stringify(producto)}'>
                                        <i class="fas fa-shopping-cart"></i> Comprar ahora
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Event listener para botón de WhatsApp
                const btnComprar = modalBody.querySelector('.btn-comprar');
                if (btnComprar) {
                    btnComprar.addEventListener('click', function() {
                        const productoData = JSON.parse(this.dataset.producto);
                        const numero = '50689523778'; // Cambia este número
                        const mensaje = encodeURIComponent(
                            `¡Hola! Estoy interesado en el siguiente producto:\n\n` +
                            `📦 *${productoData.nombre}*\n` +
                            `🏷️ Marca: ${productoData.marca || 'N/A'}\n` +
                            `📂 Categoría: ${productoData.categoria}\n` +
                            `💰 Precio: $${productoData.precio || 'Consultar'}\n\n` +
                            `¿Me podrías dar más información? 😊`
                        );
                        const url = `https://wa.me/${numero}?text=${mensaje}`;
                        window.open(url, '_blank');
                    });
                }
            }
        });
    });
    
    // Cerrar modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if(e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if(e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Estilos adicionales para el modal (agregar al head dinámicamente)
const style = document.createElement('style');
style.textContent = `
    .producto-tipo-badge {
        display: inline-block;
        background: var(--color-verde-claro, #9EB488);
        color: white;
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 1rem;
        text-transform: capitalize;
    }
    
    .modal-section {
        margin-bottom: 1.5rem;
    }
    
    .modal-section h3 {
        color: var(--color-verde-claro, #9EB488);
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .modal-section p {
        color: #555;
        line-height: 1.6;
    }
    
    .precio-section {
        border-top: 2px solid #eee;
        padding-top: 1rem;
    }
    
    .precio-grande {
        font-size: 1.8rem;
        font-weight: bold;
        color: var(--color-verde-claro, #9EB488);
    }
    
    .modal-actions {
        margin-top: 2rem;
    }
    
    .btn-comprar {
        width: 100%;
        padding: 15px;
        background: var(--color-verde-claro, #9EB488);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }
    
    .btn-comprar:hover {
        background: #8AA377;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
`;
document.head.appendChild(style);