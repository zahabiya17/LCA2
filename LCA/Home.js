document.addEventListener('DOMContentLoaded', () => {
    // Testimonial carousel functionality
    initTestimonialCarousel();
  
    // Shop now button functionality
    initShopNowButtons();
  
    //  keyboard navigation for accessibility
    initKeyboardNavigation();
  });
  
  /**
   * Initialize the testimonial carousel
   */
  function initTestimonialCarousel() {
    const state = {
      currentTestimonial: 0,
      testimonials: [
        {
          text: "The ring itself is stunning, with a beautiful design that catches the light and sparkles from every angle. The quality of the materials used is evident, as the ring feels substantial and durable. The gemstone is exquisite, with a vibrant color and exceptional clarity.",
          author: "Anna Fernandez",
          location: "USA",
        },
        {
          text: "Absolutely in love with my new necklace! The craftsmanship is impeccable and the customer service was outstanding.",
          author: "Sarah Mitchell",
          location: "Canada",
        },
      ]
    };
  
    // DOM elements
    const testimonialContainer = document.getElementById('testimonial-container');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
  
    if (!testimonialContainer || !prevButton || !nextButton) {
      console.warn('Testimonial elements not found in the DOM');
      return;
    }
  
    // Update testimonial content
    function updateTestimonial() {
      const current = state.testimonials[state.currentTestimonial];
  
      const testimonialContent = `
        <div class="testimonial-grid">
          <div class="testimonial-image-column">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c65fc492089b4ea64041e9c291ca2d24198a61e?placeholderIfAbsent=true&apiKey=8970a96be2b14d51b5d139cb78b09cd4"
                 alt="Customer ${current.author}"
                 class="testimonial-image">
          </div>
          <div class="testimonial-text-column">
            <div class="testimonial-content">
              <p class="testimonial-text">${current.text}</p>
              <p class="testimonial-author">${current.author}</p>
              <p class="testimonial-location">${current.location}</p>
            </div>
          </div>
        </div>
      `;
  
      testimonialContainer.innerHTML = testimonialContent;
  
      // Announce to screen readers that the content has changed
      announceTestimonialChange(current);
    }
  
    // Announce testimonial change to screen readers
    function announceTestimonialChange(testimonial) {
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('class', 'sr-only');
      liveRegion.textContent = `Showing testimonial from ${testimonial.author} from ${testimonial.location}`;
      document.body.appendChild(liveRegion);
  
      setTimeout(() => {
        document.body.removeChild(liveRegion);
      }, 1000);
    }
  
    // Event handlers
    function nextTestimonial() {
      state.currentTestimonial = (state.currentTestimonial + 1) % state.testimonials.length;
      updateTestimonial();
    }
  
    function prevTestimonial() {
      state.currentTestimonial = state.currentTestimonial === 0
        ? state.testimonials.length - 1
        : state.currentTestimonial - 1;
      updateTestimonial();
    }
  
    // Add event listeners
    nextButton.addEventListener('click', nextTestimonial);
    prevButton.addEventListener('click', prevTestimonial);
  
    // Initialize with first testimonial
    updateTestimonial();
  }
  
  /**
   * Initialize shop now buttons
   */
  function initShopNowButtons() {
    const shopNowButtons = document.querySelectorAll('.shop-now-btn, .btn-outline-primary, .btn-outline-light');
  
    shopNowButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        // Prevent default only if it's a button (not an anchor)
        if (button.tagName === 'BUTTON') {
          e.preventDefault();
        }
  
        // Navigate to shop page
        window.location.href = "Our_Products";
      });
    });
  }
  
  /**
   * Initialize keyboard navigation for accessibility
   */
  function initKeyboardNavigation() {
    // Add keyboard navigation for testimonial carousel
    document.addEventListener('keydown', (e) => {
      // Only handle arrow keys when focus is within the testimonial section
      const testimonialSection = document.querySelector('.testimonials-section');
      const activeElement = document.activeElement;
  
      if (testimonialSection && testimonialSection.contains(activeElement)) {
        const prevButton = document.getElementById('prev-testimonial');
        const nextButton = document.getElementById('next-testimonial');
  
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevButton.click();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextButton.click();
        }
      }
    });
  
    // Add focus trap for modal dialogs if they exist
    const modals = document.querySelectorAll('[role="dialog"]');
    modals.forEach(modal => {
      initFocusTrap(modal);
    });
  }
  
  /**
   * Initialize focus trap for modal dialogs
   * @param {HTMLElement} modal - The modal dialog element
   */
  function initFocusTrap(modal) {
    if (!modal) return;
  
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  
    if (focusableElements.length === 0) return;
  
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
  
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        // Shift + Tab
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
        // Tab
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }
  
  /**
   * Add hover effects for product cards
   */
  function initProductHoverEffects() {
    const productCards = document.querySelectorAll('.product-card');
  
    productCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
      });
  
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0px 0px 2px rgba(23, 26, 31, 0.12)';
      });
    });
  }
  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const emailInput = this.querySelector('.newsletter-input');
      const email = emailInput.value.trim();

      if (email && isValidEmail(email)) {
        console.log(`Newsletter subscription for email: ${email}`);
        // In a real implementation, this would submit the form to a backend

        // Show success message
        alert('Thank you for subscribing to our newsletter!');

        // Clear the input
        emailInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });