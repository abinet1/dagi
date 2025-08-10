// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Portfolio Filtering and Load More
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
let currentFilter = 'all';
let itemsToShow = 12;
const itemsIncrement = 6;

// Initially hide items beyond the limit
function initializePortfolio() {
    portfolioItems.forEach((item, index) => {
        if (index >= itemsToShow) {
            item.style.display = 'none';
        }
    });
    updateLoadMoreButton();
}

// Update load more button visibility
function updateLoadMoreButton() {
    const visibleItems = Array.from(portfolioItems).filter(item => {
        const matchesFilter = currentFilter === 'all' || item.getAttribute('data-category') === currentFilter;
        return matchesFilter;
    });
    
    const shownItems = visibleItems.filter((item, index) => index < itemsToShow);
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        if (shownItems.length < visibleItems.length) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
}

// Filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        currentFilter = button.getAttribute('data-filter');
        let visibleCount = 0;

        portfolioItems.forEach(item => {
            if (currentFilter === 'all' || item.getAttribute('data-category') === currentFilter) {
                if (visibleCount < itemsToShow) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        updateLoadMoreButton();
    });
});

// Load more functionality
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
    
    // Create and add load more button if it doesn't exist
    if (!document.querySelector('.load-more-btn')) {
        const portfolioSection = document.querySelector('.portfolio .container');
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.className = 'btn btn-primary load-more-btn';
        loadMoreBtn.textContent = 'Load More Projects';
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.style.margin = '3rem auto 0';
        portfolioSection.appendChild(loadMoreBtn);
        
        loadMoreBtn.addEventListener('click', () => {
            itemsToShow += itemsIncrement;
            let visibleCount = 0;
            
            portfolioItems.forEach(item => {
                if (currentFilter === 'all' || item.getAttribute('data-category') === currentFilter) {
                    if (visibleCount < itemsToShow) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                        visibleCount++;
                    }
                }
            });
            
            updateLoadMoreButton();
        });
    }
});

// Video Modal Functionality
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const imageModal = document.getElementById('imageModal');
const galleryImage = document.getElementById('galleryImage');
const galleryThumbnails = document.getElementById('galleryThumbnails');
let currentImages = [];
let currentImageIndex = 0;

// Play video buttons
document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const videoSrc = btn.getAttribute('data-video');
        if (videoSrc && modalVideo) {
            modalVideo.querySelector('source').src = videoSrc;
            modalVideo.load();
            videoModal.classList.add('active');
            modalVideo.play();
        }
    });
});

// View images buttons
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const images = btn.getAttribute('data-images');
        if (images) {
            currentImages = images.split(',');
            currentImageIndex = 0;
            showImage(0);
            imageModal.classList.add('active');
        }
    });
});

// Show image in gallery
function showImage(index) {
    if (currentImages.length > 0) {
        galleryImage.src = currentImages[index];
        
        // Update thumbnails
        galleryThumbnails.innerHTML = '';
        currentImages.forEach((img, i) => {
            const thumb = document.createElement('img');
            thumb.src = img;
            thumb.className = 'gallery-thumb';
            if (i === index) thumb.classList.add('active');
            thumb.addEventListener('click', () => {
                currentImageIndex = i;
                showImage(i);
            });
            galleryThumbnails.appendChild(thumb);
        });
    }
}

// Gallery navigation
document.getElementById('prevImage')?.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    showImage(currentImageIndex);
});

document.getElementById('nextImage')?.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    showImage(currentImageIndex);
});

// Close modals
document.querySelectorAll('.close-modal').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        videoModal.classList.remove('active');
        imageModal.classList.remove('active');
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.querySelector('source').src = '';
        }
    });
});

// Close modal on background click
[videoModal, imageModal].forEach(modal => {
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.querySelector('source').src = '';
            }
        }
    });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        videoModal?.classList.remove('active');
        imageModal?.classList.remove('active');
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.querySelector('source').src = '';
        }
    }
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link
        const mailtoLink = `mailto:dagmedagne@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form
        contactForm.reset();
        
        // Show success message (optional)
        alert('Thank you for your message! Your email client will now open.');
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-item, .skill-category, .portfolio-item, .education-item').forEach(el => {
    observer.observe(el);
});

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .timeline-item,
    .skill-category,
    .portfolio-item,
    .education-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .timeline-item.animate,
    .skill-category.animate,
    .portfolio-item.animate,
    .education-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-link.active {
        color: var(--primary-color);
        position: relative;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--primary-color);
    }
    
    .portfolio-item {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Typing Animation for Hero Title (optional)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing animation after page load
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 500);
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Load More Portfolio Items (if needed in future)
let portfolioLoadCount = 6;
const loadMoreBtn = document.createElement('button');
loadMoreBtn.className = 'btn btn-primary';
loadMoreBtn.textContent = 'Load More';
loadMoreBtn.style.display = 'none';
loadMoreBtn.style.margin = '2rem auto';
loadMoreBtn.style.display = 'block';

// Console Message
console.log('%c Welcome to Dagme Ayanna\'s Portfolio! ', 'background: #2563eb; color: white; font-size: 20px; padding: 10px;');
console.log('%c Crafted with passion and creativity ', 'color: #2563eb; font-size: 14px;');