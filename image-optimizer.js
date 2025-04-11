/**
 * Image Optimizer Script
 * Handles lazy loading, image compression, and responsive loading
 */

// Lazy loading implementation
document.addEventListener("DOMContentLoaded", function() {
    // Set all images to lazy load
    const imagesToLazyLoad = document.querySelectorAll('img:not(.no-lazy)');
    
    // Add lazy loading attribute to images that don't have it
    imagesToLazyLoad.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Add placeholder class for fade-in effect
        img.classList.add('lazy-load');
        
        // Add data-src attribute if not already present and src exists
        if (!img.hasAttribute('data-src') && img.hasAttribute('src')) {
            img.setAttribute('data-src', img.getAttribute('src'));
        }
        
        // Store original src and use a tiny placeholder
        if (!img.hasAttribute('data-original-src') && img.hasAttribute('src')) {
            img.setAttribute('data-original-src', img.getAttribute('src'));
        }
    });
    
    // Set up Intersection Observer to load images when they come into view
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // If data-src exists, load the image from it
                if (img.hasAttribute('data-src')) {
                    img.src = img.getAttribute('data-src');
                }
                
                // Wait for image to load then add loaded class
                img.onload = () => {
                    img.classList.add('loaded');
                };
                
                // Stop observing the image
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px', // Load images a bit before they come into view
        threshold: 0.01 // Trigger when at least 1% of the image is visible
    });
    
    // Observe all marked images
    imagesToLazyLoad.forEach(img => {
        lazyImageObserver.observe(img);
    });
    
    // Responsive image loading - use smaller images for mobile
    function loadResponsiveImages() {
        const isMobile = window.innerWidth <= 768;
        const responsiveImages = document.querySelectorAll('[data-mobile-src]');
        
        responsiveImages.forEach(img => {
            if (isMobile && img.hasAttribute('data-mobile-src')) {
                img.src = img.getAttribute('data-mobile-src');
            } else if (!isMobile && img.hasAttribute('data-desktop-src')) {
                img.src = img.getAttribute('data-desktop-src');
            }
        });
    }
    
    // Run on load and when window resizes
    loadResponsiveImages();
    window.addEventListener('resize', loadResponsiveImages);
    
    // Preload critical images (visible in initial viewport)
    setTimeout(() => {
        const criticalImages = document.querySelectorAll('.critical-image');
        criticalImages.forEach(img => {
            const newImage = new Image();
            newImage.src = img.getAttribute('data-src') || img.getAttribute('src');
            newImage.onload = () => {
                img.src = newImage.src;
                img.classList.add('loaded');
            };
        });
    }, 100); // Small delay to allow other critical resources to load first
});
