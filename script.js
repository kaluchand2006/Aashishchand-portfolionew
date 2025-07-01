// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Portfolio Filtering - FIXED VERSION
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.portfolio-item, .stat-item, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Portfolio item hover effects
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// ENHANCED DYNAMIC LIGHTBOX FEATURE
let currentImageIndex = 0;
let currentImages = [];

function openImageViewer(imageSrc, images) {
    currentImages = images;
    currentImageIndex = images.indexOf(imageSrc);
    
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img src="${imageSrc}" alt="Portfolio Image" class="lightbox-image">
            <div class="lightbox-nav">
                <button class="nav-btn prev-btn">&lt;</button>
                <button class="nav-btn next-btn">&gt;</button>
            </div>
            <div class="lightbox-counter">${currentImageIndex + 1} / ${images.length}</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
            border-radius: 10px;
        }
        
        .close-lightbox {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
            background: none;
            border: none;
        }
        
        .lightbox-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
        }
        
        .nav-btn {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 24px;
            padding: 10px 15px;
            border-radius: 50%;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .nav-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        .lightbox-counter {
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 16px;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Event listeners
    lightbox.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
    lightbox.querySelector('.prev-btn').addEventListener('click', showPrevImage);
    lightbox.querySelector('.next-btn').addEventListener('click', showNextImage);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.remove();
        document.removeEventListener('keydown', handleKeyPress);
    }
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.querySelector('.lightbox-image');
    const counter = document.querySelector('.lightbox-counter');
    if (lightboxImage && counter) {
        lightboxImage.src = currentImages[currentImageIndex];
        counter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
    }
}

function handleKeyPress(e) {
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
}

// Add click handlers to portfolio items
document.addEventListener('DOMContentLoaded', () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const allImages = Array.from(portfolioItems).map(item => item.querySelector('img').src);
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img && img.src) {
                openImageViewer(img.src, allImages);
            }
        });
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const floatingImage = document.querySelector('.floating-image');
    
    if (hero && floatingImage) {
        const rate = scrolled * -0.5;
        floatingImage.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// CTA button scroll to portfolio
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const portfolioSection = document.querySelector('#portfolio');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(45deg, #e74c3c, #c0392b);
    z-index: 1001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Add image lazy loading
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease-in';
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            imageObserver.unobserve(img);
        }
    });
}, { threshold: 0.1 });

images.forEach(img => {
    imageObserver.observe(img);
});

// Add floating particles effect to hero section
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: float-particle 6s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    
    document.querySelector('.hero').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 6000);
}

// Create particles periodically
setInterval(createParticle, 300);

// Add CSS for particle animation and enhanced lightbox
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .enhanced-lightbox {
        display: none;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        transition: opacity 0.3s ease;
    }
    
    .lightbox-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .lightbox-container {
        position: relative;
        width: 90%;
        height: 90%;
        max-width: 1200px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        display: flex;
        flex-direction: column;
    }
    
    .lightbox-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .lightbox-counter {
        color: white;
        font-size: 1.1rem;
        font-weight: 500;
    }
    
    .lightbox-close {
        color: white;
        font-size: 2rem;
        font-weight: bold;
        cursor: pointer;
        transition: color 0.3s ease;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
    }
    
    .lightbox-close:hover {
        color: #e74c3c;
        background: rgba(255, 255, 255, 0.2);
    }
    
    .lightbox-content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 20px;
    }
    
    .lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10;
    }
    
    .lightbox-nav:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-50%) scale(1.1);
    }
    
    .lightbox-prev {
        left: 20px;
    }
    
    .lightbox-next {
        right: 20px;
    }
    
    .lightbox-image-container {
        position: relative;
        max-width: 100%;
        max-height: 100%;
        overflow: hidden;
        border-radius: 10px;
    }
    
    .lightbox-image {
        width: 100%;
        height: auto;
        max-height: 70vh;
        object-fit: contain;
        border-radius: 10px;
        transition: opacity 0.3s ease, transform 0.3s ease;
        cursor: zoom-in;
    }
    
    .lightbox-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.2rem;
        display: none;
    }
    
    .lightbox-footer {
        padding: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .lightbox-caption {
        color: white;
        flex: 1;
    }
    
    .lightbox-caption h3 {
        margin: 0 0 5px 0;
        font-size: 1.3rem;
        font-weight: 600;
    }
    
    .lightbox-caption p {
        margin: 0;
        opacity: 0.8;
        font-size: 1rem;
    }
    
    .lightbox-controls {
        display: flex;
        gap: 10px;
    }
    
    .lightbox-controls button {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1.2rem;
        font-weight: bold;
    }
    
    .lightbox-controls button:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.1);
    }
    
    .lightbox-thumbnails {
        display: flex;
        gap: 10px;
        padding: 20px;
        overflow-x: auto;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .lightbox-thumbnail {
        flex-shrink: 0;
        width: 80px;
        height: 60px;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid transparent;
    }
    
    .lightbox-thumbnail.active {
        border-color: #e74c3c;
        transform: scale(1.1);
    }
    
    .lightbox-thumbnail:hover {
        transform: scale(1.05);
    }
    
    .lightbox-thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .portfolio-item {
        cursor: pointer;
    }
    
    .portfolio-item img {
        transition: transform 0.3s ease, opacity 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .lightbox-container {
            width: 95%;
            height: 95%;
        }
        
        .lightbox-nav {
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
        }
        
        .lightbox-prev {
            left: 10px;
        }
        
        .lightbox-next {
            right: 10px;
        }
        
        .lightbox-footer {
            flex-direction: column;
            gap: 15px;
            text-align: center;
        }
        
        .lightbox-thumbnails {
            justify-content: center;
        }
    }
`;
document.head.appendChild(style); 