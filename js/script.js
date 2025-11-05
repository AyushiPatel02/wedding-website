/**
 * Indian Wedding Website JavaScript
 * Modern & Interactive Features
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 50
    });

    // Initialize all functions
    initNavbar();
    initCountdown();
    initSmoothScrolling();
    initGallery();
    initRSVPForm();
    initParticles();
});

/**
 * Navbar Functionality
 */
function initNavbar() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

/**
 * Countdown Timer
 */
function initCountdown() {
    // Set wedding date to November 24, 2025 at 00:00 local time
    const weddingDate = new Date('2025-11-24T00:00:00').getTime();
    let countdownInterval = null;
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
            const textEl = document.getElementById('countdown-text');
            if (textEl) {
                textEl.textContent = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds left`;
            }
        } else {
            // Wedding day has arrived!
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            // Stop interval and show celebration message
            if (countdownInterval) clearInterval(countdownInterval);
            const countdownContainer = document.querySelector('.countdown-container');
            if (countdownContainer) {
                countdownContainer.innerHTML = `
                    <div class="wedding-day-message">
                        <h3 style="color: var(--primary-color);">🎉 November 24 — Prachi and Hardeep's wedding! 🎉</h3>
                        <p style="color: var(--light-color);">Thank you for celebrating with us — today is a very special day.</p>
                    </div>
                `;
            }
        }
    }

    // Update countdown every second
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

/**
 * Smooth Scrolling
 */
function initSmoothScrolling() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Gallery Functionality
 */
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const imgSrc = img.getAttribute('src');
            const imgAlt = img.getAttribute('alt');
            
            modalImage.setAttribute('src', imgSrc);
            modalImage.setAttribute('alt', imgAlt);
            
            // Show modal using Bootstrap
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        });
    });

    // Gallery hover effects
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        
        item.addEventListener('mouseenter', function() {
            overlay.style.opacity = '1';
            img.style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            overlay.style.opacity = '0';
            img.style.transform = 'scale(1)';
        });
    });
}

/**
 * RSVP Form Functionality
 */
function initRSVPForm() {
    const rsvpForm = document.getElementById('rsvpForm');
    if (!rsvpForm) return;

    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(rsvpForm);
        const rsvpData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            attendance: document.getElementById('attendance').value,
            guests: document.getElementById('guests').value,
            dietary: document.getElementById('dietary').value,
            message: document.getElementById('message').value,
            events: getSelectedEvents()
        };
        
        // Validate required fields
        if (!rsvpData.firstName || !rsvpData.lastName || !rsvpData.email || !rsvpData.attendance) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email
        if (!isValidEmail(rsvpData.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = rsvpForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="loading-spinner"></span>Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        // WhatsApp redirection
        const phoneNumber = '916387343245';
        const message = `
            *New RSVP Submission*

            *Name:* ${rsvpData.firstName} ${rsvpData.lastName}
            *Email:* ${rsvpData.email}
            *Phone:* ${rsvpData.phone || 'N/A'}
            *Attendance:* ${rsvpData.attendance === 'yes' ? 'Yes, attending' : 'Not attending'}
            *Guests:* ${rsvpData.guests}
            *Events:* ${rsvpData.events.join(', ') || 'N/A'}
            *Dietary Needs:* ${rsvpData.dietary}
            *Message:* ${rsvpData.message || 'No message'}
        `;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Redirect to WhatsApp
        window.open(whatsappUrl, '_blank');

        // Show success message
        showNotification(
            rsvpData.attendance === 'yes' 
                ? 'Thank you for your RSVP! We can\'t wait to celebrate with you! 🎉'
                : 'Thank you for letting us know. We\'ll miss you! 💝',
            'success'
        );
        
        // Reset form
        rsvpForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
    
    // Show/hide guest count and events based on attendance
    const attendanceSelect = document.getElementById('attendance');
    const guestsSelect = document.getElementById('guests');
    const guestsField = guestsSelect ? guestsSelect.closest('.mb-3') : null;
    const eventsContainer = document.getElementById('eventsContainer');

    if (attendanceSelect) {
        const onAttendanceChange = function() {
            // Show guests/events by default; hide only when explicitly 'no'
            if (attendanceSelect.value === 'no') {
                if (guestsField) guestsField.style.display = 'none';
                if (eventsContainer) eventsContainer.style.display = 'none';
            } else {
                if (guestsField) guestsField.style.display = '';
                if (eventsContainer) eventsContainer.style.display = '';
            }
        };

        attendanceSelect.addEventListener('change', onAttendanceChange);
        // Initialize display based on current value (show unless 'no')
        onAttendanceChange();
    }
}

/**
 * Get Selected Events from Checkboxes
 */
function getSelectedEvents() {
    const events = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (label) {
            events.push(label.textContent);
        }
    });
    
    return events;
}

/**
 * Email Validation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show Notification
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 9999;
        max-width: 400px;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Add click to dismiss
    notification.addEventListener('click', () => {
        notification.remove();
    });
}



/**
 * Particle Animation (Optional Enhancement)
 */
function initParticles() {
    // Create floating particles for aesthetic enhancement
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    `;
    
    document.body.appendChild(particlesContainer);
    
    // Create initial floating particles
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createParticle(particlesContainer);
            }, i * 150);
    }
    
    // Create new particles periodically
        setInterval(() => {
            // spawn a few at a time for denser look
            const batch = 2 + Math.floor(Math.random() * 3); // 2-4
            for (let i = 0; i < batch; i++) {
                setTimeout(() => createParticle(particlesContainer), i * 120);
            }
        }, 1800);

    // Add hover burst on event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            createHeartBurst(this, 14); // larger hover burst
        });
    });

    // Start per-card emitters when visible (IntersectionObserver)
    initEventEmitters(particlesContainer);
}

