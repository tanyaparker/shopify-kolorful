/**
 * Web Developer Custom Script
 */
jQuery(document).ready(function($) {

  // Home page external feed slider function
  $('.ext-feed_wrap.items_one-fifth').slick({
    slidesToShow: 5,
    rows: 1,
    slidesToScroll: 1,
    arrows: false, 
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          rows: 2,
    	  slidesToScroll: 2,
          slidesToShow: 2,
          dots: false
        }
      },
      {
        breakpoint: 640,
        settings: {          
          rows: 2,
    	  slidesToScroll: 2,
          slidesToShow: 2,
          dots: false
        }
      }
    ]
  });

  $('.ext-feed_wrap.items_one-third').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, 
    autoplay: true,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 640,
        settings: {          
          slidesToShow: 1
        }
      }
    ]
  });

  $('.ext-feed_wrap.items_one-quarter').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false, 
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 640,
        settings: {          
          slidesToShow: 1
        }
      }
    ]
  });

  $('.ext-feed_wrap.items_one-sixth').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false, 
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 640,
        settings: {          
          slidesToShow: 1
        }
      }
    ]
  });


  // Logos slider function
  $('.logo-carousel_wrap').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false, 
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 640,
        settings: {          
          slidesToShow: 2
        }
      }
    ]
  });
  
});

/*ATC from cart icon on product grid*/
class ShopifyCart {
  constructor() {
    this.initAddToCartButtons();
  }

  initAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.js-add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', (e) => this.handleAddToCart(e));
    });
  }

  async handleAddToCart(event) {
    // Prevent the click from bubbling up to the product link
    event.preventDefault();
    event.stopPropagation();

    const button = event.currentTarget;
    const productId = button.dataset.productId;
    const variantId = button.dataset.variantId;

    if (!productId || !variantId) {
      console.error('Product or variant ID missing');
      return;
    }

    // Add loading state
    button.classList.add('loading');

    try {
      const formData = {
        items: [{
          id: variantId,
          quantity: 1
        }]
      };

      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      
      // Update cart count or show confirmation
      // You can trigger a cart drawer open here if needed
      console.log('Added to cart:', result);

    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle error - show error message to user
    } finally {
      // Remove loading state
      button.classList.remove('loading');
    }
  }
}

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', () => {
  new ShopifyCart();

  const wishlistIcons = document.querySelectorAll('.js-wishlist-btn');
  wishlistIcons.forEach(function(icon) {
    icon.addEventListener('click', handleWishlistClick.bind(icon));
  });
  
  function handleWishlistClick(event) {
    event.stopPropagation();
    event.preventDefault();
    // Check if the parent has class .grid-product__content
    const parentContent = this.closest('.grid-product__content');
    if (parentContent) {
      // Select the parent element containing the shadow root
      const wishlistPlaceholder = parentContent.querySelector('.gw-add-to-wishlist-product-card-placeholder');
      
      if (wishlistPlaceholder) {
        // Access the shadow root
        const shadowRoot = wishlistPlaceholder.shadowRoot;
      
        if (shadowRoot) {
          // Find the button inside the shadow root
          const wishlistButton = shadowRoot.querySelector('.gw-toggle-wishlist-product-card-button');
      
          if (wishlistButton) {
            // Trigger a click on the button
            wishlistButton.click();
            console.log('Wishlist button clicked!');
          } else {
            console.log('Wishlist button not found inside shadow root.');
          }
        } else {
          console.log('Shadow root not found.');
        }
      } else {
        console.log('Wishlist placeholder not found.');
      }
    }
  }

});

document.addEventListener('quickview:loaded', function(event) {
  setTimeout(function() {
    // Trigger a resize event on the window
    window.dispatchEvent(new Event('resize'));
  }, 100); // Adjust the delay (in milliseconds) if necessary
});
document.addEventListener('quickview:open', function(event) {
  setTimeout(function() {
    // Trigger a resize event on the window
    window.dispatchEvent(new Event('resize'));
  }, 100); // Adjust the delay (in milliseconds) if necessary
});

document.addEventListener('DOMContentLoaded', function() {
  const tabsContainers = document.querySelectorAll('.product-tabs');
  
  tabsContainers.forEach(container => {
    const tabButtons = container.querySelectorAll('.product-tabs__nav-btn');
    const tabPanels = container.querySelectorAll('.product-tabs__content');
    const readMoreBtn = container.querySelector('.read-more-btn');
    const previewContent = container.querySelector('.description-preview');
    const fullContent = container.querySelector('.description-full');

    if (readMoreBtn && previewContent && fullContent) {
      readMoreBtn.addEventListener('click', () => {
        previewContent.style.display = 'none';
        fullContent.style.display = 'block';
      });
    }

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active state from all buttons and panels in this container
        tabButtons.forEach(btn => {
          btn.classList.remove('is-active');
          btn.setAttribute('aria-selected', 'false');
        });
        tabPanels.forEach(panel => panel.classList.remove('is-active'));
        
        // Add active state to clicked button and corresponding panel
        button.classList.add('is-active');
        button.setAttribute('aria-selected', 'true');
        
        const panelId = button.getAttribute('aria-controls');
        const panel = container.querySelector(`#${panelId}`);
        if (panel) {
          panel.classList.add('is-active');
        }
      });
    });
  });
});