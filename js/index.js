// Menu móvil
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Cerrar menú móvil si está abierto
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                
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
        if(window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.08)';
        }
    });
    
    // Modal para productos
    const modal = document.getElementById('modal-producto');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');
    const productButtons = document.querySelectorAll('.btn-producto');
    
    // Datos de productos (sin uso, ingredientes, beneficios ni precio)
    const productos = [
        {
            id: 1,
            nombre: "SKALA EXPERT deAgal",
            descripcion: "Nuestro tratamiento SKALA EXPERT deAgal está especialmente formulado para cabellos secos y opacos. Con aceite de argán 100% puro y de origen vegano, nutre profundamente mientras revitaliza y devuelve el brillo natural a tu cabello.",
            volumen: "1000g (35.2 oz)",
            tipo: "Tratamiento capilar"
        },
        {
            id: 2,
            nombre: "SKALA Frutas",
            descripcion: "El tratamiento SKALA Frutas combina extractos naturales de frutas para proporcionar una hidratación intensa y un aroma delicioso. Ideal para cabellos que necesitan suavidad extra y manejo fácil.",
            volumen: "1000g (35.2 oz)",
            tipo: "Acondicionador de frutas"
        },
        {
            id: 3,
            nombre: "DKALA Mais Cachinho",
            descripcion: "DKALA Mais Cachinho es la solución perfecta para definir y realzar tus rizos naturales. Su fórmula especial no engrasa y proporciona un hold flexible que mantiene tus rizos definidos sin rigidez.",
            volumen: "250ml (8.5 oz)",
            tipo: "Crema para rizos"
        },
        {
            id: 4,
            nombre: "DR-RASHEL Serum con Ácido Hialurónico",
            descripcion: "El serum DR-RASHEL con ácido hialurónico proporciona hidratación instantánea y protección para tu piel. Su fórmula ligera se absorbe rápidamente, creando una barrera protectora mientras nutre en profundidad.",
            volumen: "30ml (1.0 oz)",
            tipo: "Serum facial"
        },
        {
            id: 5,
            nombre: "SKALA Restauração e Brilho",
            descripcion: "SKALA Restauração e Brilho ofrece 12 veces más beneficios con su fórmula concentrada que restaura la fibra capilar dañada mientras devuelve el brillo natural. Perfecto para cabellos tratados químicamente o expuestos a calor frecuente.",
            volumen: "1000g (35.2 oz)",
            tipo: "Tratamiento reconstructor"
        },
        {
            id: 6,
            nombre: "Aceite de Argán Puro 100%",
            descripcion: "Nuestro aceite de argán 100% puro es extraído en frío para preservar todas sus propiedades nutritivas. Ideal para cabello, piel y uñas, proporciona nutrición intensa y un brillo saludable.",
            volumen: "60ml (2.0 oz)",
            tipo: "Aceite multipropósito"
        }
    ];
    
    // Abrir modal con información del producto
    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.closest('.producto').dataset.id;
            const producto = productos.find(p => p.id == productId);
            
            if(producto) {
                modalBody.innerHTML = `
                    <div class="modal-producto">
                        <div class="modal-producto-header">
                            <h2>${producto.nombre}</h2>
                        </div>
                        <div class="modal-producto-content">
                            <div class="modal-producto-img">
                                <img src="https://via.placeholder.com/400x400/FFFFFF/9EB488?text=${encodeURIComponent(producto.nombre)}" alt="${producto.nombre}">
                            </div>
                            <div class="modal-producto-info">
                                <div class="producto-tipo-badge">${producto.tipo}</div>
                                <p class="modal-desc">${producto.descripcion}</p>
                                <div class="modal-details">
                                    <div class="modal-section">
                                        <h3><i class="fas fa-weight-hanging"></i> Presentación</h3>
                                        <p>${producto.volumen}</p>
                                    </div>
                                </div>
                                <div class="modal-actions">
                                    <button class="btn-comprar"><i class="fas fa-shopping-cart"></i> Comprar ahora</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Añadir estilos adicionales para el badge de tipo de producto
                const style = document.createElement('style');
                style.textContent = `
                    .producto-tipo-badge {
                        display: inline-block;
                        background: var(--color-verde-claro);
                        color: white;
                        padding: 5px 15px;
                        border-radius: 20px;
                        font-size: 0.9rem;
                        font-weight: 600;
                        margin-bottom: 1rem;
                    }
                `;
                document.head.appendChild(style);
                
                // Agregar funcionalidad a los botones del modal
                document.querySelector('.btn-comprar').addEventListener('click', function() {
                    alert(`¡Gracias por tu interés en ${producto.nombre}! Serás redirigido a nuestra página de pago.`);
                });
                
                document.querySelector('.btn-whatsapp').addEventListener('click', function() {
                    const message = `Hola, me interesa el producto: ${producto.nombre}`;
                    const whatsappURL = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
                    window.open(whatsappURL, '_blank');
                });
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
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`¡Gracias por suscribirte con el email: ${email}! Te enviaremos nuestras mejores ofertas.`);
            this.reset();
        });
    }
});