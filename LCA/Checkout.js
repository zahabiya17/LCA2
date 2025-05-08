/**
 * Guilded Grace Checkout Page Interactivity
 * This script adds interactive functionality to the checkout page
 */

// Wait for DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initCartFunctionality();
    initVoucherFunctionality();
    initNewsletterFunctionality();
    initMobileMenu();
    initPaymentMethodSelection();
  });
  
  /**
   * Cart Functionality
   * Handles cart item removal and total recalculation
   */
  function initCartFunctionality() {
    // Get all delete buttons in the cart
    const deleteButtons = document.querySelectorAll('.delete-button');
  
    if (!deleteButtons.length) return;
  
    // Add click event to each delete button
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Find the parent order item
        const orderItem = this.closest('.order-item');
        if (!orderItem) return;
  
        // Get item details for confirmation
        const itemName = orderItem.querySelector('.item-name')?.textContent || 'Item';
        const itemPriceText = orderItem.querySelector('.item-price')?.textContent || '$0';
        const itemPrice = parseFloat(itemPriceText.replace('$', '')) || 0;
  
        // Remove the item with animation
        orderItem.style.opacity = '0';
        setTimeout(() => {
          orderItem.remove();
          updateCartTotals(-itemPrice);
  
          // Show notification
          showNotification(`${itemName} has been removed from your cart`);
  
          // Check if cart is empty
          const remainingItems = document.querySelectorAll('.order-item');
          if (remainingItems.length === 0) {
            const orderItems = document.querySelector('.order-items');
            if (orderItems) {
              const emptyMessage = document.createElement('p');
              emptyMessage.className = 'empty-cart-message';
              emptyMessage.textContent = 'Your cart is empty. Continue shopping to add items.';
              orderItems.appendChild(emptyMessage);
            }
          }
        }, 300);
      });
    });
  }
  
  /**
   * Update cart totals when items are removed
   */
  function updateCartTotals(priceChange) {
    // Get elements
    const subtotalElement = document.querySelector('.summary-row:nth-child(1) .summary-value');
    const discountElement = document.querySelector('.summary-row:nth-child(2) .summary-value');
    const totalElement = document.querySelector('.total-value');
  
    if (!subtotalElement || !totalElement) return;
  
    // Parse current values
    const currentSubtotal = parseFloat(subtotalElement.textContent.replace('$', '')) || 0;
    const currentDiscount = parseFloat(discountElement?.textContent.replace('-$', '')) || 0;
  
    // Calculate new values
    const newSubtotal = currentSubtotal + priceChange;
    const newTotal = newSubtotal - currentDiscount;
  
    // Update display
    subtotalElement.textContent = `$${newSubtotal.toFixed(2)}`;
    totalElement.textContent = `$${newTotal.toFixed(2)}`;
  
    // Announce for screen readers
    announceToScreenReader(`Cart updated. New total: $${newTotal.toFixed(2)}`);
  }
  
  /**
   * Voucher Functionality
   * Handles voucher code application and discount calculation
   */
  function initVoucherFunctionality() {
    const applyButton = document.querySelector('.apply-button');
    const voucherInput = document.querySelector('.voucher-input');
    const discountBadge = document.querySelector('.discount-badge');
  
    if (!applyButton || !voucherInput) return;
  
    // Sample voucher codes
    const validVouchers = {
      'WELCOME15': 15,
      'JEWELRY20': 20,
      'SUMMER10': 10
    };
  
    applyButton.addEventListener('click', function() {
      const code = voucherInput.value.trim().toUpperCase();
  
      if (!code) {
        showNotification('Please enter a voucher code', 'error');
        return;
      }
  
      if (validVouchers[code]) {
        // Valid voucher code
        const discountAmount = validVouchers[code];
        applyDiscount(discountAmount);
  
        // Update UI
        if (discountBadge) {
          discountBadge.textContent = `$${discountAmount} Off`;
          discountBadge.style.display = 'inline-block';
        }
  
        showNotification(`Voucher applied! $${discountAmount} discount added`, 'success');
      } else {
        // Invalid voucher code
        showNotification('Invalid voucher code. Please try again', 'error');
      }
    });
  }
  
  /**
   * Apply discount to order total
   */
  function applyDiscount(amount) {
    const discountElement = document.querySelector('.summary-row:nth-child(2) .summary-value');
    const subtotalElement = document.querySelector('.summary-row:nth-child(1) .summary-value');
    const totalElement = document.querySelector('.total-value');
  
    if (!discountElement || !subtotalElement || !totalElement) return;
  
    // Update discount display
    discountElement.textContent = `-$${amount}`;
  
    // Calculate new total
    const subtotal = parseFloat(subtotalElement.textContent.replace('$', '')) || 0;
    const newTotal = subtotal - amount;
  
    // Update total display
    totalElement.textContent = `$${newTotal.toFixed(2)}`;
  
    // Announce for screen readers
    announceToScreenReader(`Discount applied. New total: $${newTotal.toFixed(2)}`);
  }
  
  /**
   * Newsletter Subscription
   * Handles newsletter form validation and submission
   */
  function initNewsletterFunctionality() {
    const subscribeButton = document.querySelector('.subscribe-button');
    const emailInput = document.querySelector('.email-input');
  
    if (!subscribeButton || !emailInput) return;
  
    subscribeButton.addEventListener('click', function() {
      const email = emailInput.value.trim();
  
      if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
      }
  
      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }
  
      // Simulate successful subscription
      showNotification('Thank you for subscribing to our newsletter!', 'success');
      emailInput.value = '';
    });
  }
  
  /**
   * Validate email format
   */
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  /**
   * Mobile Menu
   * Creates and handles mobile navigation menu
   */
  function initMobileMenu() {
    // Only create mobile menu if we're on a small screen or if the menu doesn't exist yet
    if (window.innerWidth > 640 && !document.querySelector('.mobile-menu-toggle')) return;
  
    const header = document.querySelector('.site-header');
    if (!header) return;
  
    // Create mobile menu toggle button if it doesn't exist
    if (!document.querySelector('.mobile-menu-toggle')) {
      const menuToggle = document.createElement('button');
      menuToggle.className = 'mobile-menu-toggle';
      menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
      menuToggle.innerHTML = `
        <span class="menu-bar"></span>
        <span class="menu-bar"></span>
        <span class="menu-bar"></span>
      `;
      header.appendChild(menuToggle);
  
      // Create mobile menu
      const mobileMenu = document.createElement('div');
      mobileMenu.className = 'mobile-menu';
      mobileMenu.setAttribute('aria-hidden', 'true');
  
      // Clone navigation items from desktop menu
      const navList = document.querySelector('.nav-list');
      if (navList) {
        const mobileNavList = navList.cloneNode(true);
        mobileMenu.appendChild(mobileNavList);
      }
  
      document.body.appendChild(mobileMenu);
  
      // Toggle menu on button click
      menuToggle.addEventListener('click', function() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('active');
        mobileMenu.setAttribute('aria-hidden', isExpanded);
  
        // Prevent body scrolling when menu is open
        document.body.style.overflow = isExpanded ? '' : 'hidden';
      });
  
      // Close menu when clicking outside
      document.addEventListener('click', function(event) {
        if (mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(event.target) &&
            !menuToggle.contains(event.target)) {
          menuToggle.click();
        }
      });
  
      // Close menu on ESC key
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
          menuToggle.click();
        }
      });
    }
  }
  
  /**
   * Payment Method Selection
   * Handles payment method change functionality
   */
  function initPaymentMethodSelection() {
    const changePaymentLink = document.querySelector('.change-payment-link');
  
    if (!changePaymentLink) return;
  
    changePaymentLink.addEventListener('click', function() {
      // Create modal for payment method selection
      const modal = createPaymentModal();
      document.body.appendChild(modal);
  
      // Show modal with animation
      setTimeout(() => {
        modal.classList.add('active');
      }, 10);
    });
  }
  
  /**
   * Create payment method selection modal
   */
  function createPaymentModal() {
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'payment-modal-title');
  
    modal.innerHTML = `
      <div class="payment-modal-content">
        <div class="payment-modal-header">
          <h3 id="payment-modal-title">Select Payment Method</h3>
          <button class="close-modal" aria-label="Close payment method selection">&times;</button>
        </div>
        <div class="payment-modal-body">
          <div class="payment-option">
            <input type="radio" id="card-mastercard" name="payment-method" checked>
            <label for="card-mastercard">Mastercard (**** 5987)</label>
          </div>
          <div class="payment-option">
            <input type="radio" id="card-visa" name="payment-method">
            <label for="card-visa">Visa (**** 4321)</label>
          </div>
          <div class="payment-option">
            <input type="radio" id="card-paypal" name="payment-method">
            <label for="card-paypal">PayPal</label>
          </div>
          <div class="payment-option">
            <input type="radio" id="card-new" name="payment-method">
            <label for="card-new">Add new payment method</label>
          </div>
        </div>
        <div class="payment-modal-footer">
          <button class="cancel-button">Cancel</button>
          <button class="confirm-button">Confirm</button>
        </div>
      </div>
    `;
  
    // Add event listeners to modal buttons
    setTimeout(() => {
      const closeButton = modal.querySelector('.close-modal');
      const cancelButton = modal.querySelector('.cancel-button');
      const confirmButton = modal.querySelector('.confirm-button');
  
      if (closeButton) {
        closeButton.addEventListener('click', () => closePaymentModal(modal));
      }
  
      if (cancelButton) {
        cancelButton.addEventListener('click', () => closePaymentModal(modal));
      }
  
      if (confirmButton) {
        confirmButton.addEventListener('click', () => {
          updateSelectedPaymentMethod(modal);
          closePaymentModal(modal);
        });
      }
  
      // Close on outside click
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closePaymentModal(modal);
        }
      });
    }, 0);
  
    return modal;
  }
  
  /**
   * Close payment modal with animation
   */
  function closePaymentModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 300);
  }
  
  /**
   * Update the selected payment method in the UI
   */
  function updateSelectedPaymentMethod(modal) {
    const selectedMethod = modal.querySelector('input[name="payment-method"]:checked');
    if (!selectedMethod) return;
  
    const cardName = document.querySelector('.card-name');
    const cardNumber = document.querySelector('.card-number');
  
    if (!cardName || !cardNumber) return;
  
    // Update payment method display based on selection
    switch (selectedMethod.id) {
      case 'card-mastercard':
        cardName.textContent = 'Mastercard';
        cardNumber.textContent = '**** 5987';
        break;
      case 'card-visa':
        cardName.textContent = 'Visa';
        cardNumber.textContent = '**** 4321';
        break;
      case 'card-paypal':
        cardName.textContent = 'PayPal';
        cardNumber.textContent = '';
        break;
      case 'card-new':
        // In a real application, this would open a form to add a new payment method
        cardName.textContent = 'New Card';
        cardNumber.textContent = '';
        break;
    }
  
    // Show confirmation notification
    const methodLabel = selectedMethod.nextElementSibling.textContent;
    showNotification(`Payment method updated to ${methodLabel}`, 'success');
  }
  
  /**
   * Show notification message to the user
   */
  function showNotification(message, type = 'info') {
    // Create notification container if it doesn't exist
    let container = document.querySelector('.notification-container');
  
    if (!container) {
      container = document.createElement('div');
      container.className = 'notification-container';
      document.body.appendChild(container);
    }
  
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
  
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'notification-close';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close notification');
    notification.appendChild(closeButton);
  
    // Add to container
    container.appendChild(notification);
  
    // Show with animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
  
    // Auto-remove after 5 seconds
    const timeout = setTimeout(() => {
      removeNotification(notification);
    }, 5000);
  
    // Close button functionality
    closeButton.addEventListener('click', () => {
      clearTimeout(timeout);
      removeNotification(notification);
    });
  
    // Announce for screen readers
    announceToScreenReader(message);
  }
  
  /**
   * Remove notification with animation
   */
  function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }
  
  /**
   * Announce message to screen readers using ARIA live regions
   */
  function announceToScreenReader(message) {
    // Find or create ARIA live region
    let announcer = document.getElementById('screen-reader-announcer');
  
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'screen-reader-announcer';
      announcer.className = 'sr-only';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(announcer);
    }
  
    // Set the message
    announcer.textContent = message;
  }
  
  // Add CSS for JavaScript-created elements
  (function addDynamicStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Mobile Menu Styles */
      .mobile-menu-toggle {
        display: none;
      }
  
      @media (max-width: 640px) {
        .mobile-menu-toggle {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 21px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1001;
        }
  
        .menu-bar {
          width: 100%;
          height: 3px;
          background-color: white;
          border-radius: 3px;
          transition: all 0.3s ease;
        }
  
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #093931;
          z-index: 1000;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          padding: 60px 20px 20px;
        }
  
        .mobile-menu.active {
          transform: translateX(0);
        }
  
        .mobile-menu .nav-list {
          flex-direction: column;
          align-items: center;
          margin-bottom: 30px;
        }
  
        .mobile-menu .nav-link {
          font-size: 18px;
          padding: 15px 0;
          display: block;
        }
      }
  
      /* Notification Styles */
      .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1001;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
  
      .notification {
        background-color: white;
        color: #333;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 280px;
        max-width: 400px;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        position: relative;
      }
  
      .notification.show {
        transform: translateX(0);
      }
  
      .notification.success {
        border-left: 4px solid #0d554a;
      }
  
      .notification.error {
        border-left: 4px solid #e8502e;
      }
  
      .notification.info {
        border-left: 4px solid #379ae6;
      }
  
      .notification-close {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #565E6C;
        margin-left: 10px;
      }
  
      /* Payment Modal Styles */
      .payment-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
  
      .payment-modal.active {
        opacity: 1;
      }
  
      .payment-modal-content {
        background-color: white;
        border-radius: 8px;
        width: 90%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      }
  
      .payment-modal-header {
        padding: 15px 20px;
        border-bottom: 1px solid #f3f4f6;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
  
      .payment-modal-header h3 {
        margin: 0;
        font-family: "Cormorant Garamond", serif;
        font-size: 24px;
        color: #171a1f;
      }
  
      .close-modal {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #565E6C;
      }
  
      .payment-modal-body {
        padding: 20px;
      }
  
      .payment-option {
        margin-bottom: 15px;
        display: flex;
        align-items: center;
      }
  
      .payment-option input {
        margin-right: 10px;
      }
  
      .payment-option label {
        font-size: 16px;
        color: #171a1f;
      }
  
      .payment-modal-footer {
        padding: 15px 20px;
        border-top: 1px solid #f3f4f6;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }
  
      .cancel-button {
        padding: 8px 16px;
        border: 1px solid #bcc1ca;
        border-radius: 4px;
        background-color: white;
        color: #565E6C;
        font-size: 14px;
      }
  
      .confirm-button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        background-color: #0d554a;
        color: white;
        font-size: 14px;
      }
  
      /* Empty cart message */
      .empty-cart-message {
        text-align: center;
        padding: 20px;
        color: #565E6C;
        font-size: 16px;
      }
  
      /* Accessibility */
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
  
      /* Focus styles for accessibility */
      a:focus, button:focus, input:focus {
        outline: 2px solid #379ae6;
        outline-offset: 2px;
      }
    `;
  
    document.head.appendChild(styleElement);
  })();