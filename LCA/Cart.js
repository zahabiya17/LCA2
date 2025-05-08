/**
 * Checkout Cart Interactivity
 * Handles all interactive elements on the checkout cart page
 */

document.addEventListener('DOMContentLoaded', () => {
    // Quantity selector functionality
    initQuantitySelectors();
  
    // Size selection functionality
    initSizeSelectors();
  
    // Color selection functionality
    initColorSelectors();
  
    // Accordion functionality
    initAccordions();
  });
  
  /**
   * Initialize quantity selector buttons
   */
  function initQuantitySelectors() {
    const decreaseBtn = document.querySelector('.quantity-button.decrease');
    const increaseBtn = document.querySelector('.quantity-button.increase');
    const quantityValue = document.querySelector('.quantity-value');
  
    if (decreaseBtn && increaseBtn && quantityValue) {
      decreaseBtn.addEventListener('click', () => {
        let value = parseInt(quantityValue.textContent);
        if (value > 1) {
          quantityValue.textContent = value - 1;
          // Announce quantity change for screen readers
          quantityValue.setAttribute('aria-live', 'polite');
        }
      });
  
      increaseBtn.addEventListener('click', () => {
        let value = parseInt(quantityValue.textContent);
        quantityValue.textContent = value + 1;
        // Announce quantity change for screen readers
        quantityValue.setAttribute('aria-live', 'polite');
      });
    }
  }
  
  /**
   * Initialize size selection buttons
   */
  function initSizeSelectors() {
    const sizeOptions = document.querySelectorAll('.size-option');
  
    sizeOptions.forEach(option => {
      option.addEventListener('click', () => {
        // Remove selected class from all options
        sizeOptions.forEach(opt => opt.classList.remove('selected'));
  
        // Add selected class to clicked option
        option.classList.add('selected');
  
        // Update the size display text
        const sizeTitle = document.querySelector('.option-title:nth-of-type(2)');
        if (sizeTitle) {
          sizeTitle.textContent = `Size - ${option.textContent}`;
        }
      });
  
      // Add keyboard support
      option.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          option.click();
        }
      });
    });
  }
  
  /**
   * Initialize color selection buttons
   */
  function initColorSelectors() {
    const colorOptions = document.querySelectorAll('.color-option');
  
    colorOptions.forEach(option => {
      option.addEventListener('click', () => {
        // Remove selected class from all options
        colorOptions.forEach(opt => opt.classList.remove('selected'));
  
        // Add selected class to clicked option
        option.classList.add('selected');
  
        // Update the color display text
        const colorTitle = document.querySelector('.option-title:nth-of-type(1)');
        if (colorTitle) {
          const colorName = option.classList.contains('rose-gold') ? 'Rose Gold' : 'Silver';
          colorTitle.textContent = `Color - ${colorName}`;
        }
      });
  
      // Add keyboard support
      option.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          option.click();
        }
      });
    });
  }
  
  /**
   * Initialize accordion functionality
   */
  function initAccordions() {
    const infoHeaders = document.querySelectorAll('.info-header');
  
    infoHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.info-item');
  
        // Toggle expanded class
        item.classList.toggle('expanded');
  
        // Update aria attributes for accessibility
        const isExpanded = item.classList.contains('expanded');
        header.setAttribute('aria-expanded', isExpanded);
  
        // Toggle icon if needed
        const icon = header.querySelector('.expand-icon');
        if (icon) {
          // This would ideally change the icon to a collapse icon
          // For now, we're just updating the aria-label
          icon.setAttribute('aria-label', isExpanded ? 'Collapse' : 'Expand');
        }
      });
  
      // Add keyboard support
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });
  
      // Set initial ARIA attributes
      header.setAttribute('role', 'button');
      header.setAttribute('tabindex', '0');
      header.setAttribute('aria-expanded', 'false');
    });
  }
  
  /**
   * Add to bag functionality
   */
  document.querySelector('.add-to-bag-button')?.addEventListener('click', function() {
    // Here you would typically add the product to the cart
    // For now, we'll just show an alert
    alert('Product added to bag!');
  });
  
  /**
   * Checkout button functionality
   */
  document.querySelector('.checkout-button')?.addEventListener('click', function() {
    // Here you would typically proceed to checkout
    // For now, we'll just show an alert
    alert('Proceeding to checkout!');
  });
  
  /**
   * Buy now button functionality
   */
  document.querySelector('.buy-now-button')?.addEventListener('click', function() {
    // Here you would typically handle one-click purchase
    // For now, we'll just show an alert
    alert('Processing one-click purchase!');
  });
  
  /**
   * Newsletter subscription form
   */
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
  
      if (emailInput && emailInput.value) {
        // Here you would typically submit the form via AJAX
        // For now, we'll just show an alert
        alert(`Thank you for subscribing with ${emailInput.value}!`);
        emailInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }