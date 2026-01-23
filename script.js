// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    }
    
    lastScroll = currentScroll;
});

// Store current gallery images for lightbox navigation
let currentGalleryImages = [];
let currentImageIndex = 0;
let galleryGrid = null;
let galleryTabs = null;

// Gallery Tab Switching
function initGallery() {
    galleryTabs = document.querySelectorAll('.gallery-tab');
    galleryGrid = document.getElementById('galleryGrid');

    // Initialize gallery with rooms on page load
    if (galleryGrid) {
        // First, attach click handlers to existing images
        attachGalleryClickHandlers();
        updateGallery('rooms');
    }

    if (galleryTabs && galleryTabs.length > 0) {
        galleryTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                // Remove active class from all tabs
                galleryTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Update gallery content based on tab
                const galleryType = tab.getAttribute('data-gallery');
                updateGallery(galleryType);
            });
        });
    }
}

function attachGalleryClickHandlers() {
    if (!galleryGrid) return;
    
    // Use event delegation on the gallery grid
    galleryGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (!item) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const img = item.querySelector('img');
        if (!img) return;
        
        // Find which image set we're in
        const activeTab = document.querySelector('.gallery-tab.active');
        const galleryType = activeTab ? activeTab.getAttribute('data-gallery') : 'rooms';
        const images = {
            'rooms': [
                { src: 'pics/room 1.jpg', alt: 'Room 1' },
                { src: 'pics/room 2.jpg', alt: 'Room 2' },
                { src: 'pics/room 3.jpg', alt: 'Room 3' },
                { src: 'pics/room 4.jpg', alt: 'Room 4' }
            ],
            'exterior': [
                { src: 'pics/exterior 1.jpg', alt: 'Exterior View 1' },
                { src: 'pics/exterior 2.jpg', alt: 'Exterior View 2' },
                { src: 'pics/exterior 3.jpg', alt: 'Exterior View 3' },
                { src: 'pics/exterior 4.jpg', alt: 'Exterior View 4' }
            ],
            'dining': [
                { src: 'pics/food 1.jpg', alt: 'Food & Drink 1' },
                { src: 'pics/food 2.jpg', alt: 'Food & Drink 2' }
            ]
        };
        const imageSet = images[galleryType] || images['rooms'];
        const galleryItems = Array.from(galleryGrid.querySelectorAll('.gallery-item:not([style*="display: none"])'));
        const imgIndex = galleryItems.indexOf(item);
        
        if (imageSet[imgIndex]) {
            openLightbox(imageSet[imgIndex].src, imageSet[imgIndex].alt, imgIndex);
        }
    });
    
    // Make sure all gallery items have pointer cursor
    const galleryItems = galleryGrid.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.style.cursor = 'pointer';
    });
}

function updateGallery(type) {
    if (!galleryGrid) return;
    
    const galleryItems = galleryGrid.querySelectorAll('.gallery-item');
    const images = {
        'rooms': [
            { src: 'pics/room 1.jpg', alt: 'Room 1' },
            { src: 'pics/room 2.jpg', alt: 'Room 2' },
            { src: 'pics/room 3.jpg', alt: 'Room 3' },
            { src: 'pics/room 4.jpg', alt: 'Room 4' }
        ],
        'exterior': [
            { src: 'pics/exterior 1.jpg', alt: 'Exterior View 1' },
            { src: 'pics/exterior 2.jpg', alt: 'Exterior View 2' },
            { src: 'pics/exterior 3.jpg', alt: 'Exterior View 3' },
            { src: 'pics/exterior 4.jpg', alt: 'Exterior View 4' }
        ],
        'dining': [
            { src: 'pics/food 1.jpg', alt: 'Food & Drink 1' },
            { src: 'pics/food 2.jpg', alt: 'Food & Drink 2' }
        ]
    };
    
    // Store current images for lightbox
    currentGalleryImages = images[type] || [];
    
    if (images[type]) {
        galleryItems.forEach((item, index) => {
            if (images[type][index]) {
                let img = item.querySelector('img');
                if (!img) {
                    img = document.createElement('img');
                    img.className = 'gallery-image';
                    item.innerHTML = '';
                    item.appendChild(img);
                }
                img.src = images[type][index].src;
                img.alt = images[type][index].alt;
                item.style.display = '';
                item.style.cursor = 'pointer';
            } else {
                item.style.display = 'none';
            }
        });
    }
}


