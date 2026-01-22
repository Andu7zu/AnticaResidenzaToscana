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

// Gallery Tab Switching
const galleryTabs = document.querySelectorAll('.gallery-tab');
const galleryGrid = document.getElementById('galleryGrid');

if (galleryTabs.length > 0) {
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
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

function updateGallery(type) {
    // This function can be expanded to load different images based on the gallery type
    const placeholders = galleryGrid.querySelectorAll('.gallery-placeholder');
    const labels = {
        'rooms': ['Room Image 1', 'Room Image 2', 'Room Image 3', 'Room Image 4'],
        'exterior': ['Exterior View 1', 'Exterior View 2', 'Exterior View 3', 'Exterior View 4'],
        'dining': ['Dining Area 1', 'Dining Area 2', 'Food & Drink 1', 'Food & Drink 2']
    };
    
    if (labels[type]) {
        placeholders.forEach((placeholder, index) => {
            if (labels[type][index]) {
                placeholder.textContent = labels[type][index];
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
