/**
 * About Us Page Interactivity
 * Enhances the About Us page with interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initSmoothScrolling();
    initNewsletterValidation();
    initDesignerCardInteractions();
    initMobileMenu();
    initAccessibilityEnhancements();
  });
  
  /**
   * Smooth scrolling for navigation links
   */
  function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
  
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Only apply to links with hash
        const href = this.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          e.preventDefault();
  
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
  
          if (targetElement) {
            // Smooth scroll to the element
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
  
            // Update URL without page reload
            history.pushState(null, null, href);
  
            // Set focus to the target for accessibility
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus();
          }
        }
      });
    });
  }
  
  /**
   * Newsletter form validation
   */
  function initNewsletterValidation() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = document.querySelector('.input-field');
  
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
  
        const email = emailInput.value.trim();
  
        // Simple email validation
        if (!isValidEmail(email)) {
          // Show error
          showFormError(emailInput, 'Please enter a valid email address');
          return;
        }
  
        // Success - would normally submit to server
        showFormSuccess(newsletterForm, 'Thank you for subscribing!');
  
        // Reset form
        newsletterForm.reset();
      });
  
      // Clear error on input
      if (emailInput) {
        emailInput.addEventListener('input', function() {
          clearFormError(this);
        });
      }
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
    clearFormError(inputElement);
  
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    errorElement.style.color = '#ff3b30';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '4px';
  
    inputElement.parentNode.classList.add('error');
    inputElement.parentNode.after(errorElement);
  
    // Focus on the input for accessibility
    inputElement.focus();
  }
  
  /**
   * Clear form error message
   */
  function clearFormError(inputElement) {
    const parentForm = inputElement.closest('form');
    const existingErrors = parentForm.querySelectorAll('.form-error');
  
    existingErrors.forEach(error => error.remove());
  
    const inputWrapper = inputElement.parentNode;
    if (inputWrapper.classList.contains('error')) {
      inputWrapper.classList.remove('error');
    }
  }
  
  /**
   * Show form success message
   */
  function showFormSuccess(formElement, message) {
    const successElement = document.createElement('div');
    successElement.className = 'form-success';
    successElement.textContent = message;
    successElement.setAttribute('role', 'status');
    successElement.style.color = '#34c759';
    successElement.style.fontSize = '14px';
    successElement.style.marginTop = '8px';
  
    // Remove any existing success message
    const existingSuccess = formElement.querySelector('.form-success');
    if (existingSuccess) {
      existingSuccess.remove();
    }
  
    formElement.appendChild(successElement);
  
    // Remove success message after 3 seconds
    setTimeout(() => {
      successElement.remove();
    }, 3000);
  }
  
  /**
   * Designer card interactions
   */
  function initDesignerCardInteractions() {
    const designerCards = document.querySelectorAll('.designer-card');
  
    designerCards.forEach(card => {
      // Add hover effect
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.transition = 'transform 0.3s ease';
        this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
      });
  
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
      });
  
      // Add focus effect for accessibility
      const cardInner = card.querySelector('.designer-card-inner');
      if (cardInner) {
        cardInner.setAttribute('tabindex', '0');
  
        cardInner.addEventListener('focus', function() {
          card.style.transform = 'translateY(-8px)';
          card.style.transition = 'transform 0.3s ease';
          card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
  
        cardInner.addEventListener('blur', function() {
          card.style.transform = 'translateY(0)';
          card.style.boxShadow = '';
        });
      }
    });
  }
  
  /**
   * Mobile menu functionality
   */
  function initMobileMenu() {
    // Create mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-toggle')) {
      const navRight = document.querySelector('.nav-right');
      const headerMenu = document.querySelector('.header-menu');
  
      if (navRight && headerMenu) {
        // Create mobile menu toggle button
        const mobileMenuToggle = document.createElement('button');
        mobileMenuToggle.className = 'mobile-menu-toggle';
        mobileMenuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.innerHTML = `
          <span class="menu-bar"></span>
          <span class="menu-bar"></span>
          <span class="menu-bar"></span>
        `;
  
        // Add styles to the button
        mobileMenuToggle.style.display = 'none';
        mobileMenuToggle.style.flexDirection = 'column';
        mobileMenuToggle.style.justifyContent = 'space-between';
        mobileMenuToggle.style.width = '24px';
        mobileMenuToggle.style.height = '18px';
        mobileMenuToggle.style.background = 'none';
        mobileMenuToggle.style.border = 'none';
        mobileMenuToggle.style.cursor = 'pointer';
        mobileMenuToggle.style.padding = '0';
  
        // Style the bars
        const menuBars = mobileMenuToggle.querySelectorAll('.menu-bar');
        menuBars.forEach(bar => {
          bar.style.display = 'block';
          bar.style.width = '100%';
          bar.style.height = '2px';
          bar.style.backgroundColor = '#fff';
          bar.style.transition = 'transform 0.3s ease';
        });
  
        // Insert the button before the first child of navRight
        navRight.insertBefore(mobileMenuToggle, navRight.firstChild);
  
        // Add mobile menu functionality
        mobileMenuToggle.addEventListener('click', function() {
          const expanded = this.getAttribute('aria-expanded') === 'true';
  
          // Toggle menu visibility
          headerMenu.style.display = expanded ? 'none' : 'flex';
          headerMenu.style.flexDirection = expanded ? '' : 'column';
          headerMenu.style.position = expanded ? '' : 'absolute';
          headerMenu.style.top = expanded ? '' : '100%';
          headerMenu.style.left = expanded ? '' : '0';
          headerMenu.style.width = expanded ? '' : '100%';
          headerMenu.style.backgroundColor = expanded ? '' : 'rgba(9, 57, 49, 0.95)';
          headerMenu.style.zIndex = expanded ? '' : '100';
          headerMenu.style.padding = expanded ? '' : '10px 0';
  
          // Update aria-expanded
          this.setAttribute('aria-expanded', !expanded);
  
          // Transform hamburger to X
          if (!expanded) {
            menuBars[0].style.transform = 'translateY(8px) rotate(45deg)';
            menuBars[1].style.opacity = '0';
            menuBars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
          } else {
            menuBars[0].style.transform = 'none';
            menuBars[1].style.opacity = '1';
            menuBars[2].style.transform = 'none';
          }
        });
  
        // Handle window resize
        window.addEventListener('resize', handleResize);
  
        // Initial check
        handleResize();
  
        function handleResize() {
          if (window.innerWidth <= 768) {
            mobileMenuToggle.style.display = 'flex';
            headerMenu.style.display = 'none';
          } else {
            mobileMenuToggle.style.display = 'none';
            headerMenu.style.display = 'flex';
            headerMenu.style.flexDirection = '';
            headerMenu.style.position = '';
            headerMenu.style.top = '';
            headerMenu.style.left = '';
            headerMenu.style.width = '';
            headerMenu.style.backgroundColor = '';
            headerMenu.style.zIndex = '';
            headerMenu.style.padding = '';
  
            // Reset hamburger icon
            menuBars[0].style.transform = 'none';
            menuBars[1].style.opacity = '1';
            menuBars[2].style.transform = 'none';
  
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    }
  }
  
  /**
   * Accessibility enhancements
   */
  function initAccessibilityEnhancements() {
    // Add skip to content link
    addSkipToContentLink();
  
    // Ensure all interactive elements are keyboard accessible
    makeInteractiveElementsAccessible();
  
    // Add ARIA labels where needed
    enhanceAriaLabels();
  }
  
  /**
   * Add skip to content link for keyboard users
   */
  function addSkipToContentLink() {
    if (!document.getElementById('skip-to-content')) {
      const skipLink = document.createElement('a');
      skipLink.id = 'skip-to-content';
      skipLink.href = '#main-content';
      skipLink.textContent = 'Skip to content';
      skipLink.style.position = 'absolute';
      skipLink.style.top = '-40px';
      skipLink.style.left = '0';
      skipLink.style.padding = '8px 16px';
      skipLink.style.backgroundColor = '#093931';
      skipLink.style.color = '#fff';
      skipLink.style.zIndex = '1000';
      skipLink.style.transition = 'top 0.3s ease';
  
      // Show on focus
      skipLink.addEventListener('focus', function() {
        this.style.top = '0';
      });
  
      // Hide on blur
      skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
      });
  
      // Add to the beginning of the body
      document.body.insertBefore(skipLink, document.body.firstChild);
  
      // Add id to the main content area
      const mainContent = document.querySelector('.story-section');
      if (mainContent) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('tabindex', '-1');
      }
    }
  }
  
  /**
   * Make sure all interactive elements are keyboard accessible
   */
  function makeInteractiveElementsAccessible() {
    // Make sure all buttons have type attribute
    document.querySelectorAll('button:not([type])').forEach(button => {
      button.setAttribute('type', 'button');
    });
  
    // Ensure all interactive elements have appropriate roles
    document.querySelectorAll('.nav-link, .footer-link').forEach(link => {
      if (!link.getAttribute('role')) {
        link.setAttribute('role', 'menuitem');
      }
    });
  }
  
  /**
   * Enhance ARIA labels for better screen reader support
   */
  function enhanceAriaLabels() {
    // Add aria-current to active navigation item
    const activeNavLink = document.querySelector('.nav-link.active');
    if (activeNavLink) {
      activeNavLink.setAttribute('aria-current', 'page');
    }
  
    // Add better descriptions to images
    const heroImage = document.querySelector('.hero-background');
    if (heroImage) {
      heroImage.setAttribute('alt', 'Guilded Grace storefront showcasing our elegant jewelry collection');
    }
  
    // Add aria-label to sections without headings
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      if (!section.querySelector('h1, h2, h3, h4, h5, h6') && !section.getAttribute('aria-label')) {
        const className = section.className;
        if (className.includes('hero')) {
          section.setAttribute('aria-label', 'Hero section');
        } else if (className.includes('story')) {
          section.setAttribute('aria-label', 'Our story');
        } else if (className.includes('designers')) {
          section.setAttribute('aria-label', 'Our designers');
        }
      }
    });
  }