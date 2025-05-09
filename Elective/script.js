// Wait for DOM to fully load before executing
document.addEventListener('DOMContentLoaded', function() {
    // ---------- Navigation Handling ----------
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.classList.add('mobile-menu-toggle');
    mobileMenuToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
    `;
    
    // Add mobile menu toggle to navigation
    const nav = document.querySelector('nav');
    nav.appendChild(mobileMenuToggle);
    
    // Mobile menu functionality
    mobileMenuToggle.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetPosition = document.querySelector(targetId).offsetTop - 80;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // ---------- Header Scroll Effect ----------
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ---------- Feature Cards Animation ----------
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const featureObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                featureObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    featureCards.forEach(card => {
        featureObserver.observe(card);
    });
    
    // ---------- Testimonial Carousel ----------
    const testimonialContainer = document.querySelector('.testimonial-cards');
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    if (testimonials.length > 3) {
        // Create carousel controls
        const carouselControls = document.createElement('div');
        carouselControls.classList.add('carousel-controls');
        
        const prevButton = document.createElement('button');
        prevButton.classList.add('carousel-control', 'prev');
        prevButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        `;
        
        const nextButton = document.createElement('button');
        nextButton.classList.add('carousel-control', 'next');
        nextButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        `;
        
        carouselControls.appendChild(prevButton);
        carouselControls.appendChild(nextButton);
        
        testimonialContainer.parentNode.appendChild(carouselControls);
        
        let currentIndex = 0;
        
        // Initially hide testimonials except first three
        updateTestimonialVisibility();
        
        // Carousel navigation functionality
        prevButton.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateTestimonialVisibility();
            }
        });
        
        nextButton.addEventListener('click', function() {
            if (currentIndex < testimonials.length - 3) {
                currentIndex++;
                updateTestimonialVisibility();
            }
        });
        
        function updateTestimonialVisibility() {
            testimonials.forEach((card, index) => {
                if (index >= currentIndex && index < currentIndex + 3) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update button states
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex >= testimonials.length - 3;
        }
    }
    
    // ---------- Contact Form Validation ----------
    // Create a contact form
    const contactSection = document.getElementById('contact');
    const footerColumns = contactSection.querySelector('.footer-grid');
    
    const contactFormColumn = document.createElement('div');
    contactFormColumn.classList.add('footer-column', 'contact-form-column');
    
    contactFormColumn.innerHTML = `
        <h3>Get in Touch</h3>
        <form id="contactForm">
            <div class="form-group">
                <input type="text" id="name" placeholder="Your Name" required>
            </div>
            <div class="form-group">
                <input type="email" id="email" placeholder="Your Email" required>
            </div>
            <div class="form-group">
                <textarea id="message" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" class="btn">Send Message</button>
            <div id="formMessage"></div>
        </form>
    `;
    
    // Replace the last column with the contact form
    footerColumns.replaceChild(contactFormColumn, footerColumns.lastElementChild);
    
    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name.length < 2) {
            showFormMessage('Please enter a valid name', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        if (message.length < 10) {
            showFormMessage('Please enter a message with at least 10 characters', 'error');
            return;
        }
        
        // Simulate form submission
        showFormMessage('Sending your message...', 'info');
        
        // Construct email data that would be sent to backend
        const emailData = {
            to: 'sales@finsys.com',
            from: email,
            subject: `Contact Form Message from ${name}`,
            body: message,
            timestamp: new Date().toISOString()
        };
        
        // Log what would be sent to server (for demonstration)
        console.log('Sending email with the following data:', emailData);
        
        // In a real implementation, you would use fetch to send the data to your backend server
        // Example of how this would work with a real backend:
        /*
        fetch('process-email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Handle success
                contactForm.reset();
                showReceipt(name, email, message, data.messageId);
            } else {
                // Handle error
                showFormMessage('Error: ' + data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showFormMessage('An error occurred while sending your message. Please try again.', 'error');
        });
        */
        
        // Simulate email API call with timeout
        setTimeout(function() {
            // Simulate successful response from server
            const response = {
                success: true,
                messageId: 'msg_' + Math.random().toString(36).substr(2, 9),
                sentTo: 'sales@finsys.com',
                deliveryStatus: 'queued'
            };
            
            console.log('Response from server:', response);
            
            // Reset form
            contactForm.reset();
            
            // Create a detailed receipt of the message
            const receiptDetails = document.createElement('div');
            receiptDetails.classList.add('message-receipt');
            receiptDetails.innerHTML = `
                <h4>Message Sent Successfully!</h4>
                <p><strong>From:</strong> ${name} (${email})</p>
                <p><strong>To:</strong> sales@finsys.com</p>
                <p><strong>Message:</strong> "${message.substring(0, 50)}${message.length > 50 ? '...' : ''}"</p>
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Reference ID:</strong> ${response.messageId}</p>
            `;
            
            // Show receipt temporarily
            formMessage.innerHTML = '';
            formMessage.appendChild(receiptDetails);
            formMessage.classList.add('form-message', 'success');
            
            // After 5 seconds, show shorter success message
            setTimeout(() => {
                showFormMessage('Your message has been sent successfully!', 'success');
            }, 5000);
        }, 1500);
    });
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = '';
        formMessage.classList.add('form-message', type);
        
        // Clear success/info messages after 5 seconds
        if (type === 'success' || type === 'info') {
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = '';
            }, 5000);
        }
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // ---------- Demo Request Modal ----------
    const demoButton = document.querySelector('.cta .btn');
    
    // Create modal HTML
    const modalHTML = `
        <div id="demoModal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Request a Demo</h2>
                <p>Fill out the form below and our team will contact you to schedule a personalized demo of our financial systems.</p>
                <form id="demoForm">
                    <div class="form-group">
                        <label for="companyName">Company Name</label>
                        <input type="text" id="companyName" required>
                    </div>
                    <div class="form-group">
                        <label for="contactName">Contact Name</label>
                        <input type="text" id="contactName" required>
                    </div>
                    <div class="form-group">
                        <label for="contactEmail">Email Address</label>
                        <input type="email" id="contactEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="contactPhone">Phone Number</label>
                        <input type="tel" id="contactPhone" required>
                    </div>
                    <div class="form-group">
                        <label for="venueType">Venue Type</label>
                        <select id="venueType" required>
                            <option value="">Select an option</option>
                            <option value="theater">Theater</option>
                            <option value="concert">Concert Venue</option>
                            <option value="sports">Sports Arena</option>
                            <option value="multipurpose">Multipurpose Venue</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <button type="submit" class="btn">Submit Request</button>
                </form>
                <div id="demoFormMessage"></div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const demoModal = document.getElementById('demoModal');
    const closeModal = document.querySelector('.close-modal');
    const demoForm = document.getElementById('demoForm');
    const demoFormMessage = document.getElementById('demoFormMessage');
    
    // Open modal when demo button is clicked
    demoButton.addEventListener('click', function(e) {
        e.preventDefault();
        demoModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
    
    // Close modal when X is clicked
    closeModal.addEventListener('click', function() {
        demoModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === demoModal) {
            demoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Demo form submission
    demoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const companyName = document.getElementById('companyName').value;
        const contactName = document.getElementById('contactName').value;
        const contactEmail = document.getElementById('contactEmail').value;
        const contactPhone = document.getElementById('contactPhone').value;
        const venueType = document.getElementById('venueType').value;
        
        // Display processing message
        demoFormMessage.textContent = 'Processing your request...';
        demoFormMessage.className = 'form-message info';
        
        // Simulate form submission
        setTimeout(function() {
            demoForm.reset();
            demoFormMessage.textContent = 'Thank you! Your demo request has been received. Our team will contact you within 24 hours.';
            demoFormMessage.className = 'form-message success';
            
            // Close modal after 3 seconds
            setTimeout(function() {
                demoModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                demoFormMessage.textContent = '';
            }, 3000);
        }, 1500);
    });
    
    // ---------- Statistics Counter ----------
    // Add statistics section
    const statsSection = document.createElement('section');
    statsSection.classList.add('stats');
    statsSection.innerHTML = `
        <div class="container">
            <div class="stats-grid">
                <div class="stat-item">
                    <h3 class="stat-counter" data-target="500">0</h3>
                    <p>Venues Served</p>
                </div>
                <div class="stat-item">
                    <h3 class="stat-counter" data-target="5000000">0</h3>
                    <p>Transactions Processed</p>
                </div>
                <div class="stat-item">
                    <h3 class="stat-counter" data-target="99.9">0</h3>
                    <p>Uptime Percentage</p>
                </div>
                <div class="stat-item">
                    <h3 class="stat-counter" data-target="25">0</h3>
                    <p>Countries</p>
                </div>
            </div>
        </div>
    `;
    
    // Insert stats section before CTA
    const ctaSection = document.querySelector('.cta');
    ctaSection.parentNode.insertBefore(statsSection, ctaSection);
    
    // Counter animation
    const statCounters = document.querySelectorAll('.stat-counter');
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statCounters.forEach(counter => {
        statsObserver.observe(counter);
    });
    
    function animateCounter(counter) {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / 100;
        let current = 0;
        const startTime = performance.now();
        
        function updateCounter(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            current = progress * target;
            
            // Format with commas for thousands and keep decimals if present
            if (target % 1 !== 0) {
                counter.textContent = current.toFixed(1);
            } else if (target > 999) {
                counter.textContent = Math.floor(current).toLocaleString();
            } else {
                counter.textContent = Math.floor(current);
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // ---------- Add Back to Top Button ----------
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    `;
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});