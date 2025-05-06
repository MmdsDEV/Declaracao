document.addEventListener('DOMContentLoaded', function() {
    const showButton = document.getElementById('showSlideshow');
    const slideshowContainer = document.querySelector('.slideshow-container');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slideshow-dots');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDelay = 5000; // 5 segundos
    
    // Mostrar/ocultar slideshow
    showButton.addEventListener('click', function() {
        slideshowContainer.classList.toggle('hidden');
        showButton.textContent = slideshowContainer.classList.contains('hidden') ? 
            'Ver Nossas Fotos' : 'Ocultar Fotos';
        
        if (!slideshowContainer.classList.contains('hidden')) {
            initSlideshow();
        } else {
            clearInterval(slideInterval);
        }
    });
    
    // Inicializar slideshow
    function initSlideshow() {
        // Criar dots
        dotsContainer.innerHTML = '';
        slides.forEach((slide, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Mostrar primeiro slide
        showSlide(currentSlide);
        
        // Iniciar autoplay
        slideInterval = setInterval(nextSlide, slideDelay);
    }
    
    // Navegação
    function showSlide(index) {
        // Atualizar slide atual
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        
        // Atualizar dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    function goToSlide(index) {
        showSlide(index);
        // Reiniciar autoplay quando clicar manualmente
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDelay);
    }
    
    // Event listeners
    nextButton.addEventListener('click', function() {
        nextSlide();
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDelay);
    });
    
    prevButton.addEventListener('click', function() {
        prevSlide();
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDelay);
    });
    
    // Toque para mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slideshowContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    slideshowContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide(); // Swipe para esquerda
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide(); // Swipe para direita
        }
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDelay);
    }
});
// Player de música
const playButton = document.getElementById('playButton');
const loveSong = document.getElementById('loveSong');
const volumeSlider = document.getElementById('volumeSlider');

let isPlaying = false;

playButton.addEventListener('click', function() {
    if (isPlaying) {
        loveSong.pause();
        playButton.textContent = '🎵 Tocar Música';
    } else {
        loveSong.play();
        playButton.textContent = '⏸️ Pausar Música';
    }
    isPlaying = !isPlaying;
});

volumeSlider.addEventListener('input', function() {
    loveSong.volume = volumeSlider.value;
});

// Definir volume inicial
loveSong.volume = volumeSlider.value;

// Opcional: Adicionar animação quando a música está tocando
loveSong.addEventListener('play', function() {
    document.querySelector('.coracao').style.animation = 'pulseFast 0.8s infinite ease-in-out';
});

loveSong.addEventListener('pause', function() {
    document.querySelector('.coracao').style.animation = 'pulse 1.8s infinite ease-in-out';
});
