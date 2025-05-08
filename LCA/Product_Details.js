/**
 * Product Details Page JavaScript
 * Handles all interactive elements on the product details page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initAccordions();
    initProductGallery();
    initColorSelection();
    initSizeSelection();
    initQuantityControls();
    initNewsletterValidation();
  });
  
  /**
   * Accordion functionality for product information sections
   */
  function initAccordions() {
    const accordions = document.querySelectorAll('.info-accordion');
  
    accordions.forEach(accordion => {
      const summary = accordion.querySelector('summary');
      const icon = accordion.querySelector('.accordion-icon');
  
      // Set initial state
      updateAccordionIcon(accordion);
  
      // Add click event listener
      summary.addEventListener('click', (e) => {
        // We'll handle the toggle ourselves to control the animation
        e.preventDefault();
  
        // Toggle the open state
        accordion.open = !accordion.open;
  
        // Update the icon
        updateAccordionIcon(accordion);
      });
    });
  }
  
  /**
   * Update accordion icon based on open/closed state
   */
  function updateAccordionIcon(accordion) {
    const icon = accordion.querySelector('.accordion-icon');
  
    if (accordion.open) {
      // Change to minus icon or rotate current icon
      icon.style.transform = 'rotate(180deg)';
    } else {
      // Change back to plus icon or reset rotation
      icon.style.transform = 'rotate(0deg)';
    }
  }
  
  /**
   * Product gallery functionality
   * - Thumbnail selection
   * - Image zoom
   */
  function initProductGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-product-image');
    const zoomButton = document.querySelector('.zoom-button');
  
    // Handle thumbnail clicks
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        // Update main image source
        mainImage.src = thumbnail.src.replace('_thumbnail', '');
  
        // Update active thumbnail
        thumbnails.forEach(t => t.classList.remove('active'));
        thumbnail.classList.add('active');
      });
    });
  
    // Handle zoom button click
    if (zoomButton) {
      zoomButton.addEventListener('click', () => {
        openImageModal(mainImage.src);
      });
    }
  
    // Handle main image click for zoom
    if (mainImage) {
      mainImage.addEventListener('click', () => {
        openImageModal(mainImage.src);
      });
    }
  }
  
  /**
   * Open modal with zoomed image
   */
  function openImageModal(imageSrc) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'image-modal';
  
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
  
    const closeButton = document.createElement('button');
    closeButton.className = 'modal-close';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close image zoom');
  
    const image = document.createElement('img');
    image.src = imageSrc;
    image.className = 'modal-image';
    image.alt = 'Zoomed product image';
  
    // Assemble modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(image);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
  
    // Add event listeners
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  
    // Handle keyboard events
    document.addEventListener('keydown', handleModalKeydown);
  
    // Focus the close button for accessibility
    closeButton.focus();
  
    function closeModal() {
      document.body.removeChild(modal);
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleModalKeydown);
    }
  
    function handleModalKeydown(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    }
  }
  
  /**
   * Color selection functionality
   */
  function initColorSelection() {
    const colorOptions = document.querySelectorAll('.color-option');
    const colorTitle = document.querySelector('.product-options .option-title');
  
    colorOptions.forEach(option => {
      option.addEventListener('click', () => {
        // Remove selected class from all options
        colorOptions.forEach(opt => opt.classList.remove('selected'));
  
        // Add selected class to clicked option
        option.classList.add('selected');
  
        // Update color title
        const colorName = option.classList.contains('silver') ? 'Silver' : 'Rose Gold';
        if (colorTitle) {
          colorTitle.textContent = `Color - ${colorName}`;
        }
  
        // Announce change for screen readers
        announceChange(`Selected color: ${colorName}`);
      });
    });
  }
  
  /**
   * Size selection functionality
   */
  function initSizeSelection() {
    const sizeOptions = document.querySelectorAll('.size-option');
    const sizeTitle = document.querySelector('.size-header .option-title');
  
    sizeOptions.forEach(option => {
      option.addEventListener('click', () => {
        // Remove selected class from all options
        sizeOptions.forEach(opt => {
          opt.classList.remove('selected');
          opt.setAttribute('aria-pressed', 'false');
        });
  
        // Add selected class to clicked option
        option.classList.add('selected');
        option.setAttribute('aria-pressed', 'true');
  
        // Update size title
        const sizeValue = option.textContent;
        if (sizeTitle) {
          sizeTitle.textContent = `Size - ${sizeValue}`;
        }
  
        // Announce change for screen readers
        announceChange(`Selected size: ${sizeValue}`);
      });
    });
  
    // Size guide button
    const sizeGuideButton = document.querySelector('.size-guide-button');
    if (sizeGuideButton) {
      sizeGuideButton.addEventListener('click', () => {
        // Show size guide modal or navigate to size guide page
        alert('Size guide information would appear here');
      });
    }
  }
  
  /**
   * Quantity selector functionality
   */
  function initQuantityControls() {
    const decreaseBtn = document.querySelector('.quantity-button.decrease');
    const increaseBtn = document.querySelector('.quantity-button.increase');
    const quantityValue = document.querySelector('.quantity-value');
  
    if (decreaseBtn && increaseBtn && quantityValue) {
      decreaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityValue.textContent);
        if (currentValue > 1) {
          currentValue--;
          quantityValue.textContent = currentValue;
          announceChange(`Quantity updated to ${currentValue}`);
        }
      });
  
      increaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityValue.textContent);
        currentValue++;
        quantityValue.textContent = currentValue;
        announceChange(`Quantity updated to ${currentValue}`);
      });
    }
  }
  
  /**
   * Newsletter form validation
   */
  function initNewsletterValidation() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = document.querySelector('.newsletter-input');
  
    if (newsletterForm && emailInput) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const email = emailInput.value.trim();
  
        if (!isValidEmail(email)) {
          // Show error
          showFormError(emailInput, 'Please enter a valid email address');
          return;
        }
  
        // Clear any errors
        clearFormError(emailInput);
  
        // Submit form (in a real implementation, this would likely be an AJAX request)
        console.log('Newsletter subscription for:', email);
  
        // Show success message
        showSuccessMessage(newsletterForm, 'Thank you for subscribing!');
  
        // Reset form
        newsletterForm.reset();
      });
    }
  }
  
  /**
   * Validate email format
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  /**
   * Show form error message
   */
  function showFormError(inputElement, message) {
    // Remove any existing error
    clearFormError(inputElement);
  
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
  
    // Add error styling to input
    inputElement.classList.add('input-error');
  
    // Insert error after input
    inputElement.parentNode.after(errorElement);
  }
  
  /**
   * Clear form error
   */
  function clearFormError(inputElement) {
    // Remove error styling
    inputElement.classList.remove('input-error');
  
    // Remove error message if it exists
    const container = inputElement.closest('.newsletter-form');
    const errorElement = container.querySelector('.form-error');
    if (errorElement) {
      errorElement.remove();
    }
  }
  
  /**
   * Show success message
   */
  function showSuccessMessage(formElement, message) {
    // Create success message
    const successElement = document.createElement('div');
    successElement.className = 'form-success';
    successElement.textContent = message;
    successElement.setAttribute('role', 'status');
  
    // Add to form
    formElement.appendChild(successElement);
  
    // Remove after delay
    setTimeout(() => {
      successElement.remove();
    }, 5000);
  }
  
  /**
   * Announce changes for screen readers
   */
  function announceChange(message) {
    // Create or get the live region
    let liveRegion = document.getElementById('a11y-announcer');
  
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'a11y-announcer';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('class', 'sr-only');
      document.body.appendChild(liveRegion);
    }
  
    // Set the message
    liveRegion.textContent = message;
  
    // Clear after a delay
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 3000);
  }
  
  /**
   * Add to bag and Buy now button functionality
   */
  document.addEventListener('DOMContentLoaded', function() {
    const addToBagButton = document.querySelector('.add-to-bag-button');
    const buyNowButton = document.querySelector('.buy-now-button');
  
    if (addToBagButton) {
      addToBagButton.addEventListener('click', () => {
        // Get selected options
        const selectedColor = document.querySelector('.color-option.selected');
        const selectedSize = document.querySelector('.size-option.selected');
        const quantity = document.querySelector('.quantity-value').textContent;
  
        // Get product info
        const productTitle = document.querySelector('.product-title').textContent;
        const productCode = document.querySelector('.product-code').textContent;
        const productPrice = document.querySelector('.product-price').textContent;
  
        // In a real implementation, this would add the product to the cart
        console.log('Adding to bag:', {
          product: productTitle,
          code: productCode,
          price: productPrice,
          color: selectedColor ? (selectedColor.classList.contains('silver') ? 'Silver' : 'Rose Gold') : 'Not selected',
          size: selectedSize ? selectedSize.textContent : 'Not selected',
          quantity: quantity
        });
  
        // Show confirmation
        showAddToCartConfirmation();
      });
    }
  
    if (buyNowButton) {
      buyNowButton.addEventListener('click', () => {
        // In a real implementation, this would proceed directly to checkout
        console.log('Buy now clicked - proceeding to checkout');
  
        // Redirect to checkout page
        // window.location.href = '/checkout';
  
        // For demo purposes, show alert
        alert('Proceeding to checkout...');
      });
    }
  });
  
  /**
   * Show add to cart confirmation
   */
  function showAddToCartConfirmation() {
    // Create confirmation element
    const confirmation = document.createElement('div');
    confirmation.className = 'cart-confirmation';
    confirmation.setAttribute('role', 'alert');
  
    const message = document.createElement('p');
    message.textContent = 'Item added to your bag';
  
    const viewBagButton = document.createElement('button');
    viewBagButton.className = 'view-bag-button';
    viewBagButton.textContent = 'View Bag';
    viewBagButton.addEventListener('click', () => {
      // Navigate to cart page
      // window.location.href = '/cart';
      alert('Navigating to bag...');
      confirmation.remove();
    });
  
    const closeButton = document.createElement('button');
    closeButton.className = 'close-confirmation';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close notification');
    closeButton.addEventListener('click', () => {
      confirmation.remove();
    });
  
    // Assemble confirmation
    confirmation.appendChild(closeButton);
    confirmation.appendChild(message);
    confirmation.appendChild(viewBagButton);
  
    // Add to page
    document.body.appendChild(confirmation);
  
    // Remove after delay
    setTimeout(() => {
      if (document.body.contains(confirmation)) {
        confirmation.remove();
      }
    }, 5000);
  }
  
  /**
   * Add CSS for JavaScript-created elements
   */
  function addDynamicStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Screen reader only class */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
  
      /* Image modal */
      .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
  
      .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
      }
  
      .modal-image {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
      }
  
      .modal-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        background: none;
        border: none;
        cursor: pointer;
      }
  
      /* Form validation */
      .input-error {
        border-color: #e74c3c !important;
      }
  
      .form-error {
        color: #e74c3c;
        font-size: 12px;
        margin-top: 5px;
      }
  
      .form-success {
        color: #2ecc71;
        font-size: 14px;
        margin-top: 10px;
      }
  
      /* Cart confirmation */
      .cart-confirmation {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: rgba(13, 85, 74, 0.95);
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 100;
        max-width: 300px;
      }
  
      .close-confirmation {
        position: absolute;
        top: 5px;
        right: 10px;
        color: white;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
      }
  
      .view-bag-button {
        background-color: rgba(242, 198, 109, 1);
        color: rgba(107, 74, 9, 1);
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        margin-top: 10px;
        cursor: pointer;
      }
  
      /* Active thumbnail */
      .thumbnail.active {
        border: 2px solid rgba(13, 85, 74, 1);
      }
    `;
  
    document.head.appendChild(styleElement);
  }
  
  // Add dynamic styles when DOM is loaded
  document.addEventListener('DOMContentLoaded', addDynamicStyles);