/**
 * Create Individual Particle
 */
function createParticle(container) {
    const particle = document.createElement('div');
    // Randomly choose between icon-style or heart-shaped DOM
    if (Math.random() > 0.5) {
        const symbols = ['❤️', '💐', '🌸', '✨', '💫', '🎀', '🌹'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        particle.textContent = symbol;
        particle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 10}px;
            left: ${Math.random() * 100}%;
            top: 100%;
            animation: float-up ${Math.random() * 10 + 15}s linear;
            opacity: ${Math.random() * 0.6 + 0.2};
        `;
    } else {
        particle.className = 'heart-particle';
        const size = Math.random() * 14 + 10;
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            top: 100%;
            width: ${size}px; height: ${size}px;
            animation: float-heart ${Math.random() * 8 + 12}s linear;
            opacity: ${Math.random() * 0.6 + 0.2};
        `;
    }
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 25000);
}

/**
 * Create a burst of heart particles around a target element
 */
function createHeartBurst(target, count = 6) {
    const rect = target.getBoundingClientRect();
    const container = document.querySelector('.particles-container') || document.body;

    for (let i = 0; i < count; i++) {
        const burst = document.createElement('div');
        burst.className = 'burst-particle';
        const size = Math.random() * 14 + 8;
        const startLeft = rect.left + rect.width / 2 + (Math.random() - 0.5) * rect.width * 0.6;
        const startTop = rect.top + rect.height / 2 + (Math.random() - 0.5) * rect.height * 0.4;

        burst.textContent = ['❤️', '✨', '🌸'][Math.floor(Math.random() * 3)];
        burst.style.left = `${startLeft}px`;
        burst.style.top = `${startTop}px`;
        burst.style.fontSize = `${size}px`;
        burst.style.zIndex = 1050;
        burst.style.animation = `float-heart ${Math.random() * 1.2 + 0.9}s linear forwards`;
        burst.style.opacity = 1;

        container.appendChild(burst);

        setTimeout(() => {
            if (burst.parentNode) burst.parentNode.removeChild(burst);
        }, 2000 + Math.random() * 1200);
    }
}

/**
 * Create a single emitter heart from a card (used by emitters)
 */
function createEmitterHeart(container, x, y) {
    const burst = document.createElement('div');
    burst.className = 'burst-particle';
    const size = Math.random() * 12 + 8;
    burst.textContent = ['❤️','🌹','✨'][Math.floor(Math.random()*3)];
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;
    burst.style.fontSize = `${size}px`;
    burst.style.position = 'fixed';
    burst.style.zIndex = 1050;
    burst.style.opacity = 1;
    burst.style.pointerEvents = 'none';

    const dur = Math.random() * 6 + 6; // 6-12s
    burst.style.animation = `float-heart ${dur}s linear forwards`;

    container.appendChild(burst);

    // remove after animation
    setTimeout(() => {
        if (burst.parentNode) burst.parentNode.removeChild(burst);
    }, (dur * 1000) + 500);
}

/**
 * Initialize emitters for each .event-card using IntersectionObserver.
 * When a card becomes visible we spawn a small periodic emitter; stop when not visible.
 */
function initEventEmitters(particlesContainer) {
    if (!('IntersectionObserver' in window)) return;

    const emitters = new WeakMap();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const card = entry.target;
            if (entry.isIntersecting) {
                // start emitter if not running
                if (!emitters.has(card)) {
                    const rect = card.getBoundingClientRect();
                    const emitterId = setInterval(() => {
                        // spawn multiple hearts near card center with slight random offsets
                        const count = 2 + Math.floor(Math.random() * 3); // 2-4 hearts per tick
                        for (let j = 0; j < count; j++) {
                            const cx = rect.left + rect.width / 2 + (Math.random() - 0.5) * rect.width * 0.45;
                            const cy = rect.top + rect.height * (0.55 + Math.random() * 0.25);
                            createEmitterHeart(particlesContainer || document.body, cx, cy);
                        }
                    }, 900 + Math.random() * 800); // faster emitter tick

                    emitters.set(card, { id: emitterId });
                }
            } else {
                // stop emitter
                const info = emitters.get(card);
                if (info) {
                    clearInterval(info.id);
                    emitters.delete(card);
                }
            }
        });
    }, { threshold: 0.25 });

    document.querySelectorAll('.event-card').forEach(c => observer.observe(c));
}

