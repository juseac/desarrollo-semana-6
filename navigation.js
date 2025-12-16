// Sistema de Navegación para Presentación de Servicios Web
// Array con el orden de las diapositivas
const slides = [
    'slides/slide-1.html',
    'slides/slide-2.html',
    'slides/slide-3.html',
    'slides/slide-4.html',
    'slides/slide-5.html',
    'slides/slide-6.html',
    'slides/slide-7.html',
    'slides/slide-8.html',
    'slides/slide-9.html',
    'slides/slide-10.html',
    'slides/slide-11.html',
    'slides/slide-12.html',
    'slides/slide-13.html',
    'slides/slide-14.html',
    'slides/slide-15.html',
    'slides/slide-16.html',
    'slides/slide-17.html',
    'slides/slide-18.html',
    'slides/slide-19.html',
    'slides/slide-20.html',
    'slides/slide-21.html',
    'slides/slide-22.html'
];

// Obtener la ruta actual
function getCurrentSlideIndex() {
    const currentPath = window.location.pathname;
    // Extraer el nombre del archivo actual (ej: "slide-2.html")
    const fileName = currentPath.split('/').pop();
    
    // Encontrar el índice de la diapositiva actual
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].includes(fileName)) {
            return i;
        }
    }
    return -1;
}

// Navegar a la siguiente diapositiva
function nextSlide() {
    const currentIndex = getCurrentSlideIndex();
    if (currentIndex >= 0 && currentIndex < slides.length - 1) {
        const nextPath = '../' + slides[currentIndex + 1];
        window.location.href = nextPath;
    }
}

// Navegar a la diapositiva anterior
function previousSlide() {
    const currentIndex = getCurrentSlideIndex();
    if (currentIndex > 0) {
        const prevPath = '../' + slides[currentIndex - 1];
        window.location.href = prevPath;
    }
}

// Navegar a una diapositiva específica
function goToSlide(index) {
    if (index >= 0 && index < slides.length) {
        const targetPath = '../' + slides[index];
        window.location.href = targetPath;
    }
}

// Ir al inicio (portada)
function goToStart() {
    window.location.href = '../' + slides[0];
}

// Obtener información de la diapositiva actual
function getSlideInfo() {
    const currentIndex = getCurrentSlideIndex();
    return {
        current: currentIndex + 1,
        total: slides.length,
        isFirst: currentIndex === 0,
        isLast: currentIndex === slides.length - 1
    };
}

// Agregar navegación con teclado
document.addEventListener('DOMContentLoaded', function() {
    // Navegación con flechas del teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            previousSlide();
        } else if (e.key === 'Home') {
            e.preventDefault();
            goToStart();
        }
    });

    // Actualizar todos los botones de navegación existentes
    const nextButtons = document.querySelectorAll('[data-nav="next"], .next-slide, button:has(.arrow_forward)');
    nextButtons.forEach(button => {
        if (!button.onclick && button.textContent.toLowerCase().includes('siguiente') || 
            button.textContent.toLowerCase().includes('next')) {
            button.onclick = nextSlide;
            button.style.cursor = 'pointer';
        }
    });

    const prevButtons = document.querySelectorAll('[data-nav="prev"], .prev-slide, button:has(.arrow_back)');
    prevButtons.forEach(button => {
        if (!button.onclick && button.textContent.toLowerCase().includes('anterior') || 
            button.textContent.toLowerCase().includes('previous')) {
            button.onclick = previousSlide;
            button.style.cursor = 'pointer';
        }
    });

    // Actualizar contador de diapositivas si existe
    const slideInfo = getSlideInfo();
    const counters = document.querySelectorAll('.slide-counter, [class*="Diapositiva"]');
    counters.forEach(counter => {
        if (counter.textContent.includes('de') || counter.textContent.includes('of')) {
            counter.textContent = `Diapositiva ${slideInfo.current} de ${slideInfo.total}`;
        }
    });
});

// Hacer funciones globales
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;
window.goToSlide = goToSlide;
window.goToStart = goToStart;
window.getSlideInfo = getSlideInfo;