// Booking Function
function openBooking() {
    // Booking.com direct link for Antica Residenza Toscana
    const bookingUrl = 'https://www.booking.com/hotel/ro/antica-residenza-toscana.en-gb.html?aid=2428367&label=metagha-link-MRRO-hotel-8914855_dev-desktop_los-1_bw-9_dow-Saturday_defdate-1_room-0_gstadt-2_rateid-public_aud-0_gacid-21404703528_mcid-50_bc-AIgHpw_ppa-0_clrid-0_ad-1_gstkid-0_checkin-20260131_ppt-B_lp-2642_r-14114225790071064143&sid=8b02c68afaea47de8b04137fca0c0415&all_sr_blocks=891485501_388009849_2_42_0&checkin=2026-01-31&checkout=2026-02-01&dest_id=8914855&dest_type=hotel&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=891485501_388009849_2_42_0&hpos=1&matching_block_id=891485501_388009849_2_42_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=891485501_388009849_2_42_0__27600&srepoch=1769104420&srpvid=ce3f7dce63ff0225&type=total&ucfs=1&';
    
    window.open(bookingUrl, '_blank');
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add active class to nav link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Lightbox functionality
let lightbox = null;
let lightboxImage = null;
let lightboxClose = null;
let lightboxPrev = null;
let lightboxNext = null;

function initLightbox() {
    lightbox = document.getElementById('lightbox');
    lightboxImage = document.getElementById('lightboxImage');
    lightboxClose = document.getElementById('lightboxClose');
    lightboxPrev = document.getElementById('lightboxPrev');
    lightboxNext = document.getElementById('lightboxNext');

    // Lightbox event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrevImage();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showNextImage();
        });
    }

    // Close lightbox when clicking outside the image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });
        
        // Prevent closing when clicking on the image itself
        if (lightboxImage) {
            lightboxImage.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
        }
    });
}

function openLightbox(src, alt, index = 0) {
    if (!lightbox || !lightboxImage) return;
    
    currentImageIndex = index;
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateLightboxNavigation();
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightboxNavigation() {
    if (!lightboxPrev || !lightboxNext) return;
    
    // Show/hide navigation buttons based on available images
    if (currentGalleryImages.length <= 1) {
        lightboxPrev.style.display = 'none';
        lightboxNext.style.display = 'none';
    } else {
        lightboxPrev.style.display = 'block';
        lightboxNext.style.display = 'block';
    }
}

function showNextImage() {
    if (currentGalleryImages.length > 0 && lightboxImage) {
        currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
        lightboxImage.src = currentGalleryImages[currentImageIndex].src;
        lightboxImage.alt = currentGalleryImages[currentImageIndex].alt;
    }
}

function showPrevImage() {
    if (currentGalleryImages.length > 0 && lightboxImage) {
        currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        lightboxImage.src = currentGalleryImages[currentImageIndex].src;
        lightboxImage.alt = currentGalleryImages[currentImageIndex].alt;
    }
}

// Make room image clickable
function initRoomImage() {
    const roomImage = document.querySelector('.room-image img');
    if (roomImage) {
        roomImage.style.cursor = 'pointer';
        roomImage.addEventListener('click', () => {
            // Create a single image array for the room
            currentGalleryImages = [{ src: roomImage.src, alt: roomImage.alt }];
            openLightbox(roomImage.src, roomImage.alt, 0);
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initLightbox();
    initRoomImage();
});