/**
 * Utility Functions
 */

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes float-up {
        from { 
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        to { 
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .particles-container {
        pointer-events: none;
    }
    
    .wedding-day-message {
        text-align: center;
        padding: 2rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        backdrop-filter: blur(10px);
    }
    
    .wedding-day-message h3 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: var(--primary-color) !important;
    }
`;

document.head.appendChild(style);

/**
 * Performance Optimization
 */

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    initLazyLoading();
}

// Console welcome message
console.log(`
🎉 Welcome to Arjun & Priya's Wedding Website! 🎉
Built with love using HTML, CSS, JavaScript & Bootstrap
Made by: Wedding Web Developer
`);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

/**
 * Invitation print/download handlers
 */
document.addEventListener('DOMContentLoaded', function() {
    const printBtn = document.getElementById('printInvitationBtn');
    const downloadBtn = document.getElementById('downloadInvitationBtn');
    const invitationModal = document.getElementById('invitationModal');

    function getInvitationHTML() {
        const card = document.querySelector('.invitation-card');
        if (!card) return '';
        // Clone and inline styles for print
        const clone = card.cloneNode(true);
        // Remove buttons from clone
        const actions = clone.querySelector('.invite-actions');
        if (actions) actions.parentNode.removeChild(actions);
        // Build standalone HTML with inlined minimal styles for printing
        const bodyFont = getComputedStyle(document.body).fontFamily || 'Poppins, sans-serif';
        const bodyColor = getComputedStyle(document.body).color || '#2c1810';

        const inlineStyles = `
            body { margin:0; padding:10px; background: #fff; color: ${bodyColor}; font-family: ${bodyFont}; }
            .invitation-card { max-width: 720px; margin: 0 auto; background: #fffef6; padding: 28px; border: 6px solid rgba(212,175,55,0.12); border-radius: 8px; }
            .invite-heading { color: ${getComputedStyle(document.documentElement).getPropertyValue('--secondary-color') || '#8B0000'}; font-size: 1.1rem; }
            .invite-names { font-family: 'Playfair Display', serif; font-size: 2rem; color: ${bodyColor}; }
            .invite-details p, .invite-extra p, .invite-schedule ul li { font-size: 0.95rem; color: #3f2f2a; margin: 6px 0; }
            .invite-schedule ul { padding-left: 18px; }
        `;

        return `
            <html>
            <head>
                <title>Invitation - Prachi & Hardeep</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500&display=swap" rel="stylesheet">
                <style>${inlineStyles}</style>
            </head>
            <body>
                ${clone.outerHTML}
            </body>
            </html>
        `;
    }

    if (printBtn) {
        printBtn.addEventListener('click', function() {
            const html = getInvitationHTML();
            if (!html) return;

            const printWindow = window.open('', '_blank', 'width=800,height=900');
            if (!printWindow) {
                showNotification('Popup blocked. Please allow popups to print the invitation.', 'error');
                return;
            }
            printWindow.document.open();
            printWindow.document.write(html);
            printWindow.document.close();
            // Wait for content to load then print
            printWindow.onload = function() {
                printWindow.focus();
                printWindow.print();
            };
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Ensure html2pdf is available
            if (typeof html2pdf === 'undefined') {
                showNotification('PDF library not loaded. Please check your internet connection and try again.', 'error');
                return;
            }
            // Generate PDF using html2pdf for a styled download (A5)
            const card = document.querySelector('.invitation-card');
            if (!card) return;

            // Clone the card to avoid modifications to the visible DOM
            const clone = card.cloneNode(true);
            // Remove action buttons from clone
            const actions = clone.querySelector('.invite-actions');
            if (actions) actions.parentNode.removeChild(actions);

            // Create a wrapper for consistent sizing and include Google Fonts link
            const wrapper = document.createElement('div');
            wrapper.style.background = '#fffef6';
            wrapper.style.padding = '20px';
            wrapper.style.display = 'flex';
            wrapper.style.justifyContent = 'center';
            wrapper.appendChild(clone);

            // Apply width so content fits in a single landscape page (A4 landscape is wider)
            // A4 at 96dpi is ~1122px wide (landscape). We set that width so html2pdf maps cleanly to a single page.
            clone.style.maxWidth = '1122px';
            clone.style.width = '1122px';
            clone.style.boxSizing = 'border-box';

            // Prepare options for html2pdf
            const opt = {
                margin: [5, 5, 5, 5], // mm: top, left, bottom, right (smaller margins help fit on one page)
                filename: 'Prachi_Hardeep_Invitation.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                // reduce scale so rendered content is smaller and fits a single page
                html2canvas: { scale: 1, useCORS: true, logging: false },
                // use A4 landscape which gives more horizontal space and helps keep everything on one page
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
            };

            // Temporarily append to body (off-screen) for rendering
            wrapper.style.position = 'fixed';
            wrapper.style.left = '-9999px';
            document.body.appendChild(wrapper);

            // Add loading state to Download button
            const originalBtnHtml = downloadBtn.innerHTML;
            downloadBtn.disabled = true;
            downloadBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Generating...';

            // Ensure fonts are loaded (use FontFaceSet if available)
            function generatePdf() {
                html2pdf().set(opt).from(clone).save().then(() => {
                    // remove wrapper after generation
                    setTimeout(() => { if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper); }, 800);
                }).catch(err => {
                    console.error('PDF generation error:', err);
                    if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
                    // fallback to opening print window
                    const html = getInvitationHTML();
                    const dlWindow = window.open('', '_blank', 'width=900,height=900');
                    if (!dlWindow) {
                        showNotification('Popup blocked. Please allow popups to download the invitation (Save as PDF).', 'error');
                        return;
                    }
                    dlWindow.document.open();
                    dlWindow.document.write(html);
                    dlWindow.document.close();
                }).finally(() => {
                    // restore button state
                    downloadBtn.disabled = false;
                    downloadBtn.innerHTML = originalBtnHtml;
                });
            }

            // Try to wait for fonts to be ready (best-effort)
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(generatePdf).catch(generatePdf);
            } else {
                // Fallback delay
                setTimeout(generatePdf, 350);
            }
        });
    }
});