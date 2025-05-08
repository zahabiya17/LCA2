document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const categoryButtons = document.querySelectorAll('.category-button');
    const sortDropdown = document.querySelector('.sort-dropdown');
    const searchInput = document.querySelector('.search-input');
    const paginationButtons = document.querySelectorAll('.pagination-button');
    const productCards = document.querySelectorAll('.product-card');
  
    // Product filtering by category
    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });
  
        // Add active class to clicked button
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
  
        // Get category from button text
        const category = this.textContent.trim().toLowerCase();
  
        // Filter products (in a real app, this would fetch from backend or filter existing products)
        filterProducts(category);
      });
    });
  
    // Function to filter products
    function filterProducts(category) {
      console.log(`Filtering products by category: ${category}`);
  
      // In a real implementation, this would show/hide products or fetch from backend
      // For demo purposes, we'll just log the action
  
      if (category === 'all') {
        // Show all products
        productCards.forEach(card => {
          card.style.display = 'flex';
        });
      } else {
        // This is a simplified example - in a real app you would check product categories
        // For now, we'll just simulate filtering with a random display
        productCards.forEach(card => {
          // Get product title
          const title = card.querySelector('.product-title').textContent.toLowerCase();
  
          // Check if product title contains the category (simplified logic)
          if (
            (category === 'rings' && title.includes('ring')) ||
            (category === 'necklaces' && title.includes('necklace')) ||
            (category === 'earrings' && title.includes('earring')) ||
            (category === 'bracelets' && title.includes('bracelet'))
          ) {
            card.style.display = 'flex';
          } else if (category !== 'all') {
            card.style.display = 'none';
          }
        });
      }
    }
  
    // Sort dropdown functionality
    let sortAscending = true;
  
    sortDropdown.addEventListener('click', function() {
      sortAscending = !sortAscending;
  
      // Update the dropdown text
      const sortText = sortAscending ? 'Sort by price: Low to High' : 'Sort by price: High to Low';
      this.querySelector('span').textContent = sortText;
  
      // Sort the products
      sortProducts(sortAscending);
    });
  
    // Function to sort products by price
    function sortProducts(ascending) {
      console.log(`Sorting products by price: ${ascending ? 'Low to High' : 'High to Low'}`);
  
      // In a real implementation, this would sort the products based on price
      // For demo purposes, we'll just log the action
  
      // Get all product rows
      const productRows = document.querySelectorAll('.product-row, .featured-grid-top, .featured-grid-bottom');
  
      productRows.forEach(row => {
        // Get all product cards in this row
        const cards = Array.from(row.querySelectorAll('.product-card'));
  
        // Sort cards by price
        cards.sort((a, b) => {
          const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
          const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
  
          return ascending ? priceA - priceB : priceB - priceA;
        });
  
        // Remove all cards from the row
        cards.forEach(card => card.remove());
  
        // Add sorted cards back to the row
        cards.forEach(card => row.appendChild(card));
      });
    }
  
    // Search functionality
    searchInput.addEventListener('keyup', function(e) {
      // If Enter key is pressed
      if (e.key === 'Enter') {
        const searchTerm = this.value.trim().toLowerCase();
        searchProducts(searchTerm);
      }
    });
  
    // Function to search products
    function searchProducts(term) {
      console.log(`Searching for products with term: ${term}`);
  
      // In a real implementation, this would filter products based on the search term
      // For demo purposes, we'll implement a simple filter
  
      if (term === '') {
        // If search term is empty, show all products
        productCards.forEach(card => {
          card.style.display = 'flex';
        });
      } else {
        // Filter products based on title
        productCards.forEach(card => {
          const title = card.querySelector('.product-title').textContent.toLowerCase();
  
          if (title.includes(term)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      }
    }
  
    // Pagination functionality
    paginationButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Skip if it's a navigation button (has an image)
        if (this.querySelector('img')) {
          handlePaginationNavigation(this);
          return;
        }
  
        // Remove active class from all buttons
        paginationButtons.forEach(btn => {
          btn.classList.remove('active-page');
        });
  
        // Add active class to clicked button
        this.classList.add('active-page');
  
        // Get page number
        const page = this.textContent.trim();
  
        // Change page
        changePage(page);
      });
    });
  
    // Function to handle pagination navigation (prev/next)
    function handlePaginationNavigation(button) {
      // Find the currently active page
      const activePage = document.querySelector('.pagination-button.active-page');
      const currentPage = parseInt(activePage.textContent.trim());
  
      // Determine if it's previous or next button
      const isPrevious = button === paginationButtons[0];
      const isNext = button === paginationButtons[paginationButtons.length - 1];
  
      let newPage;
  
      if (isPrevious && currentPage > 1) {
        newPage = currentPage - 1;
      } else if (isNext && currentPage < 10) {
        newPage = currentPage + 1;
      } else {
        return; // Don't do anything if we're at the first or last page
      }
  
      // Find the button with the new page number
      const newPageButton = Array.from(paginationButtons).find(btn =>
        btn.textContent.trim() === newPage.toString()
      );
  
      if (newPageButton) {
        // Simulate a click on the new page button
        newPageButton.click();
      }
    }
  
    // Function to change page
    function changePage(page) {
      console.log(`Changing to page: ${page}`);
  
      // In a real implementation, this would fetch products for the selected page
      // For demo purposes, we'll just log the action
  
      // Scroll to top of product grid
      document.querySelector('.product-grid').scrollIntoView({ behavior: 'smooth' });
    }
  
    // Add hover effects to product cards
    productCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'transform 0.3s ease';
        this.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)';
      });
  
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0px 0px 2px rgba(23, 26, 31, 0.12)';
      });
  
      // Make cards focusable for keyboard navigation
      card.setAttribute('tabindex', '0');
  
      // Add keyboard support
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          // Simulate click on the card
          this.click();
        }
      });
  
      // Add click event
      card.addEventListener('click', function() {
        const productTitle = this.querySelector('.product-title').textContent;
        const productPrice = this.querySelector('.product-price').textContent;
  
        console.log(`Product clicked: ${productTitle} - ${productPrice}`);
        // In a real implementation, this would open a product detail page or quick view
      });
    });
  
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
    }
  
    // Function to validate email
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for subscribing!';
    successMessage.style.color = '#4caf50';
    successMessage.style.fontSize = '14px';
    successMessage.style.marginTop = '10px';

    // Replace form with success message
    form.style.display = 'none';
    form.parentNode.insertBefore(successMessage, form.nextSibling);
    
    // Initialize the page
    function initPage() {
      // Set the first category button as active
      categoryButtons[0].click();
  
      // Add aria-label to product cards for better accessibility
      productCards.forEach(card => {
        const title = card.querySelector('.product-title').textContent;
        card.setAttribute('aria-label', `Product: ${title}`);
      });
  
      // Add focus styles for keyboard navigation
      document.head.insertAdjacentHTML('beforeend', `
        <style>
          .product-card:focus-visible,
          .category-button:focus-visible,
          .pagination-button:focus-visible,
          .newsletter-input:focus-visible,
          .newsletter-button:focus-visible,
          .search-input:focus-visible {
            outline: 2px solid #0d554a;
            outline-offset: 2px;
          }
        </style>
      `);
    }
  
    // Initialize the page
    initPage();
  });