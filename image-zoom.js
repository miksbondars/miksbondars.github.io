// Image Zoom Functionality with Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Create zoom overlay elements
    const zoomOverlay = document.createElement('div');
    zoomOverlay.className = 'zoom-overlay';
    
    const zoomedImage = document.createElement('img');
    zoomedImage.className = 'zoomed-image';
    
    const closeButton = document.createElement('span');
    closeButton.className = 'zoom-close';
    closeButton.innerHTML = '&times;';
    
    // Add navigation arrows
    const prevButton = document.createElement('button');
    prevButton.className = 'zoom-prev';
    prevButton.innerHTML = '&#10094;'; // Left arrow symbol
    
    const nextButton = document.createElement('button');
    nextButton.className = 'zoom-next';
    nextButton.innerHTML = '&#10095;'; // Right arrow symbol
    
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'zoom-controls';
    controlsDiv.appendChild(prevButton);
    controlsDiv.appendChild(nextButton);
    
    // Add elements to DOM
    zoomOverlay.appendChild(closeButton);
    zoomOverlay.appendChild(zoomedImage);
    zoomOverlay.appendChild(controlsDiv);
    document.body.appendChild(zoomOverlay);
    
    // Array to store images for navigation
    let galleryImages = [];
    let currentImageIndex = 0;
    
    // Make product images in catalog pages zoomable
    document.querySelectorAll('.product-image img').forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            // Get all product images on the page
            collectGalleryImages();
            currentImageIndex = galleryImages.indexOf(this.src);
            openZoomOverlay(this.src);
        });
    });
    
    // Make selected product image in form zoomable
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('selected-product-image')) {
            collectGalleryImages();
            currentImageIndex = galleryImages.indexOf(e.target.src);
            openZoomOverlay(e.target.src);
        }
    });
    
    // For product detail pages
    const mainProductImage = document.getElementById('main-product-image');
    if (mainProductImage) {
        mainProductImage.addEventListener('click', function() {
            // For product page, collect all thumbnails including main image
            galleryImages = [];
            galleryImages.push(this.src);
            
            document.querySelectorAll('.product-thumbnail').forEach(thumb => {
                if (!galleryImages.includes(thumb.src)) {
                    galleryImages.push(thumb.src);
                }
            });
            
            currentImageIndex = 0;
            openZoomOverlay(this.src);
        });
        
        // Make thumbnails open the zoomed version directly
        document.querySelectorAll('.product-thumbnail').forEach(thumb => {
            thumb.addEventListener('click', function(e) {
                // Don't override the default thumbnail switching behavior
                setTimeout(() => {
                    // But after a small delay, open the zoom overlay
                    if (e.target === this) {
                        // Get all images for navigation
                        galleryImages = [];
                        galleryImages.push(mainProductImage.src);
                        
                        document.querySelectorAll('.product-thumbnail').forEach(t => {
                            if (!galleryImages.includes(t.src)) {
                                galleryImages.push(t.src);
                            }
                        });
                        
                        currentImageIndex = galleryImages.indexOf(this.src);
                        openZoomOverlay(this.src);
                    }
                }, 100);
            });
        });
    }
    
    // Collect all product images on the page for navigation
    function collectGalleryImages() {
        galleryImages = [];
        document.querySelectorAll('.product-image img').forEach(img => {
            if (!galleryImages.includes(img.src)) {
                galleryImages.push(img.src);
            }
        });
    }
    
    function openZoomOverlay(imageSrc) {
        // Use highest quality image by removing any size restrictions from Google Photos URL
        const fullSizeImageSrc = imageSrc.replace(/=w\d+$|=w\d+(?=-)/, '=w2400');
        zoomedImage.src = fullSizeImageSrc;
        zoomOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Show/hide navigation arrows based on gallery size
        if (galleryImages.length <= 1) {
            controlsDiv.style.display = 'none';
        } else {
            controlsDiv.style.display = 'flex';
        }
    }
    
    function closeZoomOverlay() {
        zoomOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        const fullSizeImageSrc = galleryImages[currentImageIndex].replace(/=w\d+$|=w\d+(?=-)/, '=w2400');
        zoomedImage.src = fullSizeImageSrc;
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        const fullSizeImageSrc = galleryImages[currentImageIndex].replace(/=w\d+$|=w\d+(?=-)/, '=w2400');
        zoomedImage.src = fullSizeImageSrc;
    }
    
    // Close when clicking the close button
    closeButton.addEventListener('click', closeZoomOverlay);
    
    // Close when clicking outside the image
    zoomOverlay.addEventListener('click', function(e) {
        if (e.target === zoomOverlay) {
            closeZoomOverlay();
        }
    });
    
    // Navigation handlers
    prevButton.addEventListener('click', function(e) {
        e.stopPropagation();
        showPrevImage();
    });
    
    nextButton.addEventListener('click', function(e) {
        e.stopPropagation();
        showNextImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!zoomOverlay.classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                closeZoomOverlay();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
    
    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    zoomOverlay.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    zoomOverlay.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            showNextImage();
        }
        if (touchEndX > touchStartX + 50) {
            showPrevImage();
        }
    }
});
