// Base de datos de productos (primeros 10)
const productosDB = [
    {
        id: 1,
        nombre: "Cachos Hair Jelly",
        marca: "SKALA (Línea Brasil)",
        categoria: "belleza",
        descripcion: "Gelatina capilar especialmente formulada para definir y realzar todo tipo de rizos. Proporciona definición, hidratación y protección térmica. Ideal para mantener los rizos con aspecto natural, sin encrespamiento y con brillo duradero. #1 en ventas en Brasil.",
        caracteristicas: ["1000g", "Para todo tipo de rizos", "Definición y protección", "Gelatina capilar"],
        imagen: "../img/lote1/producto1.png"
    },
    {
        id: 2,
        nombre: "Óleo de Argan",
        marca: "SKALA (Línea EXPERT)",
        categoria: "belleza",
        descripcion: "Tratamiento nutritivo y revitalizante con aceite de argán para cabellos secos y opacos. Formulado con resistencia capilar mejorada, proporciona nutrición profunda, brillo intenso y suavidad. 100% vegano y sin ingredientes de origen animal.",
        caracteristicas: ["1000g", "Aceite de Argán", "100% Vegano", "Nutrición y revitalización"],
        imagen: "../img/lote1/producto2.png"
    },
    {
        id: 3,
        nombre: "Keratina Vegetal",
        marca: "SKALA (Línea EXPERT)",
        categoria: "belleza",
        descripcion: "Tratamiento revitalizante y fortalecedor con keratina vegetal. Diseñado para reparar, fortalecer y restaurar la estructura capilar. Ideal para cabellos débiles, quebradizos o dañados por procesos químicos. Co-wash.",
        caracteristicas: ["1000g", "Keratina Vegetal", "Revitaliza y fortalece", "Co-wash"],
        imagen: "../img/lote1/producto3.png"
    },
    {
        id: 4,
        nombre: "Óleo de Coco",
        marca: "SKALA (Línea EXPERT)",
        categoria: "belleza",
        descripcion: "Tratamiento nutritivo e hidratante profundo con aceite de coco. Proporciona nutrición intensiva, hidratación profunda y restauración capilar. 100% vegano, ideal para cabellos secos y dañados que necesitan recuperar vitalidad.",
        caracteristicas: ["1000g", "Aceite de Coco", "100% Vegano", "Nutrición e hidratación profunda"],
        imagen: "../img/lote1/producto4.png"
    },
    {
        id: 5,
        nombre: "12 em 1",
        marca: "SKALA",
        categoria: "belleza",
        descripcion: "Tratamiento multibeneficio que ofrece 12 beneficios en un solo producto. Proporciona restauración, brillo, suavidad, hidratación y protección. Fórmula innovadora para cabellos renovados que combina múltiples tratamientos en una sola aplicación.",
        caracteristicas: ["1000g", "12 beneficios", "Restauración y brillo", "Liberado"],
        imagen: "../img/lote1/producto5.png"
    },
    {
        id: 6,
        nombre: "Genetiqs",
        marca: "SKALA (Línea GENETIQS)",
        categoria: "belleza",
        descripcion: "Tratamiento profesional que proporciona fuerza, brillo e hidratación. Formulado con fuerza botánica para cabellos opacos, débiles y sin frizz. Diseñado para transformar cabellos debilitados en cabellos fuertes y radiantes.",
        caracteristicas: ["1000g", "Fuerza botánica", "Brillo e hidratación", "Liberado"],
        imagen: "../img/lote1/producto6.png"
    },
    {
        id: 7,
        nombre: "Coquetel de Frutas Kids",
        marca: "SKALA (Línea EXPERT)",
        categoria: "belleza",
        descripcion: "Tratamiento 2 en 1 especialmente formulado para cabellos infantiles. Con coco y aceite de almendras, limpia y desenreda suavemente mientras nutre el cabello de los niños. Fórmula dermatológicamente testeada, suave y divertida.",
        caracteristicas: ["1000g", "2 en 1", "Coco y almendras", "Para niños", "Liberado"],
        imagen: "../img/lote1/producto7.png"
    },
    {
        id: 8,
        nombre: "Bomba de Biotina",
        marca: "SKALA (Línea EXPERT)",
        categoria: "belleza",
        descripcion: "Tratamiento fortificante con biotina para cabellos débiles y quebradizos. Proporciona nutrición, fortalecimiento y crecimiento saludable del cabello. La biotina ayuda a mejorar la estructura capilar desde la raíz hasta las puntas.",
        caracteristicas: ["1000g", "Biotina", "Nutrición y fortalecimiento", "Liberado"],
        imagen: "../img/lote1/producto8.png"
    },
    {
        id: 9,
        nombre: "Cacau",
        marca: "SKALA (Línea Brasil)",
        categoria: "belleza",
        descripcion: "Tratamiento con cacao que proporciona fuerza y brillo al cabello. Enriquecido con las propiedades antioxidantes del cacao, nutre profundamente y protege el cabello, dejándolo suave, brillante y saludable con un aroma delicioso.",
        caracteristicas: ["1000g", "Cacao", "Fuerza y brillo", "Hidratación"],
        imagen: "../img/lote1/producto9.png"
    },
    {
        id: 10,
        nombre: "Divino Putinho #Influencer",
        marca: "SKALA (Línea EXPERT)",
        categoria: "belleza",
        descripcion: "Tratamiento 2 en 1 hidratante libre de sulfatos. Crema multiuso que limpia y trata en un solo paso, ideal para mantener rizos definidos y cabello hidratado. Fórmula moderna diseñada para el cuidado capilar actual.",
        caracteristicas: ["1000g", "2 en 1", "Libre de sulfato", "Hidratante", "Liberado"],
        imagen: "../img/lote1/producto10.png"
    }
];

// Variables globales
let productosFiltrados = [...productosDB];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    inicializarApp();
});

function inicializarApp() {
    renderizarProductos(productosDB);
    configurarFiltros();
    configurarBusqueda();
    configurarMenuMobile();
    configurarNewsletter();
    configurarModal();
}

// Renderizar productos
function renderizarProductos(productos) {
    const contenedor = document.getElementById('productos-lista');
    const countElement = document.getElementById('count');
    
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
    
// En la función renderizarProductos, agregar la marca en el HTML
contenedor.innerHTML = productos.map(producto => `
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
    renderizarProductos(productos);
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
    
    // Configurar botón comprar
    document.getElementById('btn-comprar').addEventListener('click', function() {
        const titulo = document.getElementById('modal-titulo').textContent;
        alert(`¡Gracias por tu interés en ${titulo}! Serás redirigido al proceso de compra.`);
        modal.style.display = 'none';
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
        
        // Mostrar modal
        document.getElementById('modal-producto').style.display = 'block';
    }
}

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
function configurarNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`¡Gracias por suscribirte con el email: ${email}!`);
            this.reset();
        });
    }
}

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