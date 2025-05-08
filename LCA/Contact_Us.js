/**
 * Contact Us Page JavaScript
 * Handles form validation, submission, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get form elements
  const contactForm = document.querySelector('.contact-form');
  const newsletterForm = document.querySelector('.newsletter-form');
  const fullNameInput = document.getElementById('fullname');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const newsletterEmailInput = document.querySelector('.newsletter-input');

  // Form submission buttons
  const submitButton = document.querySelector('.submit-button');
  const newsletterButton = document.querySelector('.newsletter-button');

  // Add aria-live region for form feedback
  const createFeedbackElement = () => {
    const feedbackEl = document.createElement('div');
    feedbackEl.className = 'form-feedback';
    feedbackEl.setAttribute('aria-live', 'polite');
    return feedbackEl;
  };

  // Add feedback elements to forms
  const contactFeedback = createFeedbackElement();
  const newsletterFeedback = createFeedbackElement();
  contactForm.appendChild(contactFeedback);
  newsletterForm.appendChild(newsletterFeedback);

  /**
   * Form validation functions
   */
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateContactForm = () => {
    let isValid = true;

    // Reset previous error states
    resetFormErrors(contactForm);

    // Validate full name
    if (!fullNameInput.value.trim()) {
      showError(fullNameInput, 'Please enter your name');
      isValid = false;
    }

    // Validate email
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Please enter your email');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    }

    // Validate message
    if (!messageInput.value.trim()) {
      showError(messageInput, 'Please enter your message');
      isValid = false;
    }

    return isValid;
  };

  const validateNewsletterForm = () => {
    let isValid = true;

    // Reset previous error states
    resetFormErrors(newsletterForm);

    // Validate email
    if (!newsletterEmailInput.value.trim()) {
      showError(newsletterEmailInput, 'Please enter your email');
      isValid = false;
    } else if (!validateEmail(newsletterEmailInput.value.trim())) {
      showError(newsletterEmailInput, 'Please enter a valid email address');
      isValid = false;
    }

    return isValid;
  };

  /**
   * Error handling functions
   */
  const showError = (inputElement, message) => {
    const parentElement = inputElement.closest('.input-wrapper') ||
                          inputElement.closest('.textarea-wrapper') ||
                          inputElement.closest('.newsletter-input-wrapper');

    // Add error class to parent element
    parentElement.classList.add('error');

    // Create error message element
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');

    // Add error message after the parent element
    parentElement.after(errorElement);

    // Set aria-invalid on the input
    inputElement.setAttribute('aria-invalid', 'true');

    // Focus the first input with error
    if (!document.querySelector('.input-wrapper.error input:focus, .textarea-wrapper.error textarea:focus')) {
      inputElement.focus();
    }
  };

  const resetFormErrors = (formElement) => {
    // Remove all error messages
    const errorMessages = formElement.querySelectorAll('.error-message');
    errorMessages.forEach(el => el.remove());

    // Remove error classes
    const errorElements = formElement.querySelectorAll('.error');
    errorElements.forEach(el => el.classList.remove('error'));

    // Reset aria-invalid attributes
    const inputs = formElement.querySelectorAll('input, textarea');
    inputs.forEach(input => input.removeAttribute('aria-invalid'));

    // Clear feedback
    const feedback = formElement.querySelector('.form-feedback');
    if (feedback) {
      feedback.textContent = '';
      feedback.className = 'form-feedback';
    }
  };

  /**
   * Loading state functions
   */
  const setLoadingState = (button, isLoading) => {
    if (isLoading) {
      // Store original text
      button.dataset.originalText = button.textContent;

      // Create and add spinner
      const spinner = document.createElement('span');
      spinner.className = 'spinner';
      button.textContent = 'Sending... ';
      button.appendChild(spinner);

      // Disable button
      button.disabled = true;
      button.classList.add('loading');

      // Add aria attributes
      button.setAttribute('aria-busy', 'true');
    } else {
      // Restore original text
      button.textContent = button.dataset.originalText || button.textContent;

      // Enable button
      button.disabled = false;
      button.classList.remove('loading');

      // Remove aria attributes
      button.removeAttribute('aria-busy');
    }
  };

  /**
   * Form submission handlers
   */
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (!validateContactForm()) {
      return;
    }

    // Set loading state
    setLoadingState(submitButton, true);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message
      contactFeedback.textContent = 'Your message has been sent successfully!';
      contactFeedback.className = 'form-feedback success';

      // Reset form
      contactForm.reset();

    } catch (error) {
      // Show error message
      contactFeedback.textContent = 'There was an error sending your message. Please try again.';
      contactFeedback.className = 'form-feedback error';
      console.error('Form submission error:', error);
    } finally {
      // Remove loading state
      setLoadingState(submitButton, false);

      // Scroll to feedback message
      contactFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!validateNewsletterForm()) {
      return;
    }

    // Set loading state
    setLoadingState(newsletterButton, true);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message
      newsletterFeedback.textContent = 'Thank you for subscribing!';
      newsletterFeedback.className = 'form-feedback success';

      // Reset form
      newsletterForm.reset();

    } catch (error) {
      // Show error message
      newsletterFeedback.textContent = 'There was an error subscribing. Please try again.';
      newsletterFeedback.className = 'form-feedback error';
      console.error('Newsletter submission error:', error);
    } finally {
      // Remove loading state
      setLoadingState(newsletterButton, false);
    }
  };

  /**
   * Enhanced focus management
   */
  const enhanceFocusManagement = () => {
    // Add focus styles to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [tabindex]:not([tabindex="-1"])');

    interactiveElements.forEach(element => {
      element.addEventListener('focus', () => {
        element.classList.add('focus-visible');
      });

      element.addEventListener('blur', () => {
        element.classList.remove('focus-visible');
      });
    });

    // Add keyboard support for gallery images
    const galleryImages = document.querySelectorAll('.gallery-image');
    galleryImages.forEach(image => {
      image.setAttribute('tabindex', '0');
      image.setAttribute('role', 'img');

      // Add keyboard event to show larger version
      image.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // This would typically open a modal or lightbox
          console.log('Image clicked:', image.src);
        }
      });
    });
  };

  /**
   * Initialize interactive elements
   */
  const initializeInteractivity = () => {
    // Add CSS for new interactive elements
    addDynamicStyles();

    // Add event listeners for form submissions
    contactForm.addEventListener('submit', handleContactSubmit);
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);

    // Add input validation on blur
    fullNameInput.addEventListener('blur', () => {
      if (!fullNameInput.value.trim()) {
        showError(fullNameInput, 'Please enter your name');
      }
    });

    emailInput.addEventListener('blur', () => {
      if (!emailInput.value.trim()) {
        showError(emailInput, 'Please enter your email');
      } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
      }
    });

    messageInput.addEventListener('blur', () => {
      if (!messageInput.value.trim()) {
        showError(messageInput, 'Please enter your message');
      }
    });

    newsletterEmailInput.addEventListener('blur', () => {
      if (newsletterEmailInput.value.trim() && !validateEmail(newsletterEmailInput.value.trim())) {
        showError(newsletterEmailInput, 'Please enter a valid email address');
      }
    });

    // Clear errors when user starts typing
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        const parentElement = input.closest('.input-wrapper') ||
                              input.closest('.textarea-wrapper') ||
                              input.closest('.newsletter-input-wrapper');

        if (parentElement && parentElement.classList.contains('error')) {
          parentElement.classList.remove('error');
          input.removeAttribute('aria-invalid');

          const errorMessage = parentElement.nextElementSibling;
          if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
          }
        }
      });
    });

    // Enhance focus management
    enhanceFocusManagement();
  };

  /**
   * Add dynamic styles for JS-dependent features
   */
  const addDynamicStyles = () => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Error styles */
      .input-wrapper.error,
      .textarea-wrapper.error,
      .newsletter-input-wrapper.error {
        border-color: #e74c3c;
      }

      .error-message {
        color: #e74c3c;
        font-size: 14px;
        margin-top: 4px;
        display: block;
      }

      /* Focus styles */
      .focus-visible {
        outline: 2px solid rgba(242, 198, 109, 1);
        outline-offset: 2px;
      }

      /* Form feedback */
      .form-feedback {
        margin-top: 16px;
        padding: 10px;
        border-radius: 4px;
        font-size: 14px;
      }

      .form-feedback.success {
        background-color: rgba(46, 204, 113, 0.1);
        color: #2ecc71;
        border: 1px solid #2ecc71;
      }

      .form-feedback.error {
        background-color: rgba(231, 76, 60, 0.1);
        color: #e74c3c;
        border: 1px solid #e74c3c;
      }

      /* Loading spinner */
      .spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        margin-left: 8px;
        vertical-align: middle;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      /* Button loading state */
      button.loading {
        opacity: 0.8;
        cursor: not-allowed;
      }

      /* Gallery image focus state */
      .gallery-image {
        cursor: pointer;
        transition: transform 0.2s ease;
      }

      .gallery-image:hover,
      .gallery-image:focus {
        transform: scale(1.05);
      }
    `;

    document.head.appendChild(styleElement);
  };

  // Initialize everything
  initializeInteractivity();
});
  