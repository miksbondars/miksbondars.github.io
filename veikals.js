document.getElementById("year").innerHTML = (new Date().getFullYear());

document.querySelectorAll('.catalog-item-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('#kontakti').scrollIntoView({ behavior: 'smooth' });
    });
});

// Add scroll handler for kontakti links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href="#kontakti"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#kontakti').scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// Slideshow functionality - improved for consistent timing
let slideIndex = 1;
let slideTimer = null;

// Initialize the slideshow when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if slideshow elements exist before initializing
    if (document.getElementsByClassName("mySlides").length > 0) {
        showSlides(slideIndex);
        // Start the automatic slideshow timer
        resetTimer();
    }
    
    // Enhanced Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const primaryNav = document.getElementById('primary-nav');
    const catalogDropdown = document.getElementById('catalog-dropdown');
    
    if(mobileMenuToggle && primaryNav) {
        // Toggle mobile menu when clicked
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            primaryNav.classList.toggle('active');
        });
        
        // Toggle dropdown on mobile without affecting desktop behavior
        if(catalogDropdown) {
            const dropdownLink = catalogDropdown.querySelector('a');
            if(dropdownLink) {
                // Only for mobile - prevent navigation and toggle dropdown instead
                dropdownLink.addEventListener('click', function(e) {
                    if(window.innerWidth <= 768) {
                        e.preventDefault(); // Prevent navigation only on mobile
                        catalogDropdown.classList.toggle('active');
                    }
                    // On desktop, normal link behavior is preserved
                });
            }
        }
        
        // Close menu when a link is clicked
        document.querySelectorAll('.primary_nav a').forEach(link => {
            link.addEventListener('click', function() {
                // Only if it's not the dropdown toggle
                if(!this.parentElement.classList.contains('dropdown') || window.innerWidth > 768) {
                    primaryNav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });
    }
});

// Reset the timer to ensure consistent 10-second intervals
function resetTimer() {
    clearTimeout(slideTimer);
    slideTimer = setTimeout(function() {
        plusSlides(1);
    }, 10000);
}

// Show the current slide
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    
    // Handle index out of bounds
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Show the current slide
    if (slides.length > 0) {
        slides[slideIndex-1].style.display = "block";
    }
}

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
    resetTimer(); // Reset the timer whenever manually changing slides
}

// Thumbnail image controls - kept for compatibility but dot elements are now hidden
function currentSlide(n) {
    showSlides(slideIndex = n);
    resetTimer(); // Reset the timer whenever manually changing slides
}